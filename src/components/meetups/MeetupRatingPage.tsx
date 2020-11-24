import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { AirbnbRating } from "react-native-elements";
import { useTheme } from "@shopify/restyle";

import { HomeRoutes, StackNavigationProps } from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedCard from "../themed/ThemedCard";
import ThemedButton from "../themed/ThemedButton";
import { Theme } from "../../theme";
import { useToken } from "../../contexts/tokenContext";
import { setMeetupRating, useMeetup } from "../../contexts/meetupContext";
import { useAccountState } from "../../contexts/accountContext";

import MeetupCard from "./MeetupCard";
import MeetupReportDialog from "./MeetupReportDialog";

export const MeetupRatingPageOptions = {
  title: "Meetup Rating",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function MeetupRatingPage({
  navigation,
  route,
}: StackNavigationProps<HomeRoutes, "MeetupRating">) {
  // Create state for the meetup to be loaded
  const { meetupID, timestamp, duration, location, userList } = route.params;

  // Retrieve account information
  const [tokenState, tokenDispatch] = useToken();
  const {
    account: { email },
  } = useAccountState();

  const [rating, setRating] = useState(3);
  const [meetupState, meetupDispatch] = useMeetup();

  const submitRating = async () => {
    await setMeetupRating(
      meetupDispatch,
      tokenDispatch,
      meetupState,
      tokenState.refreshToken,
      email,
      meetupID,
      rating
    );
    navigation.goBack();
  };

  const theme = useTheme<Theme>();
  const [showDialog, setShowDialog] = useState(false);
  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
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
    </Box>
  );
}
