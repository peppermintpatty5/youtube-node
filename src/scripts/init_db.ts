/* eslint-disable no-console */

import fs from "fs";
import path from "path";
import readline from "readline";

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
  like_count?: number;
  dislike_count?: number;
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
function insertIntoDatabase(v: VideoInfo, localVideoPath: string | null) {
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
        likeCount: v.like_count,
        dislikeCount: v.dislike_count,
        thumbnail: v.thumbnail,
        ext: v.ext,
        localVideoPath,
      })
    );
}

async function indexVideos() {
  await db.sync({ force: true });

  const videosDir = path.join(__dirname, "../../videos");
  const rl = readline.createInterface({ input: process.stdin });

  // eslint-disable-next-line no-restricted-syntax
  for await (const line of rl) {
    if (line.endsWith(".info.json")) {
      const file = line; // videos/foo/bar.info.json
      const relPath = path.relative(videosDir, file); // foo/bar.info.json
      const dirname = path.dirname(relPath); // foo
      const basename = path.basename(relPath, ".info.json"); // bar

      const vInfo = JSON.parse(
        fs.readFileSync(file, { encoding: "utf-8" })
      ) as VideoInfo;
      const localVideoPath =
        vInfo.ext !== undefined
          ? path.join(dirname, `${basename}.${vInfo.ext}`)
          : null;

      await insertIntoDatabase(vInfo, localVideoPath);
      console.log(vInfo.title);
    }
  }
}

initModels(db);
indexVideos().then(() => db.close());
