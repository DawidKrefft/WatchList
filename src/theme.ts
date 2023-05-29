import { createTheme, PaletteMode } from "@mui/material";
import { blue, grey, orange, purple, red, teal } from "@mui/material/colors";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light Mode
          primary: {
            light: red[300],
            main: red[500],
            dark: red[900],
          },
          secondary: {
            light: orange[300],
            main: orange[500],
            dark: orange[900],
          },
          divider: grey[200],
          background: {
            default: grey[100],
            paper: grey[50],
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // Dark Mode
          primary: {
            light: blue[300],
            main: blue[500],
            dark: blue[700],
          },
          secondary: {
            light: teal[300],
            main: teal[500],
            dark: teal[700],
          },
          divider: purple[700],
          background: {
            default: grey[900],
            paper: grey[800],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});

// generate theme based on mode
export const themeSettings = (mode: PaletteMode) => {
  return createTheme(getDesignTokens(mode));
};
