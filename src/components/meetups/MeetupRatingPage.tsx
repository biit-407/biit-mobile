import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { AirbnbRating } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "@shopify/restyle";

import { useAccountState } from "../../contexts/accountContext";
import { setMeetupRating, useMeetup } from "../../contexts/meetupContext";
import { useSnackbarDispatch } from "../../contexts/snackbarContext";
import { useToken } from "../../contexts/tokenContext";
import { BLANK_MEETUP } from "../../models/meetups";
import { HomeRoutes, StackNavigationProps } from "../../routes";
import { Theme } from "../../theme";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedButton from "../themed/ThemedButton";
import ThemedCard from "../themed/ThemedCard";

import MeetupCard from "./MeetupCard";
import MeetupReportDialog from "./MeetupReportDialog";

export const MeetupRatingPageOptions = {
  title: "Meetup Rating",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
});

export default function MeetupRatingPage({
  navigation,
  route,
}: StackNavigationProps<HomeRoutes, "MeetupRating">) {
  // Create state for the meetup to be loaded
  const { meetupID, timestamp, duration, location, userList, community } = route.params;

  // Retrieve account information
  const [tokenState, tokenDispatch] = useToken();
  const {
    account: { email },
  } = useAccountState();

  const [rating, setRating] = useState(3);
  const [meetupState, meetupDispatch] = useMeetup();
  const snackbarDispatch = useSnackbarDispatch();

  const submitRating = async () => {
    const response = await setMeetupRating(
      meetupDispatch,
      tokenDispatch,
      meetupState,
      tokenState.refreshToken,
      email,
      meetupID,
      rating,
      community
    );
    if (response === BLANK_MEETUP) {
      snackbarDispatch({
        type: "push",
        state: {
          snackbarMessage: "Failed to rate meetup",
          snackbarType: "error",
          snackbarVisible: true,
          queue: [],
        },
        dispatch: snackbarDispatch,
      });
    } else {
      snackbarDispatch({
        type: "push",
        state: {
          snackbarMessage: "Successfully rated meetup",
          snackbarType: "success",
          snackbarVisible: true,
          queue: [],
        },
        dispatch: snackbarDispatch,
      });
      navigation.goBack();
    }
  };

  const theme = useTheme<Theme>();
  const [showDialog, setShowDialog] = useState(false);
  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <ScrollView>
        <Box style={{ width: "100%" }}>
          <MeetupCard
            id={meetupID}
            timestamp={timestamp}
            duration={duration}
            location={location}
            userList={userList}
          />
          <ThemedCard>
            <Box style={{ width: "100%", alignItems: "center" }}>
              <Text variant="body">How would you rate your experience?</Text>
              <AirbnbRating /* @ts-ignore:disable-next-line */
                reviewColor={theme.colors.iconPrimary}
                defaultRating={rating}
                selectedColor={theme.colors.iconPrimary}
                onFinishRating={setRating}
              />
              <Box mt="md">
                <ThemedButton title="Submit Rating" onPress={submitRating} />
              </Box>
            </Box>
          </ThemedCard>
          <ThemedCard>
            <Box alignItems="center" width="100%">
              <Text variant="subheader" mb="md">
                Meetup didn't go as planned?
              </Text>
              <ThemedButton
                title="Report Meetup"
                onPress={() => setShowDialog(true)}
              />
            </Box>
          </ThemedCard>
        </Box>
        <MeetupReportDialog
          open={showDialog}
          meetupID={meetupID}
          closeDialog={() => setShowDialog(false)}
        />
      </ScrollView>
    </Box>
  );
}
