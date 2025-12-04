import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import MainLayout from "./layouts/MainLayout";
import "bootstrap-icons/font/bootstrap-icons.css"
import SearchResults from "./pages/SearchResults";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {path: "", element:<Home/>},
      {path: "movies", element:<Movies/>},
      {path: "movies/:id", element:<MovieDetails/>},
      {path: "search", element: <SearchResults/>}
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