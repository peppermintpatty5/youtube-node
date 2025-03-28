import { prisma } from "lib/prisma";
import type { Route } from "./+types/channel";

export async function loader({ params }: Route.LoaderArgs) {
  const channel = await prisma.channel.findUnique({
    where: { id: params.channel_id },
    include: { videos: true },
  });

  if (channel !== null) return channel;
  else throw new Response("Not found", { status: 404 });
}

export default function Channel({ loaderData }: Route.ComponentProps) {
  const { name, videos } = loaderData;

  return (
    <>
      <h1 className="text-4xl">{name}</h1>
      <ol>
        {videos.map((video) => (
          <li>{video.title}</li>
        ))}
      </ol>
    </>
  );
}
