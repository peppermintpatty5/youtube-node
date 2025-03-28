import { prisma } from "lib/prisma";
import type { Route } from "./+types/home";
import { Link } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const channels = await prisma.channel.findMany();

  return channels;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1 className="text-4xl">Home</h1>
      <ul>
        {loaderData.map(({ id, name }) => (
          <li>
            <Link to={`/channel/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
