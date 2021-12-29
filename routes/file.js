const express = require("express");

const router = express.Router();

router.get("/:file", (req, res, next) => {
  const { file } = req.params;

  // forbid access to *.info.json files
  if (file.endsWith(".info.json")) res.sendStatus(403);
  else next();
});

module.exports = router;
