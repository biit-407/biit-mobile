import React, { useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ThemedButton from "../themed/ThemedButton";
import { useAccount } from "../../contexts/accountContext";

export default function LogoutButton() {
  const navigation = useNavigation();
  const [accountState, accountDispatch] = useAccount();

  // Listen for account state to be logged out
  useEffect(() => {
    if (accountState.status === "logged out") {
      // Navigate back to the login page once account is logged out
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  }, [accountState.status, navigation]);

  const showLogoutDialog = () => {
    Alert.alert("Logout?", "Are you sure you want to logout of your account?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          // Invalidate the current user account to log them out
          accountDispatch({ type: "invalidate", ...accountState });
        },
      },
    ]);
  };

  return <ThemedButton title="Logout" onPress={showLogoutDialog} />;
}
