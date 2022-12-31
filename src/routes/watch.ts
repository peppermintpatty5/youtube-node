import express from "express";
import createError from "http-errors";
import moment from "moment";

import { Channel, Video } from "../models";

const router = express.Router();

function formatDate(date: string) {
  return moment.utc(date).format("MMM D, YYYY");
}

router.get("/", (req, res, next) => {
  if (typeof req.query.v === "string")
    Video.findByPk(req.query.v, {
      include: { model: Channel, as: "channel" },
    }).then((video) => {
      if (video !== null) {
        const likeCount = video.likeCount ?? 0;
        const dislikeCount = video.dislikeCount ?? 0;
        const likeRatio =
          likeCount + dislikeCount > 0
            ? likeCount / (likeCount + dislikeCount)
            : 0.5;

        res.render("watch", {
          id: video.id,
          description: video.description ?? "",
          title: video.title ?? "",
          uploadDate: formatDate(video.uploadDate ?? "1970-01-01"),
          viewCount: (video.viewCount ?? 0).toLocaleString(),
          likeCount: likeCount.toLocaleString(),
          dislikeCount: dislikeCount.toLocaleString(),
          likeRatio,
          channel: {
            id: video.channel?.id,
            name: video.channel?.name,
          },
        });
      } else next(createError(404));
    });
  else res.redirect("/");
});

export default router;
