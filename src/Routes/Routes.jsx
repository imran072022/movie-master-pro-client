import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AllMovies from "../Pages/AllMovies";
const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        Component: Home,
        index: true,
      },
      {
        path: "movies",
        Component: AllMovies,
      },
    ],
  },
]);
export default router;
