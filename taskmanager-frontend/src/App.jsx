import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home";
import { Tasks } from "./pages/Tasks";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/tasks",
      element: <Tasks />,
    },
  ]);

  return <RouterProvider router={router} />;
};
