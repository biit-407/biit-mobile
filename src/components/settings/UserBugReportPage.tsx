import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-community/picker";

import { reportBug, useAccountState } from "../../contexts/accountContext";
import { useSnackbarDispatch } from "../../contexts/snackbarContext";
import { useToken } from "../../contexts/tokenContext";
import { SettingsRoutes, StackNavigationProps } from "../../routes";
import theme from "../../theme";
import { ThemedInput } from "../themed";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedButton from "../themed/ThemedButton";
import NotificationCenter from "../userUtils/NotificationCenter";
import { useNotificationCenter } from "../../contexts/notificationCenterContext";

export const UserBugReportPageOptions = {
  title: "Bug Report",
  headerTransparent: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
});

type BugFormValues = {
  location: string;
  description: string;
};

export default function UserBugReportPage({
  navigation,
}: StackNavigationProps<SettingsRoutes, "UserBugReport">) {
  const [bugLocation, setBugLocation] = useState("Home Page");
  const [bugText, setBugText] = useState("");

  const [tokenState, tokenDispatch] = useToken();
  const snackbarDispatch = useSnackbarDispatch();
  const {
    account: { email },
  } = useAccountState();

  const submitBugReport: SubmitHandler<BugFormValues> = async (
    formData: BugFormValues
  ) => {
    await reportBug(
      tokenDispatch,
      tokenState.refreshToken,
      email,
      formData.location,
      formData.description
    );
    snackbarDispatch({
      type: "push",
      state: {
        snackbarVisible: true,
        snackbarMessage: "Successfully Submitted  Bug Report",
        queue: [],
        snackbarType: "success",
      },
      dispatch: snackbarDispatch,
    });
    navigation.goBack();
  };
  const [notificationCenterState, ] = useNotificationCenter();

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <ScrollView style={{ flexGrow: 1 }}>
        <Text variant="subheader" textAlign="center" mt="md">
          Found a bug? Let us know about it!
        </Text>
        <Box m="sm">
          <Text variant="body" textAlign="center">
            Where is the bug located?
          </Text>
          <Picker
            selectedValue={bugLocation}
            style={{ height: 50, width: 300, alignSelf: "center" }}
            onValueChange={(itemValue, _itemIndex) => {
              setBugLocation(itemValue.toString());
            }}
          >
            <Picker.Item label="Login Page" value="login" />
            <Picker.Item label="Create Account Page" value="createAccount" />
            <Picker.Item label="Create Profile Page" value="createProfile" />
            <Picker.Item label="View Profile Page" value="viewProfile" />
            <Picker.Item label="Edit Profile Page" value="editProfile" />
            <Picker.Item label="Banned Users Page" value="bannedUsers" />
            <Picker.Item
              label="Create Community Page"
              value="createCommunity"
            />
            <Picker.Item label="Join Community" value="joinCommunity" />
            <Picker.Item label="Leave Community" value="leaveCommunity" />
            <Picker.Item label="Member List Page" value="memberList" />
            <Picker.Item label="Code of Conduct Page" value="codeOfConduct" />
            <Picker.Item
              label="Community Administration Page"
              value="communityAdministration"
            />
            <Picker.Item label="Settings Page" value="userSettings" />
            <Picker.Item label="Meetup List" value="meetupList" />
            <Picker.Item label="Meetup Details Page" value="meetupDetails" />
            <Picker.Item label="Meetup Response Page" value="meetupResponse" />
            <Picker.Item label="Rating Meetups" value="meetupRating" />
            <Picker.Item label="Location Ranking Page" value="locationRanker" />
            <Picker.Item
              label="Previous Meetups Page"
              value="previousMeetups"
            />
            <Picker.Item label="Time Preference" value="userTimePreference" />
            <Picker.Item label="Home Page" value="home" />
            <Picker.Item label="Community Home Page" value="communityHome" />
            <Picker.Item label="Feedback Page" value="feedback" />
            <Picker.Item label="Bug Report Page" value="bugReport" />
          </Picker>
        </Box>
        <Text variant="body" textAlign="center">
          Please briefly describe the issue:
        </Text>
        <Box m="md">
          <ThemedInput
            multiline
            onChangeText={(text) => setBugText(text)}
            placeholder="Describe the issue..."
            placeholderTextColor={theme.colors.primaryText}
            value={bugText}
          />
        </Box>
      </ScrollView>

      <ThemedButton
        title="Submit Report"
        onPress={() => {
          const bugReport: BugFormValues = {
            location: bugLocation,
            description: bugText,
          };
          submitBugReport(bugReport);
        }}
      />
      <NotificationCenter
        isVisible={notificationCenterState.visible}
      />
    </Box>
  );
}
