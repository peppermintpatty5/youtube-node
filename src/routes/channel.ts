import express from "express";
import moment from "moment";

import sequelize from "../models";

const router = express.Router();

router.get("/:channel_id", (req, res) => {
  if (req.params.channel_id)
    sequelize
      .model("video")
      .findAll({
        where: { channel_id: req.params.channel_id },
        order: [["upload_date", "ASC"]],
      })
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
      });
  else res.redirect("/");
});

export default router;