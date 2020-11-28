import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { StyleSheet, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Picker } from '@react-native-community/picker';

import { reportBug, useAccountState } from '../../contexts/accountContext';
import { useToken } from '../../contexts/tokenContext';
import { SettingsRoutes, StackNavigationProps } from '../../routes';
import theme from '../../theme';
import { ThemedInput } from '../themed';
import Box from '../themed/Box';
import Text from '../themed/Text';
import ThemedButton from '../themed/ThemedButton';

export const UserBugReportPageOptions = {
  title: "Bug Report",
  headerTransparent: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
  inputLabelBox: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FAD092",
    padding: 5,
    width: "95%",
    marginBottom: 10,
  },
  inputLabel: {
    color: "#3D2400",
    fontWeight: "bold",
    fontSize: 16,
  },
  textInputBound: {
    width: "95%",
    height: "45%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingBottom: 10,
  },
  buttonsBox: {
    borderColor: "#3D2400",
    borderTopWidth: 2,
    backgroundColor: "#D8AD6D",
    width: "100%",
    height: "15%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textInput: {
    width: "95%",
    height: "100%",
    borderColor: "#3D2400",
    borderWidth: 1,
    padding: 10,
  },
  subtitle: {
    fontWeight: "bold",
    color: "#3D2400",
    padding: 10,
    alignSelf: "center",
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
  };

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
    </Box>
  );
}
