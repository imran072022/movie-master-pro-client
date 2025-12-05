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
import PrivateRoute from "./PrivateRoute";
import WatchList from "../Pages/Watchlist";
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
        element: (
          <PrivateRoute>
            <MyCollection></MyCollection>
          </PrivateRoute>
        ),
      },
      {
        path: "movie/:id",
        element: (
          <PrivateRoute>
            <MovieDetails></MovieDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/movie/${params.id}`),
      },
      {
        path: "movies/update/:id",
        element: (
          <PrivateRoute>
            <UpdateMovie></UpdateMovie>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "movies/watchlist",
        element: (
          <PrivateRoute>
            <WatchList></WatchList>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
