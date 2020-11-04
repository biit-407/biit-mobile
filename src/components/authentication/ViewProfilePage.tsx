import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
// import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import {
  ViewProfilePageNavigationProp,
  ViewProfilePageRouteProp,
} from "../../routes";
import Box from "../themed/Box";
import ThemedAvatar from "../themed/ThemedAvatar";
import Text from "../themed/Text";
import ThemedCard from "../themed/ThemedCard";
import { getProfilePicture, useAccount } from "../../contexts/accountContext";
import { EMPTY_PROFILE_PIC } from "../../models/constants";
import { useToken } from "../../contexts/tokenContext";
import theme from "../../theme";

// React Navigation Types and Page Options

type ViewProfilePageProps = {
  navigation: ViewProfilePageNavigationProp;
  route: ViewProfilePageRouteProp;
};

export const ViewProfilePageOptions: StackNavigationOptions = {
  title: "View Profile",
};

// Page Styles

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     flexDirection: "column",
//     alignItems: "center",
//   },
// });

// Page Definition

export default function ViewProfilePage({ navigation }: ViewProfilePageProps) {
  const [accountState, accountDispatch] = useAccount();
  const [tokenState, tokenDispatch] = useToken();
  const [avatar, setAvatar] = useState(EMPTY_PROFILE_PIC);

  console.log(accountState);

  useEffect(() => {
    getProfilePicture(
      accountDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      accountState.account
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setAvatar(
      accountState.account.profileImage
        ? accountState.account.profileImage
        : EMPTY_PROFILE_PIC
    );
  }, [accountState.account.profileImage]);

  return (
    <Box
      backgroundColor="mainBackground"
      style={{ flexDirection: "row", height: "100%" }}
    >
      <Box style={{ width: "100%", height: "100%" }}>
        <ThemedCard wrapperStyle={{ alignItems: "center" }}>
          <ThemedAvatar
            uri={avatar}
            size="xlarge"
            edit={true}
            onEdit={() => {
              navigation.push("EditProfile");
            }}
          />
          <Text marginBottom="md" variant="header">
            {accountState.account.fname + " " + accountState.account.lname}
          </Text>
        </ThemedCard>

        {/* TODO fix this hard coding */}
        <Button
          onPress={() =>
            navigation.navigate("PreviousMeetups", { pastMeetupIDs: ["an ID"] })
          }
          title={"View Previous Meetups"}
          buttonStyle={{
            backgroundColor: theme.colors.buttonPrimaryBackground,
            padding: theme.spacing.md,
            margin: theme.spacing.md,
            elevation: 16,
            shadowColor: "#000000",
            shadowOpacity: 0.29,
            shadowOffset: {
              width: 8,
              height: 8,
            },
            shadowRadius: 16,
            marginBottom: 32,
          }}
        />
      </Box>
    </Box>
  );
}
