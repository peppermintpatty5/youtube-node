import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("channel/:channelId", "routes/channel.tsx"),
    route("watch", "routes/watch.tsx"),
  ]),
] satisfies RouteConfig;
