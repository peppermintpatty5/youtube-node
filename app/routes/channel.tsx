import { prisma } from "lib/prisma";
import type { Route } from "./+types/channel";
import { Link } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const channel = await prisma.channel.findUnique({
    where: { id: params.channelId },
    include: { videos: true },
  });

  if (channel !== null) return channel;
  else throw new Response("Not found", { status: 404 });
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: data.name }];
}

export default function Channel({ loaderData }: Route.ComponentProps) {
  const { name, videos } = loaderData;

  return (
    <>
      <h1 className="text-4xl">{name}</h1>
      <ol>
        {videos.map((video) => (
          <li key={video.id}>
            <Link to={`/watch?v=${video.id}`}>{video.title}</Link>
          </li>
        ))}
      </ol>
    </>
  );
}
