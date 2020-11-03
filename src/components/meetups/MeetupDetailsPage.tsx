import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { getMeetupDetails } from "../../contexts/meetupContext";
import { useTokenState } from "../../contexts/tokenContext";
import { useConstructor } from "../../hooks";
import { BLANK_MEETUP, Meetup } from "../../models/meetups";
import {
  MeetupDetailsPageNavigationProp,
  MeetupDetailsPageRouteProp,
} from "../../routes";
import Box from "../themed/Box";

import MeetupCard from "./MeetupCard";

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

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box style={{ width: "100%" }}>
        <MeetupCard
          id={id}
          duration={duration}
          timestamp={timestamp}
          userList={acceptedUsers}
          location={location}
        />
      </Box>
    </Box>
  );
}
