import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Switch } from "react-native-gesture-handler";

import {
  UserSettingsPageRouteProp,
  UserSettingsPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";
import DeleteAccountButton from "../authentication/DeleteAccountButton";
import LogoutButton from "../authentication/LogoutButton";
import ThemedMultiSlider from "../themed/ThemedMultiSlider";
import { updateAccount, useAccount } from "../../contexts/accountContext";
import { useToken } from "../../contexts/tokenContext";

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
    alignItems: "center",
    margin: 10,
  },
  ageRange: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function UserSettingsPage({}: UserSettingsPageProps) {
  const [sw1, setSw1] = useState(false);
  const toggleSw1 = () => setSw1((previousState) => !previousState);
  const [sw2, setSw2] = useState(false);
  const toggleSw2 = () => setSw2((previousState) => !previousState);
  const [sw3, setSw3] = useState(false);
  const toggleSw3 = () => setSw3((previousState) => !previousState);
  const [sw4, setSw4] = useState(false);
  const toggleSw4 = () => setSw4((previousState) => !previousState);

  // Add scroll control due to slider constraints
  const [scrollable, setScrollable] = useState(true);
  // TODO: Integrate to set these default values depending on whether is a prefrence or not

  const [accountState, accountDispatch] = useAccount();
  const [{ refreshToken }, tokenDispatch] = useToken();

  const [showAgePreference, setShowAgePreference] = useState(
    accountState.account.agePref ? true : false
  );
  const [ageRange, setAgeRange] = useState(
    accountState.account.agePref ?? [18, 100]
  );

  const setAgePreference = (preference: number[] | null) => {
    console.log({ ...accountState.account, agePref: preference });
    updateAccount(
      accountDispatch,
      tokenDispatch,
      refreshToken,
      accountState.account,
      { ...accountState.account, agePref: preference }
    );
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
              <Switch
                trackColor={{ false: "#FAD092", true: "#D8AD6D" }}
                thumbColor={sw1 ? "#B88953" : "#D8AD6D"}
                onValueChange={toggleSw1}
                value={sw1}
              />
            </Box>
          </Box>
          <Box style={styles.item}>
            <Box style={styles.txt}>
              <Text>Profile visible to others</Text>
            </Box>
            <Box style={styles.txt}>
              <Switch
                trackColor={{ false: "#FAD092", true: "#D8AD6D" }}
                thumbColor={sw2 ? "#B88953" : "#D8AD6D"}
                onValueChange={toggleSw2}
                value={sw2}
              />
            </Box>
          </Box>
          <Box style={styles.item}>
            <Box style={styles.txt}>
              <Text>Hide community membership</Text>
            </Box>
            <Box style={styles.txt}>
              <Switch
                trackColor={{ false: "#FAD092", true: "#D8AD6D" }}
                thumbColor={sw3 ? "#B88953" : "#D8AD6D"}
                onValueChange={toggleSw3}
                value={sw3}
              />
            </Box>
          </Box>
          <Box style={styles.item}>
            <Box style={styles.txt}>
              <Text>Hide LinkedIn</Text>
            </Box>
            <Box style={styles.txt}>
              <Switch
                trackColor={{ false: "#FAD092", true: "#D8AD6D" }}
                thumbColor={sw4 ? "#B88953" : "#D8AD6D"}
                onValueChange={toggleSw4}
                value={sw4}
              />
            </Box>
          </Box>
        </Box>
        <Box style={styles.itemframe}>
          <Box style={styles.item}>
            <Box style={styles.txt}>
              <Text>Use age preference</Text>
            </Box>
            <Box style={styles.txt}>
              <Switch
                trackColor={{ false: "#FAD092", true: "#D8AD6D" }}
                thumbColor={showAgePreference ? "#B88953" : "#D8AD6D"}
                onValueChange={(value) => {
                  setShowAgePreference(value);
                  if (value === false) {
                    console.log("Need to remove age");
                    setAgePreference(null);
                  } else if (value === true) {
                    setAgeRange(accountState.account.agePref ?? [18, 100]);
                  }
                }}
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
                  enableLabel={!scrollable}
                  snapped
                  onValuesChangeStart={() => setScrollable(false)}
                  onValuesChangeFinish={(values) => {
                    setAgeRange(values);
                    setAgePreference(values);
                    setScrollable(true);
                  }}
                />
                <Text marginStart="md">100</Text>
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
