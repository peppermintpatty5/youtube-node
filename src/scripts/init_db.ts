/* eslint-disable no-console */

import fs from "fs";
import path from "path";
import util from "util";

import sequelize, { Video } from "../models";

type VideoInfo = {
  upload_date: string;
  _filename: string;
};

/**
 * Add hyphens to a date string such that `YYYYMMDD` becomes `YYYY-MM-DD`. This
 * function is idempotent; repeated applications have no effect.
 */
function hyphenDate(date: string) {
  return date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
}

sequelize
  .sync()
  .then(
    util.promisify(() => {
      for (let i = 2; i < process.argv.length; i += 1) {
        const dir = process.argv[i];

        fs.readdirSync(dir).forEach((basename) => {
          const file = path.join(dir, basename);

          if (fs.lstatSync(file).isFile() && file.endsWith(".info.json")) {
            console.log(file);
            const info: VideoInfo = JSON.parse(
              fs.readFileSync(file, { encoding: "utf-8" })
            );

            Video.create({
              ...info,
              upload_date: hyphenDate(info.upload_date),
              // eslint-disable-next-line no-underscore-dangle
              path: path.join(dir, info._filename),
            });
          }
        });
      }
    })
  )
  .finally(() => sequelize.close());
