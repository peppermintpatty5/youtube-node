import createError from "http-errors";
import express from "express";
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
      if (video !== null)
        res.render("watch", {
          video: {
            id: video.id,
            description: video.description ?? "",
            ext: video.ext ?? "",
            title: video.title ?? "",
            upload_date: formatDate(video.uploadDate ?? "1970-01-01"),
            view_count: (video.viewCount ?? 0).toLocaleString(),
          },
          channel: {
            id: video.channel?.id,
            name: video.channel?.name,
          },
        });
      else next(createError(404));
    });
  else res.redirect("/");
});

export default router;
