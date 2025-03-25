import { Outlet } from "react-router";
import type { Route } from "./+types/layout";

export default function Layout({}: Route.ActionArgs) {
  return (
    <div className="container">
      <header>Header</header>
      <Outlet />
    </div>
  );
}
