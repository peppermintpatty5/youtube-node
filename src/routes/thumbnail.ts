import express from "express";
import createError from "http-errors";
import path from "path";
import { Video } from "../models";

/**
 * Deduce the local thumbnail path using the local video path and the file
 * extension from the thumbnail URL.
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

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Video.findByPk(id).then((video) => {
    if (video !== null && video.localVideoPath !== null) {
      const localThumbnailPath = getLocalThumbnailPath(video);

      if (localThumbnailPath !== null)
        res.sendFile(path.join(__dirname, "../../videos", localThumbnailPath));
    } else next(createError(404));
  });
});

export default router;
