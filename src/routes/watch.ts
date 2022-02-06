import createError from "http-errors";
import express from "express";
import moment from "moment";

import { Video } from "../models";

const router = express.Router();

function formatDate(date: Date) {
  return moment.utc(date).format("MMM D, YYYY");
}

router.get("/", (req, res, next) => {
  if (typeof req.query.v === "string")
    Video.findByPk(req.query.v).then((video) => {
      if (video !== null)
        res.render("watch", {
          video: {
            description: video.description ?? "",
            ext: video.ext ?? "",
            id: video.id,
            title: video.title ?? "",
            upload_date: formatDate(
              video.upload_date ?? new Date("1970-01-01")
            ),
            view_count: (video.view_count ?? 0).toLocaleString(),
          },
        });
      else next(createError(404));
    });
  else res.redirect("/");
});

export default router;
