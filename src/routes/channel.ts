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
  const pageSize = 10;

  if (req.params.id) {
    const { page } = req.query;
    const pageNum = page ? Math.max(1, parseInt(page.toString(), 10) || 1) : 1;

    Channel.findByPk(req.params.id).then(async (channel) => {
      if (channel !== null) {
        const numVideos = await channel.countVideos();
        const numPages = Math.ceil(numVideos / pageSize);
        const videoSection = await channel.getVideos({
          order: [["uploadDate", "ASC"]],
          offset: (pageNum - 1) * pageSize,
          limit: pageSize,
        });

        res.render("channel", {
          name: channel.name ?? "",
          numVideos,
          videos: videoSection.map((video) => ({
            duration: formatDuration(video.duration ?? 0),
            id: video.id,
            title: video.title ?? "",
            uploadDate: formatDate(video.uploadDate ?? "1970-01-01"),
            viewCount: (video.viewCount ?? 0).toLocaleString(),
          })),
          pagination: [...Array(numPages).keys()].map((x) => ({
            active: pageNum === x + 1,
            href: `?page=${x + 1}`,
            text: `${x + 1}`,
          })),
        });
      } else next(createError(404));
    });
  } else res.redirect("/");
});

export default router;
