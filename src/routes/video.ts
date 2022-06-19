import createError from "http-errors";
import express from "express";
import path from "path";

import { Video } from "../models";

const router = express.Router();

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Video.findByPk(id).then((video) => {
    if (video !== null) res.sendFile(path.join(__dirname, "../..", video.path));
    else next(new createError.NotFound());
  });
});

export default router;
