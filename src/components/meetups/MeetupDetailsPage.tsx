import React from "react";
import { StyleSheet } from "react-native";

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
