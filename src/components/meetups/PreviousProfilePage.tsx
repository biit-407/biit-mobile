import React from "react";
import { Alert, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useAccountState } from "../../contexts/accountContext";
import { reconnect } from "../../contexts/meetupContext";
import { useSnackbar } from "../../contexts/snackbarContext";
import { useToken } from "../../contexts/tokenContext";
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
    account: { email },
  } = useAccountState();
  const [{ refreshToken }, tokenDispatch] = useToken();

  const {
    previousUser: { fname, lname, commonMeetups },
  } = route.params;

  const [, snackbarDispatch] = useSnackbar();

  // TODO: Integrated reconnect logic
  const promptReconnect = (meetup: Meetup) => {
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
          onPress: async () => {
            const acceptedUsers = [];
            for (const [userEmail, value] of Object.entries(meetup.user_list)) {
              if (value === 1 && userEmail !== email) {
                acceptedUsers.push(userEmail);
              }
            }
            const result = await reconnect(
              email,
              refreshToken,
              tokenDispatch,
              acceptedUsers,
              meetup.community
            );
            if (result) {
              snackbarDispatch({
                type: "push",
                state: {
                  snackbarVisible: true,
                  snackbarMessage: "Successfully Created Meetup",
                  queue: [],
                  snackbarType: "success",
                },
                dispatch: snackbarDispatch,
              });
            } else {
              snackbarDispatch({
                type: "push",
                state: {
                  snackbarVisible: true,
                  snackbarMessage: "Failed to Create Meetups",
                  queue: [],
                  snackbarType: "error",
                },
                dispatch: snackbarDispatch,
              });
            }
          },
        },
      ]
    );
  };

  const emptyList = () => (
    <Text textAlign="center" variant="body">
      You have not had any meetups with {fname}
    </Text>
  );
  console.log(commonMeetups);
  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <FlatList
        data={commonMeetups}
        keyExtractor={(meetup) => meetup.id}
        renderItem={({ item }) => (
          <MeetupCard
            {...item}
            userList={item.user_list}
            onPress={() => promptReconnect(item)}
          />
        )}
        ListHeaderComponent={
          <>
            <ProfileCard name={`${fname} ${lname}`} />
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
