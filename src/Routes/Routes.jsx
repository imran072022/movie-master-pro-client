import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AllMovies from "../Pages/AllMovies";
import AddMovies from "../Pages/AddMovies";
import MyCollection from "../Pages/MyCollection";
import MovieDetails from "../Pages/MovieDetails";
import UpdateMovie from "../Pages/UpdateMovie";
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
      {
        path: "movies/add",
        Component: AddMovies,
      },
      {
        path: "movies/my-collection",
        Component: MyCollection,
      },
      {
        path: "movie/:id",
        Component: MovieDetails,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/movie/${params.id}`),
      },
      {
        path: "movie/update/:id",
        Component: UpdateMovie,
      },
    ],
  },
]);
export default router;
