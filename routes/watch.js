const express = require("express");
const moment = require("moment");

const Video = require("../models/video");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.query.v) {
    Video.findOne({ id: req.query.v })
      .exec()
      .then((video) => {
        if (video !== null) {
          res.render("watch", {
            video,
            formatDate: (date) => moment.utc(date).format("MMM D, YYYY"),
          });
        } else {
          res.sendStatus(404);
        }
      })
      .catch(() => {
        res.sendStatus(500);
      });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
