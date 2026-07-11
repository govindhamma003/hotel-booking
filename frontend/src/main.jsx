import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./themes/lightTheme";
import { colorStyles } from "./styles/utilities/_color";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={lightTheme}>
      {colorStyles}
      <App />
    </ThemeProvider>
  </StrictMode>
);