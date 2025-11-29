import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AllMovies from "../Pages/AllMovies";
import AddMovies from "../Pages/AddMovies";
import MyCollection from "../Pages/MyCollection";
import MovieDetails from "../Pages/MovieDetails";
import UpdateMovie from "../Pages/UpdateMovie";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
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
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
export default router;
