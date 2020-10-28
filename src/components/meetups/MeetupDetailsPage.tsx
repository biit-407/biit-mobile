import React from "react";
import { FlatList, StyleSheet } from "react-native";

import {
  MeetupDetailsPageNavigationProp,
  MeetupDetailsPageRouteProp,
} from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedCard from "../themed/ThemedCard";

type MeetupDetailsPageProps = {
  route: MeetupDetailsPageRouteProp;
  navigation: MeetupDetailsPageNavigationProp;
};

export const MeetupDetailsPageOptions = {
  title: "Meetup Details",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function MeetupDetailsPage({ route }: MeetupDetailsPageProps) {
  // TODO: Load in real data of the passed in meeting
  const { meetupID } = route.params;
  const meetupTime = "3:00 PM";
  const meetupDuration = 25;
  const meetupLocation = "Online";
  const meetupParticipants = ["John Smith", "Bob Smith", "Alice Smith"];

  // TODO: Make this prettier
  const renderParticipant = ({ item }: { item: string }) => (
    <Text variant="body">{item}</Text>
  );

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <ThemedCard>
        <Text variant="header">Meetup Details</Text>
        <Text variant="subheader">Starts at {meetupTime}</Text>
        <Text variant="subheader">Lasts {meetupDuration} minutes</Text>
        <Text variant="subheader">{meetupLocation}</Text>
        <Text>{meetupID}</Text>
      </ThemedCard>
      <ThemedCard>
        <Text variant="subheader">Participants</Text>
        <FlatList
          data={meetupParticipants}
          keyExtractor={(item, index) => item + index.toString()}
          renderItem={renderParticipant}
        />
      </ThemedCard>
    </Box>
  );
}
