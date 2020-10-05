import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import {
  BannedUsersPageNavigationProp,
  BannedUsersPageRouteProp,
} from "../../routes";
import { Account } from "../../models/accounts";
import Box from "../themed/Box";
import ThemedIcon from "../themed/ThemedIcon";
import ThemedListItem from "../themed/ThemedListItem";
import ThemedRefreshControl from "../themed/ThemedRefreshControl";

// React Navigation Types and Page Options

type BannedUsersPageProps = {
  navigation: BannedUsersPageNavigationProp;
  route: BannedUsersPageRouteProp;
};

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
  user: Account,
  onConfirm: (user: Account) => void,
  onCancel?: () => void
) => {
  const { fname, lname } = user;
  Alert.alert(
    `Unban ${fname} ${lname}?`,
    `Are you sure you want to unban ${fname} ${lname} from this community?`,
    [
      {
        text: "Cancel",
        style: "cancel",
        onPress: onCancel,
      },
      {
        text: "OK",
        onPress: () => onConfirm(user),
      },
    ]
  );
};

// Page Definition

export default function BannedUsersPage({}: BannedUsersPageProps) {
  // Create state for refreshing data and list of banned users
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [bannedUsers, setBannedUsers] = useState<Account[]>([]);
  // Create function to unban a user on the backend
  // TODO: Integrate functionality with backend
  const unbanUser = (user: Account) => {
    bannedUsers.splice(bannedUsers.indexOf(user), 1);
    setBannedUsers([...bannedUsers]);
  };
  // Create function to load banned user data
  // TODO: Inegrate functionality with backend
  const loadBannedUserData = async () => {
    setIsRefreshing(true);
    // TODO: Fetch data from the backend to get updated users list

    setIsRefreshing(false);
  };

  // Create effect to load banned user data initially
  useEffect(() => {
    loadBannedUserData();
  }, []);

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <FlatList
        data={bannedUsers}
        renderItem={({ item }) => (
          <ThemedListItem
            avatarUri={item.profileImage}
            title={`${item.fname} ${item.lname}`}
            rightContent={
              <Box mr="xs">
                <ThemedIcon
                  size={24}
                  name="cross"
                  type="entypo"
                  onPress={() => showUnbanDialog(item, unbanUser)}
                />
              </Box>
            }
          />
        )}
        keyExtractor={(item: Account) => item.email} // TODO: Replace with UID field, though email should be unique
        refreshControl={
          <ThemedRefreshControl
            onRefresh={loadBannedUserData}
            refreshing={isRefreshing}
          />
        }
      />
    </Box>
  );
}
