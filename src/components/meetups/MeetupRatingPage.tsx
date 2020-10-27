import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { AirbnbRating } from "react-native-elements";
import { useTheme } from "@shopify/restyle";

import {
  MeetupRatingPageNavigationProp,
  MeetupRatingPageRouteProp,
} from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedCard from "../themed/ThemedCard";
import ThemedButton from "../themed/ThemedButton";
import { Theme } from "../../theme";

type MeetupRatingPageProps = {
  route: MeetupRatingPageRouteProp;
  navigation: MeetupRatingPageNavigationProp;
};

export const MeetupRatingPageOptions = {
  title: "Meetup Rating",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function MeetupRatingPage({
  navigation,
  route,
}: MeetupRatingPageProps) {
  // TODO: Load in real data of the passed in meetingMeetupRatingPageProps
  const { meetupID } = route.params;
  const meetupTime = "3:00 PM";
  const meetupDuration = 25;
  const meetupLocation = "Online";
  const meetupParticipants = ["John Smith", "Bob Smith", "Alice Smith"];

  // TODO: Make this prettier
  const renderParticipant = ({ item }: { item: string }) => (
    <Text variant="body">{item}</Text>
  );

  const [rating, setRating] = useState(3);
  const submitRating = () => {
    //   TODO: Integrate rating with the backend
    console.log(`Rated meetup ${meetupID} as ${rating}/5`);
    navigation.goBack();
  };

  const theme = useTheme<Theme>();

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
      <ThemedCard>
        <Text variant="body">How would you rate your experience?</Text>
        <AirbnbRating /* @ts-ignore:disable-next-line */
          reviewColor={theme.colors.iconPrimary}
          defaultRating={rating}
          selectedColor={theme.colors.iconPrimary}
          onFinishRating={setRating}
        />
        <Box mt="md">
          <ThemedButton title="Submit Rating" onPress={submitRating} />
        </Box>
      </ThemedCard>
    </Box>
  );
}
