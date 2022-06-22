import express from "express";
import moment from "moment";
import path from "path";

import { Video } from "../models";

const router = express.Router();

/**
 * Given a duration in seconds as a non-negative integer, outputs a string in
 * the format `m:ss` or `h:mm:ss`.
 */
function formatDuration(seconds: number) {
  const s = seconds % 60;
  const m = Math.floor(seconds / 60) % 60;
  const h = Math.floor(seconds / 3600);
  const ss = s >= 10 ? `${s}` : `0${s}`;
  const mm = m >= 10 ? `${m}` : `0${m}`;

  return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
}

function getLocalThumbnail(video: Video) {
  if (video.thumbnail !== null) {
    const thumbPath = new URL(video.thumbnail).pathname;
    const thumbExt = path.posix.extname(thumbPath);
    const { dir, name } = path.parse(video.path);

    return `/file/${path.posix.join(...dir.split(path.sep), name + thumbExt)}`;
  }
  return "/images/hqdefault.jpg";
}

function formatDate(date: Date) {
  return moment.utc(date).format("MMM D, YYYY");
}

router.get("/:channel_id", (req, res) => {
  if (req.params.channel_id)
    Video.findAll({
      where: { channel_id: req.params.channel_id },
      order: [["upload_date", "ASC"]],
    }).then((videos) =>
      res.render("channel", {
        videos: videos.map((video) => ({
          duration: formatDuration(video.duration ?? 0),
          id: video.id,
          thumbnail: getLocalThumbnail(video),
          title: video.title ?? "",
          upload_date: formatDate(video.upload_date ?? new Date(0)),
          view_count: (video.view_count ?? 0).toLocaleString(),
        })),
      })
    );
  else res.redirect("/");
});

export default router;
