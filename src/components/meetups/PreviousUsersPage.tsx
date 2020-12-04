import React, { useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";

import {
  getPreviousUsers,
  useAccountState,
} from "../../contexts/accountContext";
import { useToken } from "../../contexts/tokenContext";
import useConstructor from "../../hooks/useConstructor";
import { PreviousUser } from "../../models/accounts";
import { AccountRoutes, StackNavigationProps } from "../../routes";
import { Text, ThemedListItem, ThemedRefreshControl } from "../themed";
import Box from "../themed/Box";

export const PreviousUsersPageOptions = {
  title: "Previous Users",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  list: {
    flexGrow: 1,
  },
});

export default function PreviousUsersPage({
  navigation,
}: StackNavigationProps<AccountRoutes, "PreviousUsers">) {
  const {
    account: { email },
  } = useAccountState();
  const [{ refreshToken }, tokenDispatch] = useToken();

  // Create state for the list of previous users
  const [previousUsers, setPreviousUsers] = useState<PreviousUser[]>();
  const [isRefreshing, setRefreshing] = useState(false);

  const loadPreviousUsers = async () => {
    setRefreshing(true);
    const loadedUsers =
      (await getPreviousUsers(email, refreshToken, tokenDispatch)) ?? [];
    // Set the previous users
    setPreviousUsers(loadedUsers);
    setRefreshing(false);
  };

  // Load in previous users
  useConstructor(loadPreviousUsers);

  // Component to be rendered for each person
  const renderPerson = ({ item }: ListRenderItemInfo<PreviousUser>) => (
    <ThemedListItem
      title={`${item.fname} ${item.lname}`}
      onPress={() => navigation.push("PreviousProfile", { previousUser: item })}
      chevron
    />
  );

  // Component to be rendered if list is empty
  const emptyList = () => (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text variant="listHeader">You have not met with any users</Text>
    </Box>
  );

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <FlatList
        data={previousUsers}
        keyExtractor={(user) => user.email}
        renderItem={renderPerson}
        ListEmptyComponent={emptyList}
        contentContainerStyle={styles.list}
        refreshControl={
          <ThemedRefreshControl
            onRefresh={loadPreviousUsers}
            refreshing={isRefreshing}
          />
        }
      />
    </Box>
  );
}
