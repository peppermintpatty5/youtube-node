const createError = require("http-errors");
const express = require("express");
const moment = require("moment");

const { sequelize } = require("../models");

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

module.exports = router;
