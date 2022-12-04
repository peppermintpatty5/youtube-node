import express from "express";
import createError from "http-errors";
import moment from "moment";

import { Channel } from "../models";

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

function formatDate(date: string) {
  return moment.utc(date).format("MMM D, YYYY");
}

router.get("/:id", (req, res, next) => {
  if (req.params.id)
    Channel.findByPk(req.params.id).then((channel) => {
      if (channel !== null)
        channel.getVideos({ order: [["uploadDate", "ASC"]] }).then((videos) => {
          res.render("channel", {
            name: channel.name ?? "",
            videos: videos.map((video) => ({
              duration: formatDuration(video.duration ?? 0),
              id: video.id,
              title: video.title ?? "",
              uploadDate: formatDate(video.uploadDate ?? "1970-01-01"),
              viewCount: (video.viewCount ?? 0).toLocaleString(),
            })),
          });
        });
      else next(createError(404));
    });
  else res.redirect("/");
});

export default router;
