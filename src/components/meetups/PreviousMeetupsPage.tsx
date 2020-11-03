import React from "react";
import { FlatList, StyleSheet } from "react-native";

import {
  PreviousMeetupsPageRouteProp,
  PreviousMeetupsPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import { BLANK_MEETUP, Meetup } from "../../models/meetups";
import useConstructor from "../../hooks/useConstructor";

import MeetupCard from "./MeetupCard";

type PreviousMeetupsPageProps = {
  route: PreviousMeetupsPageRouteProp;
  navigation: PreviousMeetupsPageNavigationProp;
};

export const PreviousMeetupsPageOptions = {
  title: "Previous Meetups",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function PreviousMeetupsPage({
  route,
}: PreviousMeetupsPageProps) {
  const { pastMeetupIDs } = route.params;

  const [meetups, setMeetups] = React.useState<Meetup[]>([]);
  const load = (meetupIDs: string[]) => {
    const ml = [];
    for (const meetupID in meetupIDs) {
      // TODO load meetup
      ml.push({ ...BLANK_MEETUP, id: meetupID });
    }
    setMeetups(ml);
  };

  useConstructor(() => {
    load(pastMeetupIDs);
  });

  const renderMeetup = ({ item, index }: { item: Meetup; index: number }) => {
    const acceptedUsers = [];
    for (const [key, value] of Object.entries(item.user_list)) {
      if (value === 1) {
        acceptedUsers.push(key);
      }
    }
    return (
      <MeetupCard
        id={item.id}
        duration={item.duration}
        timestamp={item.timestamp}
        userList={acceptedUsers}
        location={item.location}
        key={index.toString()}
      />
    );
  };

  return (
    <Box backgroundColor="mainBackground" style={{ ...styles.root }}>
      <FlatList
        data={meetups}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={renderMeetup}
        style={{ width: "100%" }}
        ListFooterComponent={<Box style={{ opacity: 1, height: 32 }} />}
      />
    </Box>
  );
}
