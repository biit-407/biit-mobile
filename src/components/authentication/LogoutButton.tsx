import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ThemedButton from "../themed/ThemedButton";

export default function LogoutButton() {
  const navigation = useNavigation();
  const showLogoutDialog = () => {
    Alert.alert("Logout?", "Are you sure you want to logout of your account?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          // TODO: Run the logout hook
          //Navigate back to login
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
  };

  return <ThemedButton title="Logout" onPress={showLogoutDialog} />;
}
