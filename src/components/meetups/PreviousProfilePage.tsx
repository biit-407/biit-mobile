import React from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { AccountRoutes, StackNavigationProps } from "../../routes";
import { ProfileCard, Text, ThemedButton } from "../themed";
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
  const reconnect = () => true;

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
        renderItem={({ item }) => <MeetupCard {...item} isClickable={false} />}
        ListHeaderComponent={
          <>
            <ProfileCard name={`${fname} ${lname}`} />
            <ThemedButton
              title={`Reconnect with ${fname}`}
              onPress={reconnect}
            />
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
