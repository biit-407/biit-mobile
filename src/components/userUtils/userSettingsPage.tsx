import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import {Picker} from '@react-native-community/picker';

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
  switch: {
    width: "40%",
    justifyContent: "center",
    alignItems: "flex-end",
    margin: 10,
  },
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

  // Toggle Search for Meetups
  const [searchForMeetups, setSearchForMeetups] = useState(false);
  const toggleSearchForMeetups = () => setSearchForMeetups((previousState) => !previousState);

  //  Preferences state
  const [MeetupPref, setMeetupPref] = useState('Virtual');
  const [COVIDPref, setCOVIDPref] = useState('None');

  // Add scroll control due to slider constraints
  const [scrollable, setScrollable] = useState(true);

  // Check whether the user has an age preference
  const hasAgePreference =
    accountState.account.agePref && accountState.account.agePref?.length > 0;

  // Store info about the user's age preference (toggle and range)
  const [showAgePreference, setShowAgePreference] = useState(hasAgePreference);
  const [ageRange, setAgeRange] = useState(
    accountState.account.agePref && hasAgePreference
      ? accountState.account.agePref
      : [18, 100]
  );

  // Generic method to set the age preference on the backend
  const setAgePreference = (preference: number[]) => {
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

  // Method to handle toggling on and off age preference
  const onToggleAgePreference = (value: boolean) => {
    // Toggle the switch state
    setShowAgePreference(value);
    if (value === false) {
      // If toggled false, clear the user's age preference
      setAgePreference([]);
    } else if (value === true) {
      // If toggled true, set the default age range and update the preference on the backend
      setAgeRange([18, 100]);
      setAgePreference([18, 100]);
    }
  };

  // Method to handle updates from the range slider
  const onSelectRangeValues = (values: number[]) => {
    // Enable scrolling
    setScrollable(true);
    // Set the age range state and update the backend
    setAgeRange(values);
    setAgePreference(values);
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
          <Box style={styles.item}>
            <Box style={styles.txt}>
              <Text>Profile visible to others</Text>
            </Box>
            <Box style={styles.txt}>
              <ThemedSwitch onValueChange={toggleSw2} value={sw2} />
            </Box>
          </Box>
          <Box style={styles.item}>
            <Box style={styles.txt}>
              <Text>Hide community membership</Text>
            </Box>
            <Box style={styles.txt}>
              <ThemedSwitch onValueChange={toggleSw3} value={sw3} />
            </Box>
          </Box>
          <Box style={styles.item}>
            <Box style={styles.txt}>
              <Text>Hide LinkedIn</Text>
            </Box>
            <Box style={styles.txt}>
              <ThemedSwitch onValueChange={toggleSw4} value={sw4} />
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
                <Text marginEnd="md">18</Text>
                <ThemedMultiSlider
                  values={ageRange}
                  min={18}
                  max={100}
                  onValuesChangeStart={() => setScrollable(false)}
                  onValuesChangeFinish={onSelectRangeValues}
                  enableLabel={!scrollable}
                  snapped
                />
                <Text marginStart="md">100</Text>
              </Box>
            </Box>
          )}
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
                onValueChange={toggleSearchForMeetups}
                value={searchForMeetups} />
            </Box>
          </Box>
          {searchForMeetups && (
            <Box>
              <Box style={styles.item}>
                <Box style={styles.txt}>
                  <Text>Meetup Preferences</Text>
                </Box>
                <Box>
                  <Picker
                    selectedValue={MeetupPref}
                    style={{height: 50, width: 200}}
                    onValueChange={(itemValue, itemIndex) => {
                      setMeetupPref(itemValue.toString())
                    }}
                  >
                    <Picker.Item label="Virtual" value="virtual"/>
                    <Picker.Item label="In-Person" value="inPerson"/>
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
                    style={{height: 50, width: 200}}
                      onValueChange={(itemValue, itemIndex) => {
                        setCOVIDPref(itemValue.toString());
                      }}
                  >
                    <Picker.Item label="None" value="none"/>
                    <Picker.Item label="Mask" value="mask"/>
                    <Picker.Item label="Gloves" value="gloves"/>
                    <Picker.Item label="Social Distancing" value="socialDistancing"/>
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
