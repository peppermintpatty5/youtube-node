const express = require("express");
const moment = require("moment");

const Video = require("../models/video");

const router = express.Router();

router.get("/:channel_id", (req, res) => {
  if (req.params.channel_id) {
    Video.find({ channel_id: req.params.channel_id })
      .sort({ upload_date: "desc" })
      .exec()
      .then((videos) => {
        res.render("channel", {
          videos,
          formatDate: (date) => moment.utc(date).format("MMM D, YYYY"),
          formatDuration: (seconds) => {
            const s = seconds % 60;
            const m = Math.floor(seconds / 60) % 60;
            const h = Math.floor(seconds / 3600);
            const ss = s >= 10 ? `${s}` : `0${s}`;
            const mm = m >= 10 ? `${m}` : `0${m}`;

            return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
          },
          getLocalThumbnail: (video) => {
            const ext = new URL(video.thumbnail).pathname.match(/\.(.*)$/)[1];
            return `/file/${video.id}.${ext}`;
          },
        });
      })
      .catch(() => {
        res.sendStatus(500);
      });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
