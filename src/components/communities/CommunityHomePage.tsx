import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import {
  CommunityHomePageRouteProp,
  CommunityHomePageNavigationProp,
} from "../../routes";
import theme from "../../theme";
import Box from "../themed/Box";

type CommunityHomePageProps = {
  route: CommunityHomePageRouteProp;
  navigation: CommunityHomePageNavigationProp;
};

export const CommunityHomePageOptions = {
  title: "Community Home",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 16,
  },
});

export default function CommunityHomePage({
  route,
  navigation,
}: CommunityHomePageProps) {
  const { communityID } = route.params;

  // TODO Load community data

  return (
    <Box backgroundColor="mainBackground" style={{ ...styles.root }}>
      <CommunityActionButton
        title="View Members"
        onPress={() => {
          navigation.push("MemberList", { name: communityID });
        }}
      />
      <CommunityActionButton
        title="Code of Conduct"
        onPress={() => {
          navigation.push("CodeOfConduct", { name: communityID });
        }}
      />
      <CommunityActionButton
        title="Banned Users"
        onPress={() => {
          navigation.push("BannedUsers", { name: communityID });
        }}
      />
      <CommunityActionButton
        title="Community Administrate"
        onPress={() => {
          navigation.push("CommunityAdministration", { name: communityID });
        }}
      />
      <CommunityActionButton
        isRed={true}
        title="Leave Community"
        onPress={() => {
          navigation.push("LeaveCommunity", { name: communityID });
        }}
      />
    </Box>
  );
}

const CommunityActionButton = (
  { title, onPress, isRed }: any // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  return (
    <>
      <Button
        onPress={onPress}
        title={title}
        buttonStyle={{
          backgroundColor: isRed
            ? theme.colors.iconSelectedRed
            : theme.colors.buttonPrimaryBackground,
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
          marginBottom: 24,
        }}
        containerStyle={{
          width: "100%",
        }}
      />
    </>
  );
};
