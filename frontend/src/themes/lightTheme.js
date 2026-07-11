import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#0D3D1E",
    },
    secondary: {
      main: "#f5c518",
    },
    background: {
      default: "#0D3D1E",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export { lightTheme };