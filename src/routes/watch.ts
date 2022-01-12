import createError from "http-errors";
import express from "express";
import moment from "moment";

import sequelize from "../models";

const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.query.v)
    sequelize
      .model("video")
      .findByPk(req.query.v)
      .then((video) => {
        if (video !== null) {
          res.render("watch", {
            video,
            formatDate: (date) => moment.utc(date).format("MMM D, YYYY"),
          });
        } else {
          next(createError(404));
        }
      });
  else res.redirect("/");
});

export default router;
