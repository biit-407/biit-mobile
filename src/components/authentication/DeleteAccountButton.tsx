import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ThemedButton from "../themed/ThemedButton";
import { deleteAccount, useAccount } from "../../contexts/accountContext";
import { useToken } from "../../contexts/tokenContext";
import { useAzure } from "../../contexts/azureContext";

export default function DeleteAccountButton() {
  const navigation = useNavigation();
  const [accountState, accountDispatch] = useAccount();
  const [tokenState, tokenDispatch] = useToken();
  const [, azureDispatch] = useAzure();

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

            //Navigate back to login
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          },
        },
      ]
    );
  };

  return <ThemedButton title="Delete Account" onPress={showDeletionDialog} />;
}
