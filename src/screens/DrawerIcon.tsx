import React from 'react';

import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';

import { ThemedIcon } from '../components/themed';
import { Theme } from '../theme';
import { useNotificationCenter } from '../contexts/notificationCenterContext';

export const DrawerIcon = () => {
  const navigation = useNavigation();
  const theme = useTheme<Theme>();
  const [notificationCenterState, notificationCenterDispatch] = useNotificationCenter();

  return (
    <ThemedIcon
      size={24}
      reverse
      name="menu"
      type="feather"
      onPress={() => {
        if(notificationCenterState.visible) {notificationCenterDispatch({type: "hide"})}
        navigation.dispatch(DrawerActions.toggleDrawer())
      }}
      color={theme.colors.headerBackground}
      iconStyle={{ color: theme.colors.primaryText }}
    />
  );
};
