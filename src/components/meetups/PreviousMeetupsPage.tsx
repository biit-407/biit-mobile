import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { StackNavigationProps, AccountRoutes } from "../../routes";
import Box from "../themed/Box";
import { Meetup } from "../../models/meetups";
import useConstructor from "../../hooks/useConstructor";

import MeetupCard from "./MeetupCard";

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
}: StackNavigationProps<AccountRoutes, "PreviousMeetups">) {
  const { pastMeetups } = route.params;

  const [meetups, setMeetups] = React.useState<Meetup[]>([]);
  const load = (meetupsList: Meetup[]) => {
    setMeetups(meetupsList);
  };

  useConstructor(() => {
    load(pastMeetups);
  });

  const renderMeetup = ({ item }: { item: Meetup; index: number }) => {
    return (
      <MeetupCard
        id={item.id}
        duration={item.duration}
        timestamp={item.timestamp}
        userList={item.user_list}
        location={item.location}
        meetupType={"accepted"}
        isClickable={false}
        // key={index.toString()}
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
