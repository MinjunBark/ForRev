import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import UserProfile from "../features/user/UserProfile";


export const profileRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: `/profile/$username`,
    component: UserProfile,
});