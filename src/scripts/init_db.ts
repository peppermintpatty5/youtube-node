/* eslint-disable no-console */

import fs from "fs";
import path from "path";

import sequelize, { Video } from "../models";

/**
 * Add hyphens to a date string such that `YYYYMMDD` becomes `YYYY-MM-DD`. This
 * function is idempotent; repeated applications have no effect.
 */
function hyphenDate(date: string) {
  return date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
}

const dir = process.argv[2];

sequelize
  .sync()
  .then(() => fs.promises.readdir(dir))
  .then((files) => files.filter((file) => file.endsWith(".info.json")))
  .then((files) =>
    Promise.allSettled(
      files.map((file) =>
        fs.promises
          .readFile(path.join(dir, file), { encoding: "utf-8" })
          .then((text) => JSON.parse(text))
          .then((record) =>
            Video.create({
              ...record,
              upload_date: hyphenDate(record.upload_date),
            })
          )
      )
    )
  )
  .then((results) =>
    console.log(
      "Added",
      results.filter((result) => result.status === "fulfilled").length,
      "videos"
    )
  )
  .finally(() => sequelize.close());
