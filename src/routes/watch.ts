import createError from "http-errors";
import express from "express";
import moment from "moment";

import { Video } from "../models";

const router = express.Router();

router.get("/", (req, res, next) => {
  if (typeof req.query.v === "string")
    Video.findByPk(req.query.v).then((video) => {
      if (video !== null)
        res.render("watch", {
          video,
          formatDate: (date: string) => moment.utc(date).format("MMM D, YYYY"),
        });
      else next(createError(404));
    });
  else res.redirect("/");
});

export default router;
