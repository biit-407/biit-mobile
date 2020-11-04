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
  // TODO: Load in real data of the passed in meeting
  const { meetupID, timestamp, location, duration, userList } = route.params;
  // const meetupTime = "3:00 PM";
  // const meetupDuration = "25";
  // const meetupLocation = "Online";
  // const meetupParticipants = ["John Smith", "Bob Smith", "Alice Smith"];

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box style={{ width: "100%" }}>
        <MeetupCard
          id={meetupID}
          duration={duration}
          timestamp={timestamp}
          userList={userList}
          location={location}
          meetupType={"accepted"}
          isClickable={false}
        />
      </Box>
    </Box>
  );
}
