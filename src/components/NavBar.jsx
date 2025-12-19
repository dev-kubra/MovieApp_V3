import { NavLink } from "react-router";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContextProvider";
import ThemeSelector from "./ThemeSelector";
import { UserContext } from "../contexts/UserContextProvider";
import { Link } from "react-router";

export default function NavBar() {
  const { theme } = useContext(ThemeContext);
  const { watchList } = useContext(UserContext)
 
  console.log(theme);

  return(
    <nav className={`navbar navbar-expand-lg bg-${theme} border-bottom border-body`} data-bs-theme={theme}>
      <ThemeSelector />
      <div className="container">
        <Logo/>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" aria-current="page" end>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies" end >Movies</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login" aria-current="page" end>Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register" end >Register</NavLink>
            </li>
          </ul>
          <SearchForm />
          <Link to="/watchlist" className={`btn btn-${theme} border position-relative`}>
            <i className="bi bi-heart-fill"></i>
            <span className="position-absolute top-0 start-100 badge rounded-pill bg-danger translate-middle">{ watchList.length }</span>
          </Link>
          

        </div>
      </div>
    </nav>
  )
} 