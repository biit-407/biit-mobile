import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Switch } from "react-native-gesture-handler";

import {
  UserSettingsPageRouteProp,
  UserSettingsPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import ThemedButton from "../themed/ThemedButton";
import Text from "../themed/Text";
import DeleteAccountButton from "../authentication/DeleteAccountButton";

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
  // header: {
  //   width: "100%",
  //   paddingLeft: 5,
  // },
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
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});

export default function UserSettingsPage({
  navigation,
}: UserSettingsPageProps) {
  const [sw1, setSw1] = useState(false);
  const toggleSw1 = () => setSw1((previousState) => !previousState);
  const [sw2, setSw2] = useState(false);
  const toggleSw2 = () => setSw2((previousState) => !previousState);
  const [sw3, setSw3] = useState(false);
  const toggleSw3 = () => setSw3((previousState) => !previousState);
  const [sw4, setSw4] = useState(false);
  const toggleSw4 = () => setSw4((previousState) => !previousState);

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <ScrollView style={styles.scrollview}>
        <Box style={styles.itemframe}>
          <Box style={styles.item}>
            <Box style={styles.txt}>
              <Text>Edit profile</Text>
            </Box>
            <Box style={styles.btn}>
              <ThemedButton
                title="Edit Profile"
                onPress={() => navigation.push("EditProfile")}
              />
            </Box>
          </Box>
        </Box>
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
              <Text>Setting 2</Text>
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
              <Text>Setting 3</Text>
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
              <Text>Setting 4</Text>
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
              <Text>Delete Account</Text>
            </Box>
            <Box style={styles.btn}>
              <DeleteAccountButton />
            </Box>
          </Box>
        </Box>
        <ThemedButton
          title="Save"
          onPress={() => navigation.push("DevelopmentLinks")}
        />
      </ScrollView>
    </Box>
  );
}
