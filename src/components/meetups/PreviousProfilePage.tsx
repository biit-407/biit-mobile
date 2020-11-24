import React from "react";
import { StyleSheet } from "react-native";

import {
  PreviousProfilePageRouteProp,
  PreviousProfilePageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";

type PreviousProfilePageProps = {
  route: PreviousProfilePageRouteProp;
  navigation: PreviousProfilePageNavigationProp;
};

export const PreviousProfilePageOptions = {
  title: "Previous Profile",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function PreviousProfilePage({}: PreviousProfilePageProps) {
  return (
    <Box backgroundColor="mainBackground" style={{ ...styles.root }}></Box>
  );
}
