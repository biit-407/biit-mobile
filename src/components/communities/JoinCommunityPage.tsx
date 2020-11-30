import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useAccountState } from "../../contexts/accountContext";
import {
  joinCommunity,
  useCommunityDispatch,
} from "../../contexts/communityContext";
import { useToken } from "../../contexts/tokenContext";
import { CommunityRoutes, StackNavigationProps } from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedIconButton from "../themed/ThemedIconButton";

export const JoinCommunityPageOptions = {
  title: "Join Community",
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

export default function JoinCommunityPage({
  route,
  navigation,
}: StackNavigationProps<CommunityRoutes, "JoinCommunity">) {
  // Get context variables
  const communityDispatch = useCommunityDispatch();
  const [tokenState, tokenDispatch] = useToken();
  const accountState = useAccountState();

  // Extract info about the community to join
  const { name, codeOfConduct, numMembers } = route.params;

  // Create a function to join the specified community
  const join = async () => {
    await joinCommunity(
      communityDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      accountState.account.email,
      route.params.name
    );
    navigation.pop();
  };

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box flex={3} padding="md">
        <ScrollView>
          <Text variant="header" textAlign="center" marginBottom="md">
            Join "{name}"?
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
            By joining {name} you agree to adhere to the following code of
            conduct
          </Text>
          <Text variant="body">{codeOfConduct}</Text>
          {/* TODO: Remove dummy text once actual info is passed into for code of conduct */}
          <Text variant="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            auctor risus sit amet ante imperdiet semper. Fusce metus augue,
            egestas ut quam at, faucibus finibus tellus. Donec mauris dolor,
            luctus eu velit quis, venenatis congue est. Nunc fringilla imperdiet
            erat, quis consectetur mi tempor quis. Quisque sodales porta ante,
            sit amet euismod massa eleifend ac. Cras consequat lectus a lacus
            rhoncus, non luctus elit eleifend. Sed eget scelerisque elit. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. Suspendisse at dapibus libero. Aenean in blandit
            urna. Nunc neque turpis, pellentesque quis purus vitae, molestie
            congue nisi. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Fusce scelerisque, neque
            eget dignissim aliquet, enim orci convallis erat, eget pretium elit
            tortor eget lectus.
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
          <ThemedIconButton
            name="x"
            type="feather"
            size={64}
            onPress={() => navigation.pop()}
            buttonColor="buttonDanger"
          />
          <Text variant="body">Decline</Text>
        </Box>
        <Box alignItems="center">
          <ThemedIconButton
            name="check"
            type="feather"
            size={64}
            onPress={() => join()}
            buttonColor="buttonConfirm"
          />
          <Text variant="body">Accept</Text>
        </Box>
      </Box>
    </Box>
  );
}
