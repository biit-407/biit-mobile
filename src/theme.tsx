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
    mainForeground: palette.tanDark,

    primaryText: palette.brownDark,

    cardPrimaryBackground: palette.tanPrimary,
    buttonPrimaryBackground: palette.tanDark,
    buttonPrimaryText: palette.tanLight,
    textInputDefault: palette.brownLight,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontSize: 24,
      fontWeight: "bold",
      color: "primaryText",
    },
    subheader: {
      fontWeight: "600",
      fontSize: 18,
      color: "primaryText",
    },
    body: {
      fontSize: 16,
      color: "primaryText",
    },
    link: {
      textDecorationLine: "underline",
      fontSize: 16,
      color: "primaryText",
    },
  },
});

export type Theme = typeof theme;
export default theme;
