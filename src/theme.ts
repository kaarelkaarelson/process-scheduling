import { ThemeProvider, createTheme, PaletteColorOptions } from "@mui/material/styles";
import { purple, green, teal, blue, orange } from "@mui/material/colors";
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }

  interface CustomPalette {
    // primary: {
    // main: PaletteColorOptions;
    // light: PaletteColorOptions;
    // dark: PaletteColorOptions;
    // extraLight: string;
    // };
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    // primary: {
    // main: true;
    // light: true;
    // dark: true;
    // extraLight: true;
    // };
  }
}

export const theme = createTheme({
  palette: {
    background: {
    },
    mode: "dark",
    // primary: {
    //   main: teal[500],
    //   light: '#96B1AC',
    //   dark: '#334B48',
    // },
    primary: {
      // main: '#286DA8',
      // main: '#00ffff',
      main: '#102542',
      // main: "#416a59",
      // secondary: '#416a59',
      dark: teal[500],
      // light: '#73a24e',
      light: teal[700],
      // light: "#a9c25d",
    },
    secondary: {
      // main: orange[500]
      main: '#1fcecb'
    }
    // extraLight: "#f5eec2",
    // accent: orange[500],
    // extraLight: "#73a24e",
    // extraLight: "#73a24e",
  },

      // default: "#f5eec2",
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    fontSize: 16,
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 800,
      laptop: 1024,
      desktop: 1200,
    },
  },
});
