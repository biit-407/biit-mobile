import React from "react";
import { Alert, Button, StyleSheet } from "react-native";

import {
  HomePageRouteProp,
  HomePageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedButton from "../themed/ThemedButton";

type HomePageProps = {
  route: HomePageRouteProp;
  navigation: HomePageNavigationProp;
};

export const HomePageOptions = {
  title: "Home",
  headerTransparent: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  titleBox: {
      alignItems: "center",
      padding: 20,
  },
  titleLabel: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#3D2400",
  },
  nextMeetingBox: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
  },
  avatarBox: {
      width: "100%",
      height: "50%",
      alignItems: "center",
      justifyContent: "center",
  },
  meetingInfoSpacingBox: {
      height: "50%",
      paddingTop: 35,
  },
  meetingInfoBox: {
      borderTopWidth: 2,
      borderBottomWidth: 2,
      width: "80%",
      borderColor: "#3D2400",
      flexDirection: "row",
      justifyContent: "space-between",
  },
  meetingInfoTitleSubBox: {
      alignItems: "flex-start",
      justifyContent: "center",
      flexDirection: "column",
      width: "30%",
  },
  meetingInfoContentSubBox: {
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "column",
    width: "70%",
  },
  meetingInfoTitleLabel: {
      padding: 5,
      color: "#3D2400",
      fontWeight: "bold",
  },
  meetingInfoContentLabel: {
    padding: 5,
    color: "#3D2400",
  },
  buttonsBox: {
      width: "80%",
      height: "20%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
  },
});

export default function HomePage({
    route,
    navigation,
}: HomePageProps) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Box style={{justifyContent: "center", alignItems: "center", margin: 5,}}>
          <Button
            title="devlinks"
            onPress={() => navigation.push("DevelopmentLinks")}
            color="#73572C"
          />
        </Box>
      ),
    });
  });

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box style={styles.titleBox}>
        <Text style={styles.titleLabel}>Next Meeting</Text>
      </Box>
      <Box style={styles.nextMeetingBox}>
        <Box style={styles.avatarBox}>
            <Box style={{width: 192, height: 192, borderWidth: 1, borderColor: "black", backgroundColor: "tan", justifyContent: "center", alignItems: "center",}}>
                <Text>placeholder</Text>
            </Box>
        </Box>
        <Box style={styles.meetingInfoSpacingBox}>
            <Box style={styles.meetingInfoBox}>
                <Box style={styles.meetingInfoTitleSubBox}>
                    <Text style={styles.meetingInfoTitleLabel}>Name:</Text>
                    <Text style={styles.meetingInfoTitleLabel}>Location:</Text>
                    <Text style={styles.meetingInfoTitleLabel}>Time:</Text>
                </Box>
                <Box style={styles.meetingInfoContentSubBox}>
                    <Text style={styles.meetingInfoContentLabel}>Steve Sample</Text>
                    <Text style={styles.meetingInfoContentLabel}>Earhart Dining Court</Text>
                    <Text style={styles.meetingInfoContentLabel}>7:30pm</Text>
                </Box>
            </Box>
        </Box>
      </Box>
      <Box style={styles.buttonsBox}>
          <ThemedButton
          title="Match History"
          onPress={() => {
              Alert.alert('not yet implemented');
              navigation.push("DevelopmentLinks");
          }}/>
          <Button
          title="Meeting Details"
          onPress={() => {
              Alert.alert('not yet implemented');
              navigation.push("DevelopmentLinks");
          }}
          color="blue"
          />
      </Box>
    </Box>
  );
}
