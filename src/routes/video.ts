import express from "express";
import path from "path";

import { Video } from "../models";

const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Video.findByPk(id).then((video) => {
    if (video !== null && video.localVideoPath !== null)
      res.sendFile(
        path.join(__dirname, "../../videos", video.localVideoPath),
        (err) => {
          if (err) res.sendStatus(404);
        }
      );
    else res.sendStatus(404);
  });
});

export default router;
