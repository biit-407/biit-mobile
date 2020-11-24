import React from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";

import {
  PreviousUsersPageRouteProp,
  PreviousUsersPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import useConstructor from "../../hooks/useConstructor";
import { ThemedListItem } from "../themed";
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
});

export default function PreviousUsersPage({
  navigation,
}: PreviousUsersPageProps) {
  //   const [meetups, setMeetups] = React.useState<Meetup[]>([]);
  //   const load = (meetupsList: Meetup[]) => {
  //     setMeetups(meetupsList);
  //   };

  const previousUsers: PreviousUser[] = [
    {
      fname: "Daniel",
      lname: "Kambich",
      email: "test@gmail.com",
      commonMeetups: [{ ...BLANK_MEETUP }],
    },
  ];
  useConstructor(() => {
    // TODO: Load in previous people objects
    // load(pastMeetups);
  });

  const renderPerson = ({ item }: ListRenderItemInfo<PreviousUser>) => (
    <ThemedListItem
      avatarUri={item.profileImage ?? EMPTY_PROFILE_PIC}
      title={`${item.fname} ${item.lname}`}
      onPress={() => navigation.push("PreviousProfile", { previousUser: item })}
    />
  );

  return (
    <Box backgroundColor="mainBackground" style={{ ...styles.root }}>
      <FlatList
        data={previousUsers}
        keyExtractor={(user) => user.email}
        renderItem={renderPerson}
      />
    </Box>
  );
}
