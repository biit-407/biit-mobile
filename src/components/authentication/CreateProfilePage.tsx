import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { StackNavigationProps, AccountRoutes } from "../../routes";
import Text from "../themed/Text";
import Box from "../themed/Box";

import UpdateProfileForm from "./UpdateProfileForm";

// Page Options

// Note: Needed to create this as a its own component to access navigation in the header
const SkipButton = () => {
  const navigation = useNavigation();
  return (
    <Box me="lg">
      <TouchableOpacity
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "UserSettings" }],
          });
        }}
      >
        <Text variant="link">Skip</Text>
      </TouchableOpacity>
    </Box>
  );
};

export const CreateProfilePageOptions = {
  title: "",
  headerTransparent: true,
  headerRight: () => <SkipButton />,
};

// Page Styles

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default function CreateProfilePage({
  navigation,
}: StackNavigationProps<AccountRoutes, "CreateProfile">) {
  return (
    <Box
      backgroundColor="mainBackground"
      style={{ ...styles.root, paddingTop: useHeaderHeight() }}
    >
      <Text variant="header" textAlign="center">
        Setup your profile
      </Text>
      <Text variant="body" textAlign="center" mb="xl">
        Take a minute to customize your profile
      </Text>
      <UpdateProfileForm
        onFormSubmit={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        }}
      />
    </Box>
  );
}
