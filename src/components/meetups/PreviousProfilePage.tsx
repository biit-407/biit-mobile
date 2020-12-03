import React from "react";
import { Alert, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { Meetup } from "../../models/meetups";
import { AccountRoutes, StackNavigationProps } from "../../routes";
import { ProfileCard, Text } from "../themed";
import Box from "../themed/Box";

import MeetupCard from "./MeetupCard";

export const PreviousProfilePageOptions = {
  title: "Previous Profile",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
});

export default function PreviousProfilePage({
  route,
}: StackNavigationProps<AccountRoutes, "PreviousProfile">) {
  const {
    previousUser: { fname, lname, commonMeetups },
  } = route.params;

  // TODO: Integrated reconnect logic
  const reconnect = (meetup: Meetup) => {
    Alert.alert(
      `Reconnect with ${fname} ${lname}?`,
      `Do you want to reconnect with ${fname} ${lname} in ${meetup.community}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => true,
        },
      ]
    );
  };

  const emptyList = () => (
    <Text textAlign="center" variant="body">
      You have not had any meetups with {fname}
    </Text>
  );

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <FlatList
        data={commonMeetups}
        keyExtractor={(meetup) => meetup.id}
        renderItem={({ item }) => (
          <MeetupCard {...item} onPress={() => reconnect(item)} />
        )}
        ListHeaderComponent={
          <>
            <ProfileCard name={`${fname} ${lname}`} />
            {/* <ThemedButton
              title={`Reconnect with ${fname}`}
              onPress={reconnect}
            /> */}
            <Text textAlign="center" variant="subheader">
              Your previous meetups with {fname}
            </Text>
          </>
        }
        ListFooterComponent={<Box marginVertical="lg" />}
        ListEmptyComponent={emptyList}
      />
    </Box>
  );
}
