import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Tasks } from "./pages/Tasks";
import { CompletedTasks } from "./pages/CompletedTasks";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Tasks />,
    },
    {
      path: "/completed",
      element: <CompletedTasks />,
    },
  ]);

  return <RouterProvider router={router} />;
};
