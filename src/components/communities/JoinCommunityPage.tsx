import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useAccountState } from "../../contexts/accountContext";
import {
  joinCommunity,
  useCommunityDispatch,
} from "../../contexts/communityContext";
import { useSnackbarDispatch } from "../../contexts/snackbarContext";
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
  const snackbarDispatch = useSnackbarDispatch();

  // Extract info about the community to join
  const { name, codeOfConduct, numMembers } = route.params;

  // Create a function to join the specified community
  const join = async () => {
    const result = await joinCommunity(
      communityDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      accountState.account.email,
      route.params.name
    );

    if (result) {
      snackbarDispatch({
        type: "push",
        state: {
          snackbarMessage: `Successfully joined ${route.params.name}`,
          snackbarVisible: true,
          snackbarType: "success",
          queue: [],
        },
        dispatch: snackbarDispatch,
      });
      navigation.pop();
    } else {
      snackbarDispatch({
        type: "push",
        state: {
          snackbarMessage: `Failed to join ${route.params.name}`,
          snackbarVisible: true,
          snackbarType: "error",
          queue: [],
        },
        dispatch: snackbarDispatch,
      });
    }
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
