import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import {
  ViewProfilePageNavigationProp,
  ViewProfilePageRouteProp,
} from "../../routes";
import Box from "../themed/Box";
import ThemedAvatar from "../themed/ThemedAvatar";
import Text from "../themed/Text";
import ThemedCard from "../themed/ThemedCard";
import { getProfilePicture, useAccount } from "../../contexts/accountContext";
import { useState } from "react";
import { EMPTY_PROFILE_PIC } from "../../models/constants";
import { useToken } from "../../contexts/tokenContext";

// React Navigation Types and Page Options

type ViewProfilePageProps = {
  navigation: ViewProfilePageNavigationProp;
  route: ViewProfilePageRouteProp;
};

export const ViewProfilePageOptions: StackNavigationOptions = {
  title: "View Profile",
};

// Page Styles

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

// Page Definition

export default function ViewProfilePage({ navigation }: ViewProfilePageProps) {
  const [accountState, accountDispatch] = useAccount();
  const [tokenState, tokenDispatch] = useToken();
  const [avatar, setAvatar] = useState(EMPTY_PROFILE_PIC)

  useEffect(() => {
    getProfilePicture(accountDispatch, tokenDispatch, tokenState.refreshToken, accountState.account)
  }, [])

  useEffect(() => {
    // console.log(accountState.account.profileImage)
    setAvatar(accountState.account.profileImage ? accountState.account.profileImage : EMPTY_PROFILE_PIC)
  }, [accountState])

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <ThemedCard>
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
    </Box>
  );
}
