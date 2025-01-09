import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginRoute from "./routes/auth/login";
import RegisterRoute from "./routes/auth/register";
import LandingRoute from "./routes/landing";
import CalendarRoute from "./routes/app/calendar";
import AppLayout from "../components/layouts/app-layout";

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <LandingRoute />,
      loader: async () => {
        const data = await fetch("https://jsonplaceholder.typicode.com/posts");
        return data.json();
      },
    },
    {
      path: "/app",
      element: <AppLayout />,
      children: [
        {
          path: "calendar",
          element: <CalendarRoute />,
        },
      ],
    },
    {
      path: "/auth/login",
      element: <LoginRoute />,
    },
    {
      path: "/auth/register",
      element: <RegisterRoute />,
    },
    {
      path: "calendar",
      element: <CalendarRoute />,
    },
  ]);

const AppRouter = () => {
  const router = createAppRouter();

  return <RouterProvider router={router} />;
};
export default AppRouter;
