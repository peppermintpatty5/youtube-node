const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  const videoID = req.query.v;

  if (videoID) res.render("watch", { video: { id: videoID, ext: "mp4" } });
  else next();
});

module.exports = router;
