import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App";
import "./index.css";
import { ThemeContextProvider } from "./contexts/ThemeContextProvider";
import UserContextProvider from "./contexts/UserContextProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ThemeContextProvider>
  </StrictMode>
);
