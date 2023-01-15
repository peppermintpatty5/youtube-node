import express from "express";
import path from "path";

import { Video } from "../models";

/**
 * Deduce the local thumbnail path from the thumbnail URL using the local video
 * path and file extension.
 */
function getLocalThumbnailPath(video: Video) {
  if (
    video.localVideoPath !== null &&
    video.ext !== null &&
    video.thumbnail !== null
  ) {
    const dirname = path.dirname(video.localVideoPath);
    const basename = path.basename(video.localVideoPath, `.${video.ext}`);
    const ext = path.extname(new URL(video.thumbnail).pathname);

    return path.join(dirname, `${basename}${ext}`);
  }
  return null;
}

const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Video.findByPk(id).then((video) => {
    const localThumbnailPath =
      video !== null ? getLocalThumbnailPath(video) : null;

    if (localThumbnailPath !== null)
      res.sendFile(
        path.join(__dirname, "../../videos", localThumbnailPath),
        (err) => {
          if (err) res.sendStatus(404);
        }
      );
    else res.sendStatus(404);
  });
});

export default router;
