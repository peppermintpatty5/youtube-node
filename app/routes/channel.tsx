import type { Route } from "./+types/channel";

export default function Channel({ params }: Route.ActionArgs) {
  return <h1 className="text-4xl">Channel ID: {params.channel_id}</h1>;
}
