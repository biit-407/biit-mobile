import React from "react";
import { StyleSheet } from "react-native";
import { StackNavigationOptions } from "@react-navigation/stack";

import Box from "../themed/Box";
import { useAccountState } from "../../contexts/accountContext";
import { useToken } from "../../contexts/tokenContext";
import {
  getPastMeetupsList,
  useMeetupDispatch,
} from "../../contexts/meetupContext";
import { Meetup } from "../../models/meetups";
import { AccountRoutes, StackNavigationProps } from "../../routes";
import { ProfileCard, ThemedButton } from "../themed";
import { useConstructor } from "../../hooks";
import { useNotificationCenter } from "../../contexts/notificationCenterContext";
import NotificationCenter from "../userUtils/NotificationCenter";

//  Page Options

export const ViewProfilePageOptions: StackNavigationOptions = {
  title: "View Profile",
};

// Page Styles

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
});

// Page Definition

export default function ViewProfilePage({
  navigation,
}: StackNavigationProps<AccountRoutes, "ViewProfile">) {
  // Get account info
  const [tokenState, tokenDispatch] = useToken();
  const accountState = useAccountState();
  const { fname, lname, profileImage, email } = accountState.account;
  const fullname = `${fname} ${lname}`;

  // Get meetup context and create list of meetings
  const meetupDispatch = useMeetupDispatch();
  const [pastMeetups, setPastMeetups] = React.useState<Meetup[]>([]);

  const loadPastMeetups = async () => {
    const meetups = await getPastMeetupsList(
      meetupDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      email
    );
    setPastMeetups(meetups);
  };

  // Load past meetups upon navigating
  useConstructor(() => loadPastMeetups());

  const [notificationCenterState, ] = useNotificationCenter();

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <ProfileCard
        avatarURI={profileImage}
        name={fullname}
        onEdit={() => navigation.push("EditProfile")}
      />

      <ThemedButton
        title="View Previous Meetups"
        onPress={() => navigation.navigate("PreviousMeetups", { pastMeetups })}
      />

      <ThemedButton
        title="View Previous Users"
        onPress={() => navigation.push("PreviousUsers")}
      />
      <NotificationCenter
        isVisible={notificationCenterState.visible}
      />
    </Box>
  );
}
