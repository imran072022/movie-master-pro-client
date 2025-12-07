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
import Page404 from "../Pages/Page404";
import ErrorFallback from "../Pages/ErrorFallBack";
const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Page404></Page404>,
    ErrorBoundary: ErrorFallback,
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
  { path: "*", Component: Page404 },
]);
export default router;
