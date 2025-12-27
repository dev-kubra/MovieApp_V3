import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import MainLayout from "./layouts/MainLayout";
import "bootstrap-icons/font/bootstrap-icons.css"
import SearchResults from "./pages/SearchResults";
import UserWatchList from "./pages/UserWatchList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoginState from "./pages/LoginState";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {path: "", element:<Home/>},
      {path: "movies", element:<Movies/>},
      {path: "movies/:id", element:<MovieDetails/>},
      {path: "watchlist/movies/:id", element:<MovieDetails/>},
      {path: "search", element: <SearchResults/>},
      {path: "watchlist", element: <UserWatchList/>},
      {path: "login", element: <LoginState/>},
      {path: "register", element: <Register/>}

    ]
  }
]);

export default function App() {

  return(
    <>
      <RouterProvider router={routes}/>
    </>

  ) 
}