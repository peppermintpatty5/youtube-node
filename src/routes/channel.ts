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

function range(a: number, b: number) {
  return [...Array(b - a)].map((_, i) => a + i);
}

router.get("/:id", (req, res, next) => {
  const pageSize = 10;

  if (req.params.id) {
    const { page } = req.query;
    const currentPage = page
      ? Math.max(1, parseInt(page.toString(), 10) || 1)
      : 1;

    Channel.findByPk(req.params.id).then(async (channel) => {
      if (channel !== null) {
        const numVideos = await channel.countVideos();
        const videoSection = await channel.getVideos({
          order: [["uploadDate", "ASC"]],
          offset: (currentPage - 1) * pageSize,
          limit: pageSize,
        });

        const numPages = Math.ceil(numVideos / pageSize);
        const pageNumbers = range(
          Math.max(currentPage - 5, 1),
          Math.min(currentPage + 5, numPages) + 1
        );

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
          pagination: {
            prev: currentPage > 1 ? `?page=${currentPage - 1}` : null,
            next: currentPage < numPages ? `?page=${currentPage + 1}` : null,
            pageNumbers: pageNumbers.map((p) => ({
              active: p === currentPage,
              href: `?page=${p}`,
              text: p.toLocaleString(),
            })),
          },
        });
      } else next(createError(404));
    });
  } else res.redirect("/");
});

export default router;
