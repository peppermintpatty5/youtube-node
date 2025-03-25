import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/layout.tsx", [
    route("/channel/:channel_id", "routes/channel.tsx"),
  ]),
] satisfies RouteConfig;
