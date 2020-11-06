import { createTheme } from "@shopify/restyle";

const palette = {
  tanLight: "#FFE8C6", // Page Background and Light Text Color
  tanPrimary: "#FAD092", // Card Background Color
  tanDark: "#D8AD6D", // Header and Button Background Color

  brownLight: "#B88953", // Button Background and Light Icon Color
  brownPrimary: "#73572C", // Primary Icon Color
  brownDark: "#3D2400", // Primary Text and Drawer Color

  black: "#000000",
  white: "#FFFFFF",

  darkGreen: "#1e6928",
  darkRed: "#ab2115",
};

const theme = createTheme({
  colors: {
    mainBackground: palette.tanLight,
    mainForeground: palette.tanDark,
    drawerBackground: palette.brownDark,
    drawerPrimaryText: palette.tanLight,
    headerBackground: palette.tanDark,
    primaryText: palette.brownDark,
    borderPrimary: palette.brownLight,
    cardBackground: palette.tanPrimary,
    cardBorder: palette.brownDark,
    buttonPrimaryBackground: palette.tanDark,
    buttonPrimaryText: palette.white,
    buttonSecondaryBackground: palette.brownLight,
    buttonSecondaryText: palette.white,
    textInputDefault: palette.brownLight,
    secondaryText: palette.white,
    iconPrimary: palette.brownPrimary,
    iconSelectedGreen: palette.darkGreen,
    iconSelectedRed: palette.darkRed,

    sliderMarkerDisabled: palette.tanDark,
    sliderMarkerEnabled: palette.brownLight,
    sliderTrackSelected: palette.brownPrimary,
    sliderTrackUnselected: palette.tanPrimary,

    sectionListHeader: palette.tanDark,
    switchTrackEnabled: palette.tanDark,
    switchTrackDisabled: palette.tanPrimary,
    switchThumbEnabled: palette.brownLight,
    switchThumbDisabled: palette.tanDark,
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
    largeHeader: {
      fontSize: 28,
      fontWeight: "bold",
      color: "primaryText",
    },
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
    listHeader: { fontSize: 20 },
    sectionListHeader: {
      fontSize: 20,
      fontWeight: "bold",
      color: "primaryText",
    },
  },
});

export type Theme = typeof theme;
export default theme;
