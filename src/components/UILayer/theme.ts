import { createTheme, ThemeOptions } from "@mui/material";

declare module "@mui/material" {
  interface Color {
    0: string;
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    A100: string;
    A200: string;
    A400: string;
    A700: string;
  }
}

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#6F933D",
    },
    secondary: {
      main: "#E75555",
    },
    error: {
      main: "#F44336",
    },
    divider: "#E5E5E5",
    background: {
      default: "#FBFDFC",
    },
    grey: {
      0: "#FFFFFF",
      100: "#F8FAFB",
      200: "#F4F6F8",
      300: "#DFE3E8",
      400: "#C4CDD5",
      500: "#919EAB",
      600: "#637381",
      700: "#454F5B",
      800: "#212B36",
      900: "#161C24",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: "#E5E5E5",
        },
      },
    },
  },
};

// Create a theme instance.
const theme = createTheme(themeOptions);

export default theme;
