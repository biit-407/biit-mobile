import React, { useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ThemedButton from "../themed/ThemedButton";
import { useAccount } from "../../contexts/accountContext";
import { useToken } from "../../contexts/tokenContext";
import { useAzure } from "../../contexts/azureContext";
import { BLANK_AZURE_USER_INFO, BLANK_TOKEN } from "../../models/azure";

export default function LogoutButton() {
  const navigation = useNavigation();
  const [accountState, accountDispatch] = useAccount();
  const [, tokenDispatch] = useToken();
  const [, azureDispatch] = useAzure();

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
          tokenDispatch({ ...BLANK_TOKEN, type: "clear" });
          azureDispatch({
            type: "invalidate",
            ...BLANK_TOKEN,
            grantToken: "",
            userInfo: BLANK_AZURE_USER_INFO,
          });
        },
      },
    ]);
  };

  return <ThemedButton title="Logout" onPress={showLogoutDialog} />;
}
