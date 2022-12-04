import express from "express";
import createError from "http-errors";
import path from "path";
import { Video } from "../models";

const router = express.Router();

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Video.findByPk(id).then((video) => {
    if (video !== null && video.localVideoPath !== null)
      res.sendFile(path.join(__dirname, "../../videos", video.localVideoPath));
    else next(createError(404));
  });
});

export default router;
