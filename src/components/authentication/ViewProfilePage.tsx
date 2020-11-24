import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
// import { StyleSheet } from "react-native";

import {
  ViewProfilePageNavigationProp,
  ViewProfilePageRouteProp,
} from "../../routes";
import Box from "../themed/Box";
import { getProfilePicture, useAccount } from "../../contexts/accountContext";
import { EMPTY_PROFILE_PIC } from "../../models/constants";
import { useToken } from "../../contexts/tokenContext";
import {
  getPastMeetupsList,
  useMeetupDispatch,
} from "../../contexts/meetupContext";
import { Meetup } from "../../models/meetups";
import { ProfileCard, ThemedButton } from "../themed";

// React Navigation Types and Page Options

type ViewProfilePageProps = {
  navigation: ViewProfilePageNavigationProp;
  route: ViewProfilePageRouteProp;
};

export const ViewProfilePageOptions: StackNavigationOptions = {
  title: "View Profile",
};

// Page Styles

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     flexDirection: "column",
//     alignItems: "center",
//   },
// });

// Page Definition

export default function ViewProfilePage({ navigation }: ViewProfilePageProps) {
  const [accountState, accountDispatch] = useAccount();
  const [tokenState, tokenDispatch] = useToken();
  const [avatar, setAvatar] = useState(EMPTY_PROFILE_PIC);
  const meetupDispatch = useMeetupDispatch();
  const [pastMeetups, setPastMeetups] = React.useState<Meetup[]>([]);

  const loadPastMeetups = async () => {
    const meetups = await getPastMeetupsList(
      meetupDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      accountState.account.email
    );
    setPastMeetups(meetups);
  };

  useEffect(() => {
    loadPastMeetups();
    getProfilePicture(
      accountDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      accountState.account
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setAvatar(
      accountState.account.profileImage
        ? accountState.account.profileImage
        : EMPTY_PROFILE_PIC
    );
  }, [accountState.account.profileImage]);

  return (
    <Box
      backgroundColor="mainBackground"
      style={{ flexDirection: "row", height: "100%" }}
    >
      <Box style={{ width: "100%", height: "100%" }}>
        <ProfileCard
          avatarURI={avatar}
          name={accountState.account.fname + " " + accountState.account.lname}
          onEdit={() => navigation.push("EditProfile")}
        />

        {/* TODO fix this hard coding */}
        <ThemedButton
          title="View Previous Meetups"
          onPress={() =>
            navigation.navigate("PreviousMeetups", { pastMeetups: pastMeetups })
          }
        />

        <ThemedButton
          title="View Previous People"
          onPress={() => navigation.push("PreviousUsers")}
        />
      </Box>
    </Box>
  );
}
