import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import {
  BannedUsersPageNavigationProp,
  BannedUsersPageRouteProp,
} from "../../routes";
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

// Dummy user info used for now

type User = {
  id: number;
  firstName: string;
  lastName: string;
  profileImage: string;
};

const showUnbanDialog = (
  user: User,
  onConfirm: (user: User) => void,
  onCancel?: () => void
) => {
  const { firstName, lastName } = user;
  Alert.alert(
    `Unban ${firstName} ${lastName}?`,
    `Are you sure you want to unban ${firstName} ${lastName} from this community?`,
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [bannedUsers, setBannedUsers] = useState<User[]>([]);
  const unbanUser = (user: User) => {
    bannedUsers.splice(bannedUsers.indexOf(user), 1);
    setBannedUsers([...bannedUsers]);
  };

  const loadData = async () => {
    setIsRefreshing(true);
    // TODO: Fetch data from the backend to get updated users list
    setTimeout(() => {
      setBannedUsers([
        ...bannedUsers,
        {
          id: Math.random() * 10000000,
          firstName: "John",
          lastName: "Smith" + bannedUsers.length,
          profileImage:
            "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
        },
      ]);
      setIsRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <FlatList
        data={bannedUsers}
        renderItem={({ item }) => (
          <ThemedListItem
            avatarUri={item.profileImage}
            title={`${item.firstName} ${item.lastName}`}
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
        keyExtractor={(item: User) => item.id.toString()}
        refreshControl={
          <ThemedRefreshControl
            onRefresh={loadData}
            refreshing={isRefreshing}
          />
        }
      />
    </Box>
  );
}
