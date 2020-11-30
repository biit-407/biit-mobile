import React, { useEffect, useState } from 'react';
import { SectionList, SectionListData, StyleSheet } from 'react-native';

import { useAccountState } from '../../contexts/accountContext';
import {
    getMeetupList, getPendingMeetupsList, getUnratedMeetupsList, getUpcomingMeetupsList, useMeetup
} from '../../contexts/meetupContext';
import { useToken } from '../../contexts/tokenContext';
import { Meetup } from '../../models/meetups';
import { HomeRoutes, StackNavigationProps } from '../../routes';
import { ThemedRefreshControl } from '../themed';
import Box from '../themed/Box';
import Text from '../themed/Text';
import ThemedIcon from '../themed/ThemedIcon';
import ThemedListItem from '../themed/ThemedListItem';

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

export default function MeetupListPage({
  navigation,
}: StackNavigationProps<HomeRoutes, "MeetupList">) {
  const [pendingMeetups, setPendingMeetups] = useState<Meetup[]>([]);
  const [upcomingMeetups, setUpcomingMeetups] = useState<Meetup[]>([]);
  const [unratedMeetups, setUnratedMeetups] = useState<Meetup[]>([]);
  const [isLoading, setLoading] = useState(false);

  // Retrieve account information
  const [tokenState, tokenDispatch] = useToken();
  const {
    account: { email },
  } = useAccountState();

  // get meetup context information
  const [, meetupDispatch] = useMeetup();

  // Create function to load and set all data
  const loadMeetupData = async () => {
    setLoading(true);
    // load all meetings because yay
    await getMeetupList(
      meetupDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      email
    ).then(async (meetups) => {
      // Load the required sections
      const pendingMeetupList = await getPendingMeetupsList(
        meetupDispatch,
        tokenDispatch,
        tokenState.refreshToken,
        email
      );
      const upcomingMeetupList = await getUpcomingMeetupsList(
        meetupDispatch,
        tokenDispatch,
        tokenState.refreshToken,
        email
      );
      const unratedMeetupList = await getUnratedMeetupsList(
        meetupDispatch,
        tokenDispatch,
        meetups,
        tokenState.refreshToken,
        email
      );
      // Set the sections once loaded
      setPendingMeetups(pendingMeetupList);
      setUpcomingMeetups(upcomingMeetupList);
      setUnratedMeetups(unratedMeetupList);
      setLoading(false);
    });
  };

  // Allows automatic loading on the page when navigating to the page from a nested or parent screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadMeetupData();
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]); // eslint-disable-line react-hooks/exhaustive-deps

  // Function to render each section's header
  const sectionIcons: Record<string, string> = {
    "Pending Meetups": "coffee",
    "Upcoming Meetups": "calendar",
    "Unrated Meetups": "star",
  };

  const renderSectionHeader = (title: string) => (
    <Box
      padding="md"
      backgroundColor="sectionListHeader"
      flexDirection="row"
      alignItems="center"
    >
      <ThemedIcon type="feather" name={sectionIcons[title]} />
      <Text paddingLeft="sm" variant="sectionListHeader">
        {title}
      </Text>
    </Box>
  );

  const formatDateStr = (date: Date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let minuteStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minuteStr} ${ampm} on ${month}/${day}/${year}`;
  };

  const renderListItem = (item: Meetup, onPress: () => void) => {
    const date = new Date(parseInt(item.timestamp, 10) * 1000);
    const title = `${item.community}: ${item.duration} minutes`;
    const subtitle = formatDateStr(date);
    return (
      <ThemedListItem
        title={title}
        subtitle={subtitle}
        onPress={onPress}
        chevron
      />
    );
  };

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
      emptyText: "No pending meetups",
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
      emptyText: "No upcoming meetups",
    },
    {
      title: "Unrated Meetups",
      data: unratedMeetups,
      renderItem: ({ item }) =>
        renderListItem(item, () =>
          navigation.navigate("MeetupRating", {
            meetupID: item.id,
            duration: item.duration,
            location: item.location,
            userList: item.user_list,
            timestamp: item.timestamp,
          })
        ),

      emptyText: "No unrated meetups",
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
        renderSectionFooter={({ section }) => {
          if (section.data.length === 0) {
            return (
              <Box backgroundColor="cardBackground" p="md">
                <Text textAlign="center" variant="subheader">{section.emptyText}</Text>
              </Box>
            );
          }
          return null;
        }}
        refreshControl={
          <ThemedRefreshControl
            onRefresh={loadMeetupData}
            refreshing={isLoading}
          />
        }
      />
    </Box>
  );
}
