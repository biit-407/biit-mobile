import { createTheme } from "@shopify/restyle";

const palette = {
  tanLight: "#FFE8C6", //Background Color and Light Text
  tanPrimary: "#FAD092 ", //Card Color
  tanDark: "#D8AD6D", //Header and Button Color

  brownLight: "#B88953", //Button and Light Icon Color
  brownPrimary: "#73572C", //Main Icon Color
  brownDark: "#3D2400", //Text and Dark Icon/Drawer Color

  black: "#000000",
  white: "#FFFFFF",
};

const theme = createTheme({
  colors: {
    mainBackground: palette.tanLight,
    cardPrimaryBackground: palette.tanPrimary,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;
export default theme;
