import React, { useState } from "react";
import { SectionList, SectionListData, StyleSheet } from "react-native";

import {
  MeetupListPageNavigationProp,
  MeetupListPageRouteProp,
} from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedListItem from "../themed/ThemedListItem";
import ThemedIcon from "../themed/ThemedIcon";
import { BLANK_MEETUP, Meetup } from "../../models/meetups";

type MeetupListPageProps = {
  route: MeetupListPageRouteProp;
  navigation: MeetupListPageNavigationProp;
};

export const MeetupListPageOptions = {
  title: "Meetup List",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  list: {
    width: "100%",
  },
});

export default function MeetupListPage({ navigation }: MeetupListPageProps) {
  const [pendingMeetups] = useState([
    { ...BLANK_MEETUP, id: "ABC" },
    { ...BLANK_MEETUP, id: "DEF" },
  ]);
  const [upcomingMeetups] = useState([
    { ...BLANK_MEETUP, id: "GHI" },
    { ...BLANK_MEETUP, id: "JKL" },
  ]);
  const [unratedMeetups] = useState([
    { ...BLANK_MEETUP, id: "MNO" },
    { ...BLANK_MEETUP, id: "PQR" },
  ]);

  const sectionIcons: Record<string, string> = {
    "Pending Meetups": "add-to-list",
    "Upcoming Meetups": "calendar",
    "Unrated Meetups": "star",
  };

  const renderSectionHeader = (title: string) => (
    <Box padding="md" backgroundColor="sectionListHeader" flexDirection="row">
      <ThemedIcon type="entypo" name={sectionIcons[title]} />
      <Text paddingLeft="sm" variant="sectionListHeader">
        {title}
      </Text>
    </Box>
  );

  const renderListItem = (item: Meetup, onPress: () => void) => (
    <ThemedListItem
      title={item.id}
      onPress={onPress}
      rightContent={<ThemedIcon name="chevron-right" type="entypo" />}
    />
  );

  const meetupData: SectionListData<Meetup>[] = [
    {
      title: "Pending Meetups",
      data: pendingMeetups,
      renderItem: ({ item }) =>
        renderListItem(item, () =>
          navigation.navigate("MeetupResponse", {
            meetupID: item.id,
            duration: item.duration,
            location: item.location,
            userList: item.user_list,
            timestamp: item.timestamp,
          })
        ),
    },
    {
      title: "Upcoming Meetups",
      data: upcomingMeetups,
      renderItem: ({ item }) =>
        renderListItem(item, () =>
          navigation.navigate("MeetupDetails", {
            meetupID: item.id,
            duration: item.duration,
            location: item.location,
            userList: item.user_list,
            timestamp: item.timestamp,
          })
        ),
    },
    {
      title: "Unrated Meetups",
      data: unratedMeetups,
      renderItem: ({ item }) =>
        renderListItem(item, () =>
          navigation.navigate("MeetupRating", { meetupID: item.id })
        ),
    },
  ];

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <SectionList
        style={styles.list}
        sections={meetupData}
        keyExtractor={(item, index) => item.id + index}
        renderItem={(info) =>
          info.section.renderItem ? info.section.renderItem(info) : null
        }
        renderSectionHeader={({ section: { title } }) =>
          renderSectionHeader(title)
        }
      />
    </Box>
  );
}
