import React from 'react';
import { Alert } from 'react-native';

import { deleteAccount, useAccount } from '../../contexts/accountContext';
import { useAzure } from '../../contexts/azureContext';
import { useToken } from '../../contexts/tokenContext';
import { ThemedListItem } from '../themed';

export default function DeleteAccountButton() {
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
          },
        },
      ]
    );
  };

  return (
    <ThemedListItem
      iconName="trash-2"
      iconType="feather"
      title="Delete Account"
      subtitle="Delete your account and associated data"
      onPress={showDeletionDialog}
    />
  );
}
