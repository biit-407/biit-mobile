import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";

import {
  EditProfilePageNavigationProp,
  EditProfilePageRouteProp,
} from "../../routes";
import Box from "../themed/Box";

// React Navigation Types and Page Options

type EditProfilePageProps = {
  navigation: EditProfilePageNavigationProp;
  route: EditProfilePageRouteProp;
};

export const EditProfilePageOptions: StackNavigationOptions = {
  title: "Edit Profile",
};

// Page Styles

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

// Page Definition

export default function EditProfilePage({ navigation }: EditProfilePageProps) {
  return <Box backgroundColor="mainBackground" style={styles.root} />;
}
