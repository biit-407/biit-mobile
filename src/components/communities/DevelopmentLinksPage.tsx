import React from "react";
import { Button, StyleSheet } from "react-native";

import { BLANK_MEETUP } from "../../models/meetups";
import {
  DevelopmentLinksPageRouteProp,
  DevelopmentLinksPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";

type DevelopmentLinksPageProps = {
  route: DevelopmentLinksPageRouteProp;
  navigation: DevelopmentLinksPageNavigationProp;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  topbarright: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  btnbox: {
    margin: 5,
  },
});

export default function DevelopmentLinksPage({
  navigation,
}: DevelopmentLinksPageProps) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Box style={styles.topbarright}>
          <Button
            title="Settings"
            onPress={() => navigation.push("UserSettings")}
            color="#73572C"
          />
        </Box>
      ),
    });
  });

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Text>Hello World! Development Links page here.</Text>
      <Box style={styles.btnbox}>
        <Button
          title="Join Community"
          onPress={() =>
            navigation.push("JoinCommunity", {
              name: "biit",
            })
          }
        />
      </Box>
      <Box style={styles.btnbox}>
        <Button
          title="Leave Community"
          onPress={() =>
            navigation.push("LeaveCommunity", {
              name: "biit",
            })
          }
        />
      </Box>
      <Box style={styles.btnbox}>
        <Button
          title="Member List"
          onPress={() =>
            navigation.push("MemberList", {
              name: "Johnsons",
            })
          }
        />
      </Box>
      <Box style={styles.btnbox}>
        <Button
          title="Create Community"
          onPress={() => navigation.push("CreateCommunity")}
        />
      </Box>
      <Box style={styles.btnbox}>
        <Button
          title="Community Administration"
          onPress={() =>
            navigation.push("CommunityAdministration", {
              name: "Johnsons",
            })
          }
        />
      </Box>
      <Box style={styles.btnbox}>
        <Button
          title="Banned Users"
          onPress={() => navigation.push("BannedUsers", { name: "Johnsons" })}
        />
      </Box>
      <Box style={styles.btnbox}>
        <Button
          title="User Settings"
          onPress={() => navigation.push("UserSettings")}
        />
      </Box>
      <Box style={styles.btnbox}>
        <Button
          title="View Profile"
          onPress={() => navigation.push("ViewProfile")}
        />
      </Box>
      <Box style={styles.btnbox}>
        <Button
          title="Meetup List"
          onPress={() => navigation.push("MeetupList")}
        />
      </Box>
      <Box style={styles.btnbox}>
        <Button
          title="Past Meetups"
          onPress={() =>
            navigation.push("PreviousMeetups", {
              pastMeetups: [BLANK_MEETUP],
            })
          }
        />
      </Box>
      <Box>
        <Button
          title="Feedback Page"
          onPress={() => navigation.push("Feedback")}
        />
      </Box>
      <Box style={styles.btnbox}>
        <Button
          title="Bug Report Page"
          onPress={() => navigation.push("BugReport")}
        />
      </Box>
    </Box>
  );
}
