import React from 'react';

import { useTheme } from '@shopify/restyle';

import { ThemedIcon } from '../components/themed';
import { Theme } from '../theme';
import { useNotificationCenter } from '../contexts/notificationCenterContext';


export const NotificationCenterIcon = () => {
  const theme = useTheme<Theme>();
  const [notificationCenterState, notificationCenterDispatch] = useNotificationCenter();

  return (
    <ThemedIcon
      size={24}
      reverse
      name="bell"
      type="feather"
      onPress={() =>{
        notificationCenterState.visible ? notificationCenterDispatch({type: "hide"}) : notificationCenterDispatch({type: "show"});
      }}
      color={theme.colors.headerBackground}
      iconStyle={{ color: theme.colors.primaryText }}
    />
  );
};
