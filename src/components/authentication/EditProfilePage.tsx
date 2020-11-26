import React from "react";
import { Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  HeaderBackButton,
  StackHeaderLeftButtonProps,
  StackNavigationOptions,
} from "@react-navigation/stack";

import { AccountRoutes, StackNavigationProps } from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";

import UpdateProfileForm from "./UpdateProfileForm";

// Page Options

export const EditProfilePageOptions: StackNavigationOptions = {
  title: "Edit Profile",
  headerLeft: () => <EditBackButton />,
};

// Generic Image Selection

function EditBackButton({}: StackHeaderLeftButtonProps) {
  const navigator = useNavigation();
  return (
    <HeaderBackButton
      onPress={() =>
        Alert.alert(
          "Discard Changes?",
          "Are you sure your go back and discard your changes?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            { text: "OK", onPress: navigator.goBack },
          ]
        )
      }
    />
  );
}

// Page Styles

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

// Page Definition

export default function EditProfilePage({
  navigation,
}: StackNavigationProps<AccountRoutes, "EditProfile">) {
  return (
    <Box backgroundColor="mainBackground" pt="md" style={styles.root}>
      <Text variant="body" mb="lg" textAlign="center">
        Update and save your profile
      </Text>
      <UpdateProfileForm onFormSubmit={navigation.goBack} />
    </Box>
  );
}
