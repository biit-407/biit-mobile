import React from "react";
import { FlatList, StyleSheet } from "react-native";

import {
  PreviousPeoplePageRouteProp,
  PreviousPeoplePageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import useConstructor from "../../hooks/useConstructor";
import { ThemedListItem } from "../themed";

type PreviousPeoplePageProps = {
  route: PreviousPeoplePageRouteProp;
  navigation: PreviousPeoplePageNavigationProp;
};

export const PreviousPeoplePageOptions = {
  title: "Previous People",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function PreviousPeoplePage({}: PreviousPeoplePageProps) {
  //   const [meetups, setMeetups] = React.useState<Meetup[]>([]);
  //   const load = (meetupsList: Meetup[]) => {
  //     setMeetups(meetupsList);
  //   };

  useConstructor(() => {
    // TODO: Load in previous people objects
    // load(pastMeetups);
  });

  const renderPerson = ({ item }) => <ThemedListItem />;

  return (
    <Box backgroundColor="mainBackground" style={{ ...styles.root }}>
      <FlatList
        data={[]}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={renderPerson}
        ListFooterComponent={<Box style={{ opacity: 1, height: 32 }} />}
      />
    </Box>
  );
}
