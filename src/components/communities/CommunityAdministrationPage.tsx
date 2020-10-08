import React, { useState } from "react";
import { ScrollView, Switch, StyleSheet, Alert, Button } from "react-native";

import {
  CommunityAdministrationPageRouteProp,
  CommunityAdministrationPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import ThemedInput from "../themed/ThemedInput";
import Text from "../themed/Text";

type CommunityAdministrationPageProps = {
  route: CommunityAdministrationPageRouteProp;
  navigation: CommunityAdministrationPageNavigationProp;
};

export const CommunityAdministrationPageOptions = {
  title: "Community Administration",
  headerTransparent: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFE8C6",
  },
  header: {
    paddingLeft: 10,
    color: "#3d3400",
  },
  detailbox: {
    padding: 5,
  },
  option: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#D8AD6D",
    padding: "3.5%",
  },
  btnbox: {
    margin: 5,
    width: "30%",
  },
});

export default function CommunityAdministrationPage({
  navigation,
}: CommunityAdministrationPageProps) {
  const [sw1, setSw1] = useState(false);
  const toggleSw1 = () => setSw1((previousState) => !previousState);
  const [sw2, setSw2] = useState(false);
  const toggleSw2 = () => setSw2((previousState) => !previousState);
  const [sw3, setSw3] = useState(false);
  const toggleSw3 = () => setSw3((previousState) => !previousState);

  return (
    <ScrollView style={styles.root}>
      <Box backgroundColor="headerBackground">
        <Text variant="header" style={styles.header}>
          Title
        </Text>
      </Box>
      <Box style={styles.detailbox}>
        <ThemedInput
          placeholder="The Ooga Booga Club"
          label="Edit Community Name"
        />
      </Box>
      <Box backgroundColor="headerBackground">
        <Text variant="header" style={styles.header}>
          Description
        </Text>
      </Box>
      <Box style={styles.detailbox}>
        <ThemedInput
          placeholder="Ooga. Booga. Oogabooga!"
          label="Edit Community Description"
        />
      </Box>
      <Box backgroundColor="headerBackground">
        <Text variant="header" style={styles.header}>
          Code of Conduct
        </Text>
      </Box>
      <Box style={styles.detailbox}>
        <ThemedInput
          placeholder="Booga oog, o boo gaboo agoo."
          label="Edit Code of Conduct"
        />
      </Box>
      <Box backgroundColor="headerBackground">
        <Text variant="header" style={styles.header}>
          Options
        </Text>
      </Box>
      <Box style={styles.detailbox}>
        <Box style={styles.option}>
          <Text variant="body">Option 1</Text>
          <Switch
            trackColor={{ false: "#FAD092", true: "#D8AD6D" }}
            thumbColor={sw1 ? "#B88953" : "#D8AD6D"}
            onValueChange={toggleSw1}
            value={sw1}
          />
        </Box>
        <Box style={styles.option}>
          <Text variant="body">Option 2</Text>
          <Switch
            trackColor={{ false: "#FAD092", true: "#D8AD6D" }}
            thumbColor={sw2 ? "#B88953" : "#D8AD6D"}
            onValueChange={toggleSw2}
            value={sw2}
          />
        </Box>
        <Box style={styles.option}>
          <Text variant="body">Option 3</Text>
          <Switch
            trackColor={{ false: "#FAD092", true: "#D8AD6D" }}
            thumbColor={sw3 ? "#B88953" : "#D8AD6D"}
            onValueChange={toggleSw3}
            value={sw3}
          />
        </Box>
      </Box>
      <Box style={styles.btncontainer}>
        <Box style={styles.btnbox}>
          <Button
            title="Cancel"
            color="#b6420c"
            onPress={() => {
              Alert.alert(
                'Cancel Operation',
                'Are you sure you want to discard these changes?',
                [
                  {
                    text: "Yes",
                    onPress: () => {
                      navigation.goBack();
                    },
                  },
                  {
                    text: "No",
                    style: "cancel",
                  },
                ]
              );
            }}
          />
        </Box>
        <Box style={styles.btnbox}>
          <Button
            title="Submit"
            color="#B88953"
            onPress={() => navigation.push("DevelopmentLinks")}
          />
        </Box>
      </Box>
    </ScrollView>
  );
}
