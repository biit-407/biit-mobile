import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import {
  LeaveCommunityPageRouteProp,
  LeaveCommunityPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";
import {
  leaveCommunity,
  useCommunityDispatch,
} from "../../contexts/communityContext";
import { useAccountState } from "../../contexts/accountContext";
import { useToken } from "../../contexts/tokenContext";
import ThemedIcon from "../themed/ThemedIcon";

type LeaveCommunityPageProps = {
  route: LeaveCommunityPageRouteProp;
  navigation: LeaveCommunityPageNavigationProp;
};

export const LeaveCommunityPageOptions = {
  title: "Leave Community",
  headerTransparent: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Divider = () => (
  <View
    style={{
      flexGrow: 1,
      borderBottomColor: "black",
      borderBottomWidth: 2,
    }}
  />
);

export default function LeaveCommunityPage({
  route,
  navigation,
}: LeaveCommunityPageProps) {
  // Get context variables
  const communityDispatch = useCommunityDispatch();
  const [tokenState, tokenDispatch] = useToken();
  const accountState = useAccountState();

  // Extract info about the community to join
  const { name, numMembers } = route.params;

  // Create a function to leave the specified community
  const leave = async () => {
    await leaveCommunity(
      communityDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      accountState.account.email,
      route.params.name
    );
    navigation.reset({ index: 0, routes: [{ name: "Community" }] });
  };

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box flex={3} padding="md">
        <ScrollView>
          <Text variant="header" textAlign="center" marginBottom="md">
            Leave "{name}"?
          </Text>
          <Box
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            marginVertical="sm"
          >
            <Divider />
            <Text
              fontWeight="bold"
              fontSize={16}
              marginHorizontal="sm"
            >{`${numMembers} members`}</Text>
            <Divider />
          </Box>
          <Text variant="subheader">
            By leaving {name} you will no longer be able to participate in
            meetups for this community. Are you sure leave?
          </Text>
        </ScrollView>
      </Box>
      <Box
        flex={1}
        flexDirection="row"
        justifyContent="space-around"
        paddingTop="md"
        width="100%"
      >
        <Box alignItems="center">
          <ThemedIcon
            name="cross"
            type="entypo"
            size={32}
            reverse
            onPress={() => navigation.pop()}
          />
          <Text variant="body">Decline</Text>
        </Box>
        <Box alignItems="center">
          <ThemedIcon
            name="check"
            type="entypo"
            size={32}
            reverse
            onPress={() => leave()}
          />
          <Text variant="body">Accept</Text>
        </Box>
      </Box>
    </Box>
  );
}
