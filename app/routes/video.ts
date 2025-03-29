import { prisma } from "lib/prisma";
import type { Route } from "./+types/video";
import { createReadStream } from "fs";
import { resolve } from "path";
import { createReadableStreamFromReadable } from "@react-router/node";

export async function loader({ params }: Route.LoaderArgs) {
  const { local_video_path } =
    (await prisma.video.findUnique({
      where: { id: params.videoId },
      select: { local_video_path: true },
    })) ?? {};

  if (local_video_path) {
    const fullPath = resolve("videos", local_video_path);

    return new Response(
      createReadableStreamFromReadable(createReadStream(fullPath)),
    );
  }
}
