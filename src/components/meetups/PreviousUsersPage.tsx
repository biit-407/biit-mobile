import React, { useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";

import {
  PreviousUsersPageRouteProp,
  PreviousUsersPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import useConstructor from "../../hooks/useConstructor";
import { Text, ThemedListItem } from "../themed";
import { PreviousUser } from "../../models/accounts";
import { EMPTY_PROFILE_PIC } from "../../models/constants";
import { BLANK_MEETUP } from "../../models/meetups";

type PreviousUsersPageProps = {
  route: PreviousUsersPageRouteProp;
  navigation: PreviousUsersPageNavigationProp;
};

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
}: PreviousUsersPageProps) {
  // Create state for the list of previous users
  const [previousUsers, setPreviousUsers] = useState<PreviousUser[]>();

  // Load in previous users
  useConstructor(() => {
    // TODO: Load in previous users
    const loadedUsers = [
      {
        fname: "Daniel",
        lname: "Kambich",
        email: "test@gmail.com",
        commonMeetups: [{ ...BLANK_MEETUP }],
      },
    ];
    // Set the previous users
    setPreviousUsers(loadedUsers);
  });

  // Component to be rendered for each person
  const renderPerson = ({ item }: ListRenderItemInfo<PreviousUser>) => (
    <ThemedListItem
      avatarUri={item.profileImage ?? EMPTY_PROFILE_PIC}
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
      />
    </Box>
  );
}
