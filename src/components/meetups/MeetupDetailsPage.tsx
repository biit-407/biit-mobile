import React from "react";
import { StyleSheet } from "react-native";
import { useNotificationCenter } from "../../contexts/notificationCenterContext";

import { HomeRoutes, StackNavigationProps } from "../../routes";
import Box from "../themed/Box";
import NotificationCenter from "../userUtils/NotificationCenter";

import MeetupCard from "./MeetupCard";

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

export default function MeetupDetailsPage({
  route,
}: StackNavigationProps<HomeRoutes, "MeetupDetails">) {
  // TODO: Load in real data of the passed in meeting
  const { meetupID, timestamp, location, duration, userList } = route.params;
  const [notificationCenterState, ] = useNotificationCenter();

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
      <NotificationCenter
        isVisible={notificationCenterState.visible}
      />
    </Box>
  );
}
