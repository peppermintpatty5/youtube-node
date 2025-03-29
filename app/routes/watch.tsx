import { Link } from "react-router";
import type { Route } from "./+types/watch";
import { prisma } from "lib/prisma";

export async function loader({ request }: Route.LoaderArgs) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("v");
  const video = videoId
    ? await prisma.video.findUnique({
        where: { id: videoId },
        include: { channel: true },
        omit: { local_video_path: true },
      })
    : null;

  if (video !== null) return video;
  else throw new Response("Not found", { status: 404 });
}

export default function Watch({ loaderData }: Route.ComponentProps) {
  const { channel, title } = loaderData;

  return (
    <>
      <h1 className="text-4xl">{title}</h1>
      <p>
        Uploaded by <Link to={`/channel/${channel.id}`}>{channel.name}</Link>
      </p>
    </>
  );
}
