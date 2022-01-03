const createError = require("http-errors");
const express = require("express");
const moment = require("moment");

const Video = require("../models/video");

const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.query.v)
    Video.findOne({ id: req.query.v })
      .exec()
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

module.exports = router;
