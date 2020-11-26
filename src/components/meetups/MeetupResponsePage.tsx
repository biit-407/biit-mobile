import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useAccountState } from "../../contexts/accountContext";
import {
  acceptMeetup,
  declineMeetup,
  setMeetupLocations,
  useMeetup,
} from "../../contexts/meetupContext";
import { useSnackbarDispatch } from "../../contexts/snackbarContext";
import { useToken } from "../../contexts/tokenContext";
import { BLANK_MEETUP } from "../../models/meetups";
import { HomeRoutes, StackNavigationProps } from "../../routes";
import theme from "../../theme";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedCard from "../themed/ThemedCard";
import ThemedIcon from "../themed/ThemedIcon";

import MeetupCard from "./MeetupCard";

export const MeetupResponsePageOptions: StackNavigationOptions = {
  title: "RSVP",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function MeetupReponsePage({
  route,
  navigation,
}: StackNavigationProps<HomeRoutes, "MeetupResponse">) {
  const { meetupID, timestamp, location, duration, userList } = route.params;
  const [tokenState, tokenDispatch] = useToken();
  const {
    account: { email },
  } = useAccountState();

  const [, meetupDispatch] = useMeetup();
  const [locations, setLocations] = useState(["Online", "WALC", "LWSN"]);
  const snackbarDispatch = useSnackbarDispatch();

  const onAccept = async () => {
    await setMeetupLocations(
      meetupDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      email,
      meetupID,
      locations
    );
    const response = await acceptMeetup(
      meetupDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      email,
      meetupID
    );

    if (response === BLANK_MEETUP) {
      // Failure
      snackbarDispatch({
        type: "push",
        state: {
          snackbarMessage: "Failed to accept meetup",
          snackbarVisible: true,
          snackbarType: "error",
          queue: [],
        },
        dispatch: snackbarDispatch,
      });
    } else {
      snackbarDispatch({
        type: "push",
        state: {
          snackbarMessage: "Successfully accepted meetup",
          snackbarVisible: true,
          snackbarType: "success",
          queue: [],
        },
        dispatch: snackbarDispatch,
      });
      navigation.pop();
    }
  };
  const onDecline = async () => {
    const response = await declineMeetup(
      meetupDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      email,
      meetupID
    );

    if (response === BLANK_MEETUP) {
      // Failure
      snackbarDispatch({
        type: "push",
        state: {
          snackbarMessage: "Failed to decline meetup",
          snackbarVisible: true,
          snackbarType: "error",
          queue: [],
        },
        dispatch: snackbarDispatch,
      });
    } else {
      snackbarDispatch({
        type: "push",
        state: {
          snackbarMessage: "Successfully declined meetup",
          snackbarVisible: true,
          snackbarType: "success",
          queue: [],
        },
        dispatch: snackbarDispatch,
      });
      navigation.pop();
    }
  };

  const theRealSetLocations = (l: string[]): void => {
    setMeetupLocations(
      meetupDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      email,
      meetupID,
      l
    );
    setLocations(l);
    return;
  };

  const renderLocations = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => <Text variant="body">{`${index + 1}. ${item}`}</Text>;

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box flex={3} width="95%">
        <MeetupCard
          id={meetupID}
          timestamp={timestamp}
          location={location}
          duration={duration}
          userList={userList}
          meetupType={"tentative"}
          isClickable={false}
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
                navigation.push("LocationRanker", {
                  locations,
                  setLocations: theRealSetLocations,
                })
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
