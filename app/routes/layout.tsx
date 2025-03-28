import { Link, Outlet } from "react-router";
import type { Route } from "./+types/layout";

export default function Layout({}: Route.ActionArgs) {
  return (
    <div className="container">
      <header>
        <Link to="/">Home</Link>
      </header>
      <Outlet />
    </div>
  );
}
