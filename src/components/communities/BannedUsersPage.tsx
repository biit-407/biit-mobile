import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import {
    getCommunity, loadCommunity, unbanUserFromCommunity, useCommunity
} from '../../contexts/communityContext';
import { useNotificationCenter } from '../../contexts/notificationCenterContext';
import { useToken } from '../../contexts/tokenContext';
import { Ban } from '../../models/community';
import { CommunityRoutes, StackNavigationProps } from '../../routes';
import Box from '../themed/Box';
import ThemedIcon from '../themed/ThemedIcon';
import ThemedListItem from '../themed/ThemedListItem';
import ThemedRefreshControl from '../themed/ThemedRefreshControl';
import NotificationCenter from '../userUtils/NotificationCenter';

// Page Options

export const BannedUsersPageOptions = {
  title: "Banned Users",
};

// Page Styles

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

const showUnbanDialog = (
  ban: Ban,
  onConfirm: (unbannedEmail: Ban) => void,
  onCancel?: () => void
) => {
  const { name } = ban;
  Alert.alert(
    `Unban ${name}?`,
    `Are you sure you want to unban ${name} from this community?`,
    [
      {
        text: "Cancel",
        style: "cancel",
        onPress: onCancel,
      },
      {
        text: "OK",
        onPress: () => onConfirm(ban),
      },
    ]
  );
};

// Page Definition

export default function BannedUsersPage({
  route,
}: StackNavigationProps<CommunityRoutes, "BannedUsers">) {
  // Create state for refreshing data and list of banned users
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [bannedUsers, setBannedUsers] = useState<Ban[]>([]);

  // Get community specific information
  const [communityState, communityDispatch] = useCommunity();
  const [tokenState, tokenDispatch] = useToken();

  // Create function to unban a user on the backend

  const unbanUser = async (ban: Ban) => {
    await unbanUserFromCommunity(
      tokenDispatch,
      tokenState.refreshToken,
      ban.ordered_by,
      ban.name,
      route.params.name
    );
    loadBannedUserData();
  };

  // Create function to load banned user data
  const loadBannedUserData = async () => {
    setIsRefreshing(true);
    await loadCommunity(
      communityDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      route.params.name
    );
    setIsRefreshing(false);
  };

  // When community state updates, retrieve the updated community's banned user list
  useEffect(() => {
    const loadedCommunity = getCommunity(communityState, route.params.name);
    setBannedUsers(loadedCommunity.bans);
  }, [communityState, route.params.name]);

  // Create effect to load banned user data initially
  useEffect(() => {
    loadBannedUserData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [notificationCenterState, ] = useNotificationCenter();

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <FlatList
        data={bannedUsers}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <ThemedListItem
              title={item.name}
              rightContent={
                <Box mr="xs">
                  <ThemedIcon
                    size={24}
                    name="x"
                    type="feather"
                    onPress={() => showUnbanDialog(item, unbanUser)}
                  />
                </Box>
              }
            />
          );
        }}
        keyExtractor={(item: Ban) => item.name}
        refreshControl={
          <ThemedRefreshControl
            onRefresh={loadBannedUserData}
            refreshing={isRefreshing}
          />
        }
      />
      <NotificationCenter
        isVisible={notificationCenterState.visible}
      />
    </Box>
  );
}
