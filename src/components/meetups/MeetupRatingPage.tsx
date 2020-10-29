import React, { useState } from "react";
import { StyleSheet } from "react-native";
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

import MeetupCard from "./MeetupCard";

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
  // const meetupTime = "3:00 PM";
  // const meetupDuration = 25;
  // const meetupLocation = "Online";
  // const meetupParticipants = ["John Smith", "Bob Smith", "Alice Smith"];

  // TODO: Make this prettier
  // const renderParticipant = ({ item }: { item: string }) => (
  //   <Text variant="body">{item}</Text>
  // );

  const [rating, setRating] = useState(3);
  const submitRating = () => {
    //   TODO: Integrate rating with the backend
    console.log(`Rated meetup ${meetupID} as ${rating}/5`);
    navigation.goBack();
  };

  const theme = useTheme<Theme>();

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box style={{ width: "100%" }}>
        <MeetupCard />
        <ThemedCard>
          <Box style={{ width: "100%", alignItems: "center" }}>
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
          </Box>
        </ThemedCard>
      </Box>
    </Box>
  );
}
