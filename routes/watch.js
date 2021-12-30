const express = require("express");

const Video = require("../models/video");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.query.v) {
    Video.findOne({ id: req.query.v })
      .exec()
      .then((video) => {
        res.render("watch", { video });
      })
      .catch(() => {
        res.sendStatus(404);
      });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
