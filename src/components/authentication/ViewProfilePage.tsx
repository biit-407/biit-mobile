import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import {
  ViewProfilePageNavigationProp,
  ViewProfilePageRouteProp,
} from "../../routes";
import Box from "../themed/Box";
import { useAccountState } from "../../contexts/accountContext";
import { useToken } from "../../contexts/tokenContext";
import {
  getPastMeetupsList,
  useMeetupDispatch,
} from "../../contexts/meetupContext";
import { Meetup } from "../../models/meetups";
import { ProfileCard, ThemedButton } from "../themed";
import { useConstructor } from "../../hooks";

// React Navigation Types and Page Options

type ViewProfilePageProps = {
  navigation: ViewProfilePageNavigationProp;
  route: ViewProfilePageRouteProp;
};

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

export default function ViewProfilePage({ navigation }: ViewProfilePageProps) {
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
    </Box>
  );
}
