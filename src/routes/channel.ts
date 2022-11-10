import express from "express";
import createError from "http-errors";
import moment from "moment";

import { Channel, Video } from "../models";

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
  if (video.thumbnail) {
    const ext = new URL(video.thumbnail).pathname.split(".").pop();
    return `/file/${video.id}.${ext}`;
  }
  return "";
}

function formatDate(date: Date) {
  return moment.utc(date).format("MMM D, YYYY");
}

router.get("/:channel_id", (req, res, next) => {
  if (req.params.channel_id)
    Channel.findByPk(req.params.channel_id).then((channel) => {
      if (channel !== null)
        channel.getVideos().then((videos) => {
          videos.forEach((video) => console.log(video));
          res.render("channel", {
            videos: videos.map((video) => ({
              duration: formatDuration(video.duration ?? 0),
              id: video.id,
              thumbnail: getLocalThumbnail(video),
              title: video.title ?? "",
              upload_date: formatDate(new Date("1970-01-01")), // TODO: use uploadDate
              view_count: (video.viewCount ?? 0).toLocaleString(),
            })),
          });
        });
      else next(createError(404));
    });
  else res.redirect("/");
});

export default router;
