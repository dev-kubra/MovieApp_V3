import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContextProvider";

export default function MainLayout () {
  const { theme } = useContext(ThemeContext);
  const color = (theme === "dark" ? "bg-dark text-white" : "bg-light text-dark");

  return(
    <>
      <NavBar/>

      <main className={color}>
        <Outlet/>
      </main>

      <Footer />
    </>
  )
}