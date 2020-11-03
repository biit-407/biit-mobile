import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useAccountState } from "../../contexts/accountContext";
import {
  getMeetupDetails,
  acceptMeetup,
  declineMeetup,
} from "../../contexts/meetupContext";
import { useTokenState } from "../../contexts/tokenContext";
import { useConstructor } from "../../hooks";
import { BLANK_MEETUP, Meetup } from "../../models/meetups";
import {
  MeetupResponsePageRouteProp,
  MeetupResponsePageNavigationProp,
} from "../../routes";
import theme from "../../theme";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedCard from "../themed/ThemedCard";
import ThemedIcon from "../themed/ThemedIcon";

import MeetupCard from "./MeetupCard";

type MeetupResponsePageProps = {
  route: MeetupResponsePageRouteProp;
  navigation: MeetupResponsePageNavigationProp;
};

export const MeetupResponsePageOptions: StackNavigationOptions = {
  title: "",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default function MeetupReponsePage({
  navigation,
  route,
}: MeetupResponsePageProps) {
  // Create state for the meetup to be loaded
  const { meetupID } = route.params;
  const [meetup, setMeetup] = useState<Meetup>(BLANK_MEETUP);

  // Retrieve account information
  const { refreshToken } = useTokenState();
  const {
    account: { email },
  } = useAccountState();

  // Load the meetup details
  useConstructor(async () => {
    const [meetupDetails] = await getMeetupDetails(refreshToken, meetupID);
    setMeetup(meetupDetails);
  });

  // TODO: Timestamp currently is just an integer, need to convert it to a time
  const { id, timestamp, duration, location, user_list } = meetup; // eslint-disable-line camelcase
  // Convert users dict to a list of accepted users
  const acceptedUsers = [];
  for (const [key, value] of Object.entries(user_list)) {
    if (value === 1) {
      acceptedUsers.push(key);
    }
  }

  const onAccept = async () => {
    console.log(await acceptMeetup(refreshToken, email, meetupID));
    navigation.pop();
  };
  const onDecline = async () => {
    console.log(await declineMeetup(refreshToken, email, meetupID));

    navigation.pop();
  };

  const renderLocations = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => <Text variant="body">{`${index + 1}. ${item}`}</Text>;
  const [locations, setLocations] = useState(["Online", "Test", "Another"]);

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box flex={3} width="95%">
        <MeetupCard
          id={id}
          duration={duration}
          timestamp={timestamp}
          userList={acceptedUsers}
          location={location}
        />

        <ThemedCard>
          <Text variant="header">Top Ranked Locations</Text>
          <FlatList
            data={locations.slice(0, Math.min(3, locations.length))}
            keyExtractor={(item, index) => item + index.toString()}
            renderItem={renderLocations}
          />
          <Box marginTop="sm">
            <TouchableOpacity
              onPress={() =>
                navigation.push("LocationRanker", { locations, setLocations })
              }
            >
              <Text variant="link">Rank Locations</Text>
            </TouchableOpacity>
          </Box>
        </ThemedCard>
      </Box>

      <Box
        flex={1}
        flexDirection="row"
        justifyContent="space-around"
        width="95%"
      >
        <Box alignItems="center">
          <ThemedIcon
            size={32}
            raised
            reverse
            name="cross"
            type="entypo"
            onPress={onDecline}
            color={theme.colors.iconSelectedRed}
          />
          <Text variant="body">Decline</Text>
        </Box>

        <Box alignItems="center">
          <ThemedIcon
            size={32}
            raised
            reverse
            name="check"
            type="entypo"
            onPress={onAccept}
            color={theme.colors.iconSelectedGreen}
          />
          <Text variant="body">Accept</Text>
        </Box>
      </Box>
    </Box>
  );
}
