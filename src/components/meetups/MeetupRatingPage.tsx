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
import { BLANK_MEETUP, Meetup } from "../../models/meetups";
import { useTokenState } from "../../contexts/tokenContext";
import { useConstructor } from "../../hooks";
import { getMeetupDetails } from "../../contexts/meetupContext";

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
  // Create state for the meetup to be loaded
  const { meetupID } = route.params;
  const [meetup, setMeetup] = useState<Meetup>(BLANK_MEETUP);

  // Retrieve account information
  const { refreshToken } = useTokenState();

  // Load the meetup details
  useConstructor(async () => {
    const [meetupDetails] = await getMeetupDetails(refreshToken, meetupID);
    setMeetup(meetupDetails);
  });

  // TODO: Timestamp currently is just an integer, need to convert it to a time
  const { id, timestamp, duration, location, user_list } = meetup; // eslint-disable-line camelcase

  // Convert users dict to a list of accepted users
  const acceptedUsers = [];
  for (const [key, value] of Object.entries(user_list)) {
    if (value === 1) {
      acceptedUsers.push(key);
    }
  }

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
        <MeetupCard
          id={id}
          timestamp={timestamp}
          duration={duration}
          location={location}
          userList={acceptedUsers}
        />
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
