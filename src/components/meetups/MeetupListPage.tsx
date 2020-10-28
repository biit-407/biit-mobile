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
  const [pendingMeetups, setPendingMeetups] = useState([
    "ABC",
    "DEF",
    "ABC",
    "DEF",
  ]);
  const [upcomingMeetups, setUpcomingMeetups] = useState([
    "GHI",
    "JKL",
    "GHI",
    "JKL",
  ]);
  const [unratedMeetups, setUnratedMeetups] = useState([
    "MNO",
    "PQR",
    "MNO",
    "PQR",
  ]);

  const sectionIcons: Record<string, string> = {
    "Pending Meetups": "clock",
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

  const renderListItem = (item: string, onPress: () => void) => (
    <ThemedListItem
      title={item}
      onPress={onPress}
      rightContent={<ThemedIcon name="chevron-right" type="entypo" />}
    />
  );

  const meetupData: SectionListData<string>[] = [
    {
      title: "Pending Meetups",
      data: pendingMeetups,
      renderItem: ({ item }) =>
        renderListItem(item, () =>
          navigation.navigate("MeetupResponse", { meetupID: item })
        ),
    },
    {
      title: "Upcoming Meetups",
      data: upcomingMeetups,
      renderItem: ({ item }) =>
        renderListItem(item, () =>
          navigation.navigate("MeetupDetails", { meetupID: item })
        ),
    },
    {
      title: "Unrated Meetups",
      data: unratedMeetups,
      renderItem: ({ item }) =>
        renderListItem(item, () =>
          navigation.navigate("MeetupRating", { meetupID: item })
        ),
    },
  ];

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <SectionList
        style={styles.list}
        sections={meetupData}
        keyExtractor={(item, index) => item + index}
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
