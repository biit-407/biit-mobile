import React from "react";
import { Alert } from "react-native";
import { Button } from "react-native-elements";

import { deleteAccount, useAccount } from "../../contexts/accountContext";
import { useToken } from "../../contexts/tokenContext";
import { useAzure } from "../../contexts/azureContext";
import theme from "../../theme";

export default function DeleteAccountButton() {
  const [accountState, accountDispatch] = useAccount();
  const [tokenState, tokenDispatch] = useToken();
  const [, azureDispatch] = useAzure();

  //! This should be done implicitly now
  // useEffect(() => {
  //   console.log(accountState.status);
  //   if (accountState.status === "logged out") {
  //     // Navigate back to the login page once account is logged out
  //     // TODO fix this
  //     // navigation.reset({
  //     //   index: 0,
  //     //   routes: [{ name: "Login" }],
  //     // });
  //   }
  // }, [accountState.status, navigation]);

  const showDeletionDialog = () => {
    Alert.alert(
      "Delete Account?",
      "Are you sure you want to delete your account? This action is irreversible and will delete any associated data",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            deleteAccount(
              accountDispatch,
              tokenDispatch,
              azureDispatch,
              tokenState.refreshToken,
              accountState.account
            );
          },
        },
      ]
    );
  };

  return (
    <Button
      title="Delete Account"
      onPress={showDeletionDialog}
      buttonStyle={{ backgroundColor: theme.colors.iconSelectedRed }}
    />
  );
}
