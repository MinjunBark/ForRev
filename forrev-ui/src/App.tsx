import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { indexRoute } from "./routes";
import { rootRoute } from "./routes/__root";
import { loginRoute } from "./routes/login";
import { registerRoute } from "./routes/register";
import { profileRoute } from "./routes/profile";

const routeTree = rootRoute.addChildren([indexRoute, loginRoute, registerRoute, profileRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <RouterProvider router={router} />
      <QueryClientProvider client={queryClient}></QueryClientProvider>
    </>
  );
}

export default App;
