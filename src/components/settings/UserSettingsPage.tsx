import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";
import { Picker } from "@react-native-community/picker";

import { updateAccount, useAccount } from "../../contexts/accountContext";
import { useToken } from "../../contexts/tokenContext";
import { SettingsRoutes, StackNavigationProps } from "../../routes";
import DeleteAccountButton from "../authentication/DeleteAccountButton";
import LogoutButton from "../authentication/LogoutButton";
import { ThemedListItem, ThemedMultiSlider, ThemedSwitch } from "../themed";
import Box from "../themed/Box";
import Text from "../themed/Text";

export const UserSettingsPageOptions = {
  title: "Settings",
  headerTransparent: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollview: {
    borderTopWidth: 3,
    width: "100%",
  },
  itemframe: {
    flexDirection: "column",
    borderBottomWidth: 3,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  ageRange: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    height: 25,
    width: 150,
  },
});

export default function UserSettingsPage({
  navigation,
}: StackNavigationProps<SettingsRoutes, "UserSettings">) {
  // Get the user account and tokens
  const [accountState, accountDispatch] = useAccount();
  const [{ refreshToken }, tokenDispatch] = useToken();

  /*
   ========================
   Notification Preference
   ========================
  */

  // Create state for the user's notification preference
  const [allowNotifications, setNotifications] = useState(false);

  // Function to handle toggling on and off allowing groups
  const onToggleAllowNotifications = (value: boolean) => {
    // Update the switch's state
    setNotifications(value);
    // TODO: Add integration (confirm schema with backend)
  };

  /*
   ========================
   Group Preference
   ========================
  */

  // Create state for the user's group preference
  const [allowGroups, setAllowGroups] = useState(
    accountState.account.meetGroup === 1
  );

  // Function to handle toggling on and off allowing groups
  const onToggleAllowGroups = (value: boolean) => {
    // Update the switch's state
    setAllowGroups(value);
    // Update the backend state
    updateAccount(
      accountDispatch,
      tokenDispatch,
      refreshToken,
      accountState.account,
      {
        fname: accountState.account.fname,
        lname: accountState.account.lname,
        email: accountState.account.email,
        meetGroup: value ? 1 : 0,
      }
    );
  };

  /*
   =============================
   Search for Meetups Preference
   =============================
  */
  // Create state for the user's preferred meetup search
  const [searchForMeetups, setSearchForMeetups] = useState(
    accountState.account.optIn === 1
  );

  // Function to handle toggling on and off allowing meetup search
  const onToggleMeetupSearch = (value: boolean) => {
    // Update the app state
    setSearchForMeetups(value);
    // Update the backend state
    updateAccount(
      accountDispatch,
      tokenDispatch,
      refreshToken,
      accountState.account,
      {
        fname: accountState.account.fname,
        lname: accountState.account.lname,
        email: accountState.account.email,
        optIn: value ? 1 : 0,
      }
    );
  };

  /*
   ======================
   Meetup Type Preference
   ======================
  */
  // Create default Meetup Types
  const defaultMeetupTypes = [
    { label: "Virtual", value: "virtual" },
    { label: "In-Person", value: "inPerson" },
  ];

  // Create state for the user's preferred meetup type
  const [meetupType, setMeetupType] = useState(
    accountState.account.meetType ?? defaultMeetupTypes[0].value
  );

  // Function to handle selecting a new meetup type
  const onSelectMeetupType = (type: number | string) => {
    // Convert the meetup type to a string
    type = type.toString();
    // Update the app state
    setMeetupType(type);
    // Update the backend state
    updateAccount(
      accountDispatch,
      tokenDispatch,
      refreshToken,
      accountState.account,
      {
        fname: accountState.account.fname,
        lname: accountState.account.lname,
        email: accountState.account.email,
        meetType: type,
      }
    );
  };

  /*
   ========================
   Meetup Length Preference
   ========================
  */
  // Create a default meetup length array
  const defaultMeetupLengths = [30, 45, 60];

  // Create state for the user's preferred meetup length
  const [meetupLength, setMeetupLength] = useState(
    accountState.account.meetLength ?? defaultMeetupLengths[0]
  );

  // Function to handle selecting a new meetup length
  const onSelectMeetupLength = (value: number | string) => {
    // Value should always be a number, based on the possible options
    const length = value as number;
    // Update the app state
    setMeetupLength(length);
    // Update the backend state
    updateAccount(
      accountDispatch,
      tokenDispatch,
      refreshToken,
      accountState.account,
      {
        fname: accountState.account.fname,
        lname: accountState.account.lname,
        email: accountState.account.email,
        meetLength: length,
      }
    );
  };

  /*
   ===========================
   Covid Precaution Preference
   ===========================
  */
  // Create default Covid Precautions
  const defaultCovidPrecautions = [
    { label: "None", value: "none" },
    { label: "Mask", value: "mask" },
    { label: "Gloves", value: "gloves" },
    { label: "Social Distancing", value: "socialDistancing" },
  ];

  // Create state for the user's preferred meetup precaution
  const [covidPrecaution, setCovidPrecaution] = useState(
    accountState.account.covid ?? defaultCovidPrecautions[0].value
  );

  // Function to handle selecting a new meetup precaution
  const onSelectCovidPrecaution = (precaution: number | string) => {
    // Convert the meetup precaution to a string
    precaution = precaution.toString();
    // Update the app state
    setCovidPrecaution(precaution);
    // Update the backend state
    updateAccount(
      accountDispatch,
      tokenDispatch,
      refreshToken,
      accountState.account,
      {
        fname: accountState.account.fname,
        lname: accountState.account.lname,
        email: accountState.account.email,
        covid: precaution,
      }
    );
  };

  /*
   ========================
   Age Preference
   ========================
  */
  // Create a default age range
  const defaultAgeRange = [18, 100];

  // Check whether the user has an age preference
  const hasAgePreference =
    accountState.account.agePref && accountState.account.agePref?.length > 0;

  // Create state for the user's preferred use of age range
  const [showAgePreference, setShowAgePreference] = useState(hasAgePreference);

  // Create state for the user's preferred age range
  const [ageRange, setAgeRange] = useState(
    accountState.account.agePref && hasAgePreference
      ? accountState.account.agePref
      : defaultAgeRange
  );

  // Create state to control page scrolling behaviour
  const [scrollable, setScrollable] = useState(true);

  // Function to handle selecting a new meetup length
  const setAgePreference = (preference: number[]) => {
    // Update the backend state
    updateAccount(
      accountDispatch,
      tokenDispatch,
      refreshToken,
      accountState.account,
      {
        fname: accountState.account.fname,
        lname: accountState.account.lname,
        email: accountState.account.email,
        agePref: preference,
      }
    );
  };

  // Function to handle toggling on and off age preference
  const onToggleAgePreference = (value: boolean) => {
    // Update the switch's state
    setShowAgePreference(value);
    // Choose the ageRange based on the switch's state
    const selectedAgeRange = value ? defaultAgeRange : [];

    // Update the user's age preference
    setAgePreference(selectedAgeRange);
    // Reset the app state
    setAgeRange(defaultAgeRange);
  };

  // Function to handle a start drag on the slider
  const onDragAgeRange = () => {
    // Disable page scrolling
    setScrollable(false);
  };

  // Function to handle a stop drag on the slider
  const onSelectAgeRange = (selectedAgeRange: number[]) => {
    // Enable page scrolling
    setScrollable(true);
    // Update the app state
    setAgeRange(selectedAgeRange);
    // Update the user's age preference
    setAgePreference(selectedAgeRange);
  };

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <ScrollView style={styles.scrollview} scrollEnabled={scrollable}>
        <Box style={styles.itemframe}>
          <ThemedListItem
            iconName={allowNotifications ? "bell" : "bell-off"}
            iconType="feather"
            title="Allow Notifications"
            subtitle="Toggle receiving notifications"
            rightContent={
              <ThemedSwitch
                onValueChange={onToggleAllowNotifications}
                value={allowNotifications}
              />
            }
          />
          <ThemedListItem
            iconName="users"
            iconType="feather"
            title="Allow Groups"
            subtitle="Toggle allowing group meetups"
            rightContent={
              <ThemedSwitch
                onValueChange={onToggleAllowGroups}
                value={allowGroups}
              />
            }
          />
        </Box>
        <Box style={styles.itemframe}>
          <ThemedListItem
            iconName="briefcase"
            iconType="feather"
            title="Search for Meetups"
            subtitle="Toggle actively searching for meetups"
            rightContent={
              <ThemedSwitch
                onValueChange={onToggleMeetupSearch}
                value={searchForMeetups}
              />
            }
          />
          <Collapsible collapsed={!searchForMeetups}>
            <ThemedListItem
              title="Meetup Type"
              slim
              iconName="coffee"
              iconType="feather"
              rightContent={
                <Picker
                  selectedValue={meetupType}
                  style={styles.picker}
                  onValueChange={onSelectMeetupType}
                >
                  {defaultMeetupTypes.map((type, index) => (
                    <Picker.Item
                      key={index}
                      label={type.label}
                      value={type.value}
                    />
                  ))}
                </Picker>
              }
            />
            <ThemedListItem
              title="Meetup Length"
              slim
              iconName="clock"
              iconType="feather"
              rightContent={
                <Picker
                  selectedValue={meetupLength}
                  style={styles.picker}
                  onValueChange={onSelectMeetupLength}
                >
                  {defaultMeetupLengths.map((length, index) => (
                    <Picker.Item
                      key={index}
                      label={`${length} minutes`}
                      value={length}
                    />
                  ))}
                </Picker>
              }
            />
            <ThemedListItem
              title="COVID Precautions"
              slim
              iconName="shield"
              iconType="feather"
              rightContent={
                <Picker
                  selectedValue={covidPrecaution}
                  style={styles.picker}
                  onValueChange={onSelectCovidPrecaution}
                >
                  {defaultCovidPrecautions.map((precaution, index) => (
                    <Picker.Item
                      key={index}
                      label={precaution.label}
                      value={precaution.value}
                    />
                  ))}
                </Picker>
              }
            />
          </Collapsible>
          <ThemedListItem
            iconName="gift"
            iconType="feather"
            title="Age Preference"
            subtitle="Toggle and update your age preference"
            rightContent={
              <ThemedSwitch
                onValueChange={onToggleAgePreference}
                value={showAgePreference}
              />
            }
          />
          <Collapsible collapsed={!showAgePreference}>
            <Box mt="sm">
              <Box style={styles.item}>
                <Text>
                  Current Age Preference:
                  {` ${ageRange[0]} to ${ageRange[1]} years old`}
                </Text>
              </Box>
              <Box style={styles.ageRange}>
                <Text marginEnd="md">{defaultAgeRange[0]}</Text>
                <ThemedMultiSlider
                  values={ageRange}
                  min={defaultAgeRange[0]}
                  max={defaultAgeRange[1]}
                  onValuesChangeStart={onDragAgeRange}
                  onValuesChangeFinish={onSelectAgeRange}
                  enableLabel={!scrollable}
                  snapped
                />
                <Text marginStart="md">{defaultAgeRange[1]}</Text>
              </Box>
            </Box>
          </Collapsible>

          <ThemedListItem
            iconName="calendar"
            iconType="feather"
            title="Time Preference"
            subtitle="View and update your time preference"
            chevron
            onPress={() => navigation.push("UserTimePreference")}
          />
        </Box>
        <Box style={styles.itemframe}>
          <ThemedListItem
            title="Submit Bug Report"
            subtitle="Submit a bug report about biit"
            iconName="alert-triangle"
            iconType="feather"
            chevron
            onPress={() => navigation.push("UserBugReport")}
          />
          <ThemedListItem
            title="Submit Feedback"
            subtitle="Submit feedback for the developers of biit"
            iconName="message-square"
            iconType="feather"
            chevron
            onPress={() => navigation.push("UserFeedback")}
          />
        </Box>
        <Box style={styles.itemframe}>
          <LogoutButton />
          <DeleteAccountButton />
        </Box>
      </ScrollView>
    </Box>
  );
}
