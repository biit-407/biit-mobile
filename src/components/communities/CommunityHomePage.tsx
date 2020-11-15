import { useTheme } from "@shopify/restyle";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import ReadMore from "react-native-read-more-text";

import { useAccountState } from "../../contexts/accountContext";
import {
  getCommunity,
  loadCommunity,
  startMatching,
  useCommunity,
} from "../../contexts/communityContext";
import { useToken } from "../../contexts/tokenContext";
import { useConstructor } from "../../hooks";
import { BLANK_COMMUNITY } from "../../models/community";
import {
  CommunityHomePageRouteProp,
  CommunityHomePageNavigationProp,
} from "../../routes";
import { Text, ThemedIcon } from "../themed";
import Box from "../themed/Box";
import { Theme } from "../../theme";

type CommunityHomePageProps = {
  route: CommunityHomePageRouteProp;
  navigation: CommunityHomePageNavigationProp;
};

export const CommunityHomePageOptions = {
  title: "",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },
});

export default function CommunityHomePage({
  route,
  navigation,
}: CommunityHomePageProps) {
  const { communityID } = route.params;
  const [tokenState, tokenDispatch] = useToken();
  const [communityState, communityDispatch] = useCommunity();
  const accountState = useAccountState();

  const startNewSession = async () => {
    const result = await startMatching(
      tokenDispatch,
      tokenState.refreshToken,
      accountState.account.email,
      communityID
    );
    Alert.alert(`${result}`);
  };

  // Utilize community data
  const [community, setCommunity] = useState(BLANK_COMMUNITY);

  useConstructor(() => {
    // automatically queue a data update
    loadCommunity(
      communityDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      route.params.communityID
    );
  });

  useEffect(() => {
    const loadedCommunity = getCommunity(
      communityState,
      route.params.communityID
    );
    setCommunity(loadedCommunity);
  }, [communityState, route.params.communityID]);

  const { name, codeofconduct, Members } = community;
  const theme = useTheme<Theme>();
  return (
    <Box backgroundColor="mainBackground" style={{ ...styles.root }}>
      <Box flexGrow={1}>
        <Text variant="header" textAlign="center">
          {name}
        </Text>
        <ReadMore
          numberOfLines={3}
          renderRevealedFooter={(handlePress) => {
            return (
              <Text variant="link" onPress={handlePress} fontSize={14}>
                Show Less
              </Text>
            );
          }}
          renderTruncatedFooter={(handlePress) => {
            return (
              <Text variant="link" onPress={handlePress} fontSize={14}>
                Show More
              </Text>
            );
          }}
        >
          <Text variant="body">{codeofconduct}</Text>
        </ReadMore>
        <Text
          fontWeight="bold"
          textDecorationLine="underline"
          fontSize={16}
          onPress={() => {
            navigation.push("MemberList", { name: communityID });
          }}
        >{`View all ${Members.length} members`}</Text>

        {/* <CommunityActionButton
          title="Start New Session"
          onPress={startNewSession}
        />
        <CommunityActionButton
          isRed={true}
          title="Leave Community"
          onPress={() => {
            navigation.push("LeaveCommunity", { name: communityID });
          }}
        /> */}
      </Box>
      <Box flexDirection="row">
        <ThemedIcon
          name="edit"
          type="feather"
          reverse
          onPress={() => {
            navigation.push("CommunityAdministration", { name: communityID });
          }}
        />
        <ThemedIcon
          name="ban"
          type="fontisto"
          reverse
          onPress={() => {
            navigation.push("BannedUsers", { name: communityID });
          }}
        />
        <ThemedIcon
          name="group"
          type="fontawesome"
          reverse
          onPress={() => {
            navigation.push("MemberList", { name: communityID });
          }}
        />
        <ThemedIcon
          name="account-remove"
          type="material-community"
          color={theme.colors.iconSelectedRed}
          reverse
          onPress={() => {
            navigation.push("LeaveCommunity", { name: communityID });
          }}
        />
      </Box>
    </Box>
  );
}

// const CommunityActionButton = (
//   { title, onPress, isRed }: any // eslint-disable-line @typescript-eslint/no-explicit-any
// ) => {
//   return (
//     <>
//       <Button
//         onPress={onPress}
//         title={title}
//         buttonStyle={{
//           backgroundColor: isRed
//             ? theme.colors.iconSelectedRed
//             : theme.colors.buttonPrimaryBackground,
//           padding: theme.spacing.md,
//           margin: theme.spacing.md,
//           elevation: 16,
//           shadowColor: "#000000",
//           shadowOpacity: 0.29,
//           shadowOffset: {
//             width: 8,
//             height: 8,
//           },
//           shadowRadius: 16,
//           marginBottom: 24,
//         }}
//         containerStyle={{
//           width: "100%",
//         }}
//       />
//     </>
//   );
// };
