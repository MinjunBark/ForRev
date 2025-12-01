import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import EventsList from "../features/events/components/events-list";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: EventsList,
})