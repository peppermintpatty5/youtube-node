/* eslint-disable no-console */

import fs from "fs";
import path from "path";

import db from "../db";
import { Channel, initModels } from "../models";

/**
 * Expected properties from a video's .info.json file.
 */
type VideoInfo = {
  id: string;
  title?: string;
  description?: string;
  upload_date?: string;
  duration?: number;
  view_count?: number;
  thumbnail?: string;
  ext?: string;

  channel_id: string;
  uploader?: string;
};

/**
 * Add hyphens to a date string such that `YYYYMMDD` becomes `YYYY-MM-DD`.
 *
 * This function is idempotent, i.e.
 * ```
 * hyphenDate(x) === hyphenDate(hyphenDate(x))
 * ```
 */
function hyphenDate(date?: string) {
  return date?.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
}

/**
 * Inserts the video into the database.
 */
function insertIntoDatabase(v: VideoInfo) {
  return Channel.findOrCreate({ where: { id: v.channel_id } })
    .then(([channel]) => channel.update({ name: v.uploader }))
    .then((channel) =>
      channel.createVideo({
        id: v.id,
        title: v.title,
        description: v.description,
        uploadDate: hyphenDate(v.upload_date),
        duration: v.duration,
        viewCount: v.view_count,
        thumbnail: v.thumbnail,
        ext: v.ext,
      })
    );
}

const dir = process.argv[2] ?? process.cwd();

initModels(db);

db.sync({ force: true })
  .then(() =>
    fs.promises
      .readdir(dir)
      .then((files) =>
        Promise.allSettled(
          files
            .filter((file) => file.endsWith(".info.json"))
            .map((file) =>
              fs.promises
                .readFile(path.join(dir, file), { encoding: "utf-8" })
                .then((text) => JSON.parse(text) as VideoInfo)
                .then((vInfo) => insertIntoDatabase(vInfo))
                .then((video) => console.log(video.title))
            )
        )
      )
      .then((results) =>
        console.log(
          "%d succeeded, %d failed",
          results.filter((r) => r.status === "fulfilled").length,
          results.filter((r) => r.status === "rejected").length
        )
      )
  )
  .finally(() => db.close());
