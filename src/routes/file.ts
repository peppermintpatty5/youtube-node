import createError from "http-errors";
import express from "express";

const router = express.Router();

router.get("/:file", (req, res, next) => {
  const { file } = req.params;

  // forbid access to *.info.json files
  if (file.endsWith(".info.json")) next(createError(403));
  else next();
});

export default router;
