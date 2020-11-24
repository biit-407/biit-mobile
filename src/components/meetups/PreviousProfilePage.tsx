import React from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import {
  PreviousProfilePageRouteProp,
  PreviousProfilePageNavigationProp,
} from "../../routes";
import { ProfileCard, ThemedButton } from "../themed";
import Box from "../themed/Box";

import MeetupCard from "./MeetupCard";

type PreviousProfilePageProps = {
  route: PreviousProfilePageRouteProp;
  navigation: PreviousProfilePageNavigationProp;
};

export const PreviousProfilePageOptions = {
  title: "Previous Profile",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function PreviousProfilePage({
  route,
}: PreviousProfilePageProps) {
  const {
    previousUser: { fname, lname, commonMeetups },
  } = route.params;

  const reconnect = () => true;

  return (
    <Box backgroundColor="mainBackground" style={{ ...styles.root }}>
      <Box width="100%">
        <ProfileCard name={`${fname} ${lname}`} />
        <ThemedButton
          title={`Reconnect with ${fname} ${lname}`}
          onPress={reconnect}
        />
        <FlatList
          data={commonMeetups}
          renderItem={({ item }) => <MeetupCard {...item} />}
        />
      </Box>
    </Box>
  );
}
