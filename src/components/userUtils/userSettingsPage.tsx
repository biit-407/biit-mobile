import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { Picker } from "@react-native-community/picker";

import {
  UserSettingsPageRouteProp,
  UserSettingsPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";
import DeleteAccountButton from "../authentication/DeleteAccountButton";
import LogoutButton from "../authentication/LogoutButton";
import { ThemedMultiSlider, ThemedSwitch } from "../themed";
import { updateAccount, useAccount } from "../../contexts/accountContext";
import { useToken } from "../../contexts/tokenContext";
import theme from "../../theme";

type UserSettingsPageProps = {
  route: UserSettingsPageRouteProp;
  navigation: UserSettingsPageNavigationProp;
};

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
  btn: {
    width: "50%",
    margin: 10,
  },
  txt: {
    width: "40%",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: 10,
  },
  ageRange: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  // switch: {
  //   width: "40%",
  //   justifyContent: "center",
  //   alignItems: "flex-end",
  //   margin: 10,
  // },
});

export default function UserSettingsPage({
  navigation,
}: UserSettingsPageProps) {
  // Get the user account and tokens
  const [accountState, accountDispatch] = useAccount();
  const [{ refreshToken }, tokenDispatch] = useToken();

  // Dummy switch states
  const [sw1, setSw1] = useState(false);
  const toggleSw1 = () => setSw1((previousState) => !previousState);
  const [sw2, setSw2] = useState(false);
  const toggleSw2 = () => setSw2((previousState) => !previousState);
  const [sw3, setSw3] = useState(false);
  const toggleSw3 = () => setSw3((previousState) => !previousState);
  const [sw4, setSw4] = useState(false);
  const toggleSw4 = () => setSw4((previousState) => !previousState);

  // Check whether the user has meetups enabled
  const hasMeetupsEnabled =
    accountState.account.optIn === 1 ? accountState.account.optIn : 0;

  // Toggle Search for Meetups
  const [searchForMeetups, setSearchForMeetups] = useState(hasMeetupsEnabled);
  // const toggleSearchForMeetups = () => setSearchForMeetups((previousState) => ((previousState+1)%2))

  // Store info about user's meetup and COVID preferences
  const [meetupPref, setMeetupPref] = useState(
    accountState.account.meetType !== undefined
      ? accountState.account.meetType
      : "virtual"
  );
  const [COVIDPref, setCOVIDPref] = useState(
    accountState.account.covid !== undefined
      ? accountState.account.covid
      : "none"
  );

  // Generic method to update meetup prefs information on the backend
  const updateMeetupPrefs = async (
    optIn: number,
    meetupPreference: string,
    covidPreference: string
  ) => {
    await updateAccount(
      accountDispatch,
      tokenDispatch,
      refreshToken,
      accountState.account,
      {
        fname: accountState.account.fname,
        lname: accountState.account.lname,
        email: accountState.account.email,
        optIn: optIn,
        meetType: meetupPreference,
        covid: covidPreference,
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

  /*
   ========================
   Meetup Length Preference
   ========================
  */
  // Create a default meetup length array
  const defaultMeetupLengths = [30, 45, 60];

  // Create state for the user's preferred meetup length
  const [meetupLength, setMeetupLength] = useState(
    accountState.account.meetupLength ?? defaultMeetupLengths[0]
  );

  // Function to handle selecting a new meetup length
  const onSelectMeetingLength = (value: number | string) => {
    // Value should always be a number, based on the possible options
    const length = value as number;
    // Update the app state
    setMeetupLength(length);
    // Update the backend state
    // TODO: Add integration (confirm schema with backend)
  };

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <ScrollView style={styles.scrollview} scrollEnabled={scrollable}>
        <Box style={styles.itemframe}>
          <Box style={styles.item}>
            <Box style={styles.txt}>
              <Text>Notifications</Text>
            </Box>
            <Box style={styles.txt}>
              <ThemedSwitch onValueChange={toggleSw1} value={sw1} />
            </Box>
          </Box>
        </Box>
        <Box style={styles.itemframe}>
          <Box style={styles.item}>
            <Box style={styles.txt}>
              <Text>Use age preference</Text>
            </Box>
            <Box style={styles.txt}>
              <ThemedSwitch
                onValueChange={onToggleAgePreference}
                value={showAgePreference}
              />
            </Box>
          </Box>
          {showAgePreference && (
            <Box>
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
          )}
        </Box>
        <Box style={styles.itemframe}>
          <Box style={styles.item}>
            <Box style={styles.txt}>
              <Text>Meetup Length</Text>
            </Box>
            <Box>
              <Picker
                selectedValue={meetupLength}
                style={{ height: 50, width: 200 }}
                onValueChange={onSelectMeetingLength}
              >
                {defaultMeetupLengths.map((length, index) => (
                  <Picker.Item
                    key={index}
                    label={`${length} minutes`}
                    value={length}
                  />
                ))}
              </Picker>
            </Box>
          </Box>
        </Box>
        <Box style={styles.itemframe}>
          <Box style={styles.item}>
            <Box style={styles.txt}>
              <Text>Time Preferences</Text>
            </Box>
            <Box style={styles.btn}>
              <Button
                title={"Update Time Preferences"}
                onPress={() => {
                  navigation.push("UserTimePreference");
                }}
                buttonStyle={{
                  backgroundColor: theme.colors.buttonPrimaryBackground,
                }}
              />
            </Box>
          </Box>
          <Box style={styles.item}>
            <Box style={styles.txt}>
              <Text>Actively Search for meetups</Text>
            </Box>
            <Box style={styles.txt}>
              <ThemedSwitch
                onValueChange={() => {
                  console.log("before " + searchForMeetups);
                  // toggleSearchForMeetups();
                  const newState = (searchForMeetups + 1) % 2;
                  setSearchForMeetups(newState);
                  console.log("after " + newState);
                  updateMeetupPrefs(newState, meetupPref, COVIDPref);
                  // console.log("after after " + searchForMeetups);
                }}
                value={searchForMeetups === 1 ? true : false}
              />
            </Box>
          </Box>
          {searchForMeetups === 1 && (
            <Box>
              <Box style={styles.item}>
                <Box style={styles.txt}>
                  <Text>Meetup Preferences</Text>
                </Box>
                <Box>
                  <Picker
                    selectedValue={meetupPref}
                    style={{ height: 50, width: 200 }}
                    onValueChange={(itemValue, _itemIndex) => {
                      const newState = itemValue.toString();
                      setMeetupPref(newState);
                      updateMeetupPrefs(searchForMeetups, newState, COVIDPref);
                    }}
                  >
                    <Picker.Item label="Virtual" value="virtual" />
                    <Picker.Item label="In-Person" value="inPerson" />
                  </Picker>
                </Box>
              </Box>
              <Box style={styles.item}>
                <Box style={styles.txt}>
                  <Text>COVID Preferences</Text>
                </Box>
                <Box>
                  <Picker
                    selectedValue={COVIDPref}
                    style={{ height: 50, width: 200 }}
                    onValueChange={(itemValue, _itemIndex) => {
                      const newState = itemValue.toString();
                      setCOVIDPref(newState);
                      updateMeetupPrefs(searchForMeetups, meetupPref, newState);
                    }}
                  >
                    <Picker.Item label="None" value="none" />
                    <Picker.Item label="Mask" value="mask" />
                    <Picker.Item label="Gloves" value="gloves" />
                    <Picker.Item
                      label="Social Distancing"
                      value="socialDistancing"
                    />
                  </Picker>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        <Box style={styles.itemframe}>
          <Box style={styles.item}>
            <Box style={styles.txt}>
              <Text>Logout</Text>
            </Box>
            <Box style={styles.btn}>
              <LogoutButton />
            </Box>
          </Box>
          <Box style={styles.item}>
            <Box style={styles.txt}>
              <Text>Delete Account</Text>
            </Box>
            <Box style={styles.btn}>
              <DeleteAccountButton />
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}
