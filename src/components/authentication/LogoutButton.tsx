import React from 'react';
import { Alert } from 'react-native';

import { logoutAccount, useAccount } from '../../contexts/accountContext';
import { useAzure } from '../../contexts/azureContext';
import { useToken } from '../../contexts/tokenContext';
import { ThemedListItem } from '../themed';

export default function LogoutButton() {
  const [, accountDispatch] = useAccount();
  const [, tokenDispatch] = useToken();
  const [, azureDispatch] = useAzure();

  const showLogoutDialog = () => {
    Alert.alert("Logout?", "Are you sure you want to logout of your account?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          logoutAccount(accountDispatch, tokenDispatch, azureDispatch);
        },
      },
    ]);
  };

  return (
    <ThemedListItem
      iconName="log-out"
      iconType="feather"
      title="Logout"
      subtitle="Log out and remove local account data"
      onPress={showLogoutDialog}
    />
  );
}
