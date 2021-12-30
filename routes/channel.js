const express = require("express");

const Video = require("../models/video");

const router = express.Router();

router.get("/:channel_id", (req, res) => {
  if (req.params.channel_id) {
    Video.find({ channel_id: req.params.channel_id })
      .sort({ upload_date: "desc" })
      .exec()
      .then((videos) => {
        res.render("channel", { videos });
      })
      .catch(() => {
        res.sendStatus(500);
      });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
