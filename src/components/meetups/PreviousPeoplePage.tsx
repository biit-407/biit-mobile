import React from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";

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
    justifyContent: "flex-start",
  },
});

export default function PreviousPeoplePage({
  navigation,
}: PreviousPeoplePageProps) {
  //   const [meetups, setMeetups] = React.useState<Meetup[]>([]);
  //   const load = (meetupsList: Meetup[]) => {
  //     setMeetups(meetupsList);
  //   };

  const data = ["Daniel"];
  useConstructor(() => {
    // TODO: Load in previous people objects
    // load(pastMeetups);
  });

  const renderPerson = ({ item }: ListRenderItemInfo<string>) => (
    <ThemedListItem
      title={item}
      onPress={() => navigation.push("PreviousProfile")}
    />
  );

  return (
    <Box backgroundColor="mainBackground" style={{ ...styles.root }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={renderPerson}
        ListFooterComponent={<Box style={{ opacity: 1, height: 32 }} />}
      />
    </Box>
  );
}
