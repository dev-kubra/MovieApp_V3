import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContextProvider";

export default function ThemeSelector() {
  const { theme, setTheme } = useContext(ThemeContext);

  return(
    <button className={`btn btn-${theme} border m-1`} onClick={()=>(setTheme(theme=== "dark" ? "light" : "dark"))}>
      <i className="bi bi-moon-stars-fill"></i>
    </button>
  )
}