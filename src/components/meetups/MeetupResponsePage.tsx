import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

import {
  MeetupResponsePageRouteProp,
  MeetupResponsePageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedButton from "../themed/ThemedButton";
import ThemedCard from "../themed/ThemedCard";
import ThemedIcon from "../themed/ThemedIcon";
import ThemedListItem from "../themed/ThemedListItem";

type MeetupResponsePageProps = {
  route: MeetupResponsePageRouteProp;
  navigation: MeetupResponsePageNavigationProp;
};

export const MeetupResponsePageOptions: StackNavigationOptions = {
  title: "",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default function MeetupReponsePage({
  navigation,
}: MeetupResponsePageProps) {
  const onAccept = () => {
    navigation.pop();
  };
  const onDecline = () => {
    navigation.pop();
  };
  const renderParticipant = ({ item }: { item: string }) => (
    <Text variant="body">{item}</Text>
  );
  const meetupTime = "3:00 PM";
  const meetupLocation = "Online";
  const meetupParticipants = ["John Smith", "Bob Smith", "Alice Smith"];

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box flex={3} width="95%">
        <ThemedCard>
          <Text variant="header">Meetup Details</Text>
          <Text variant="header">{meetupTime}</Text>

          <Text variant="subheader">{meetupLocation}</Text>
        </ThemedCard>
        <ThemedCard>
          <Text variant="subheader">Participants</Text>
          <FlatList
            data={meetupParticipants}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderParticipant}
          />
        </ThemedCard>
      </Box>
      <Box
        flex={1}
        flexDirection="row"
        justifyContent="space-around"
        width="95%"
      >
        <Box alignItems="center">
          <ThemedIcon
            size={32}
            raised
            reverse
            name="cross"
            type="entypo"
            onPress={onDecline}
          />
          <Text variant="body">Decline</Text>
        </Box>

        <Box alignItems="center">
          <ThemedIcon
            size={32}
            raised
            reverse
            name="check"
            type="entypo"
            onPress={onAccept}
          />
          <Text variant="body">Accept</Text>
        </Box>
      </Box>
    </Box>
  );
}
