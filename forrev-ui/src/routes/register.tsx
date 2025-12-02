import { createRoute } from "@tanstack/react-router";
import RegisterPage from "../features/auth/RegisterPage";
import { rootRoute } from "./__root";


export const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/register',
    component: RegisterPage,
})