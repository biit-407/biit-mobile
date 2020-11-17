import { useTheme } from "@shopify/restyle";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
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
import { Text, ThemedButton, ThemedIcon } from "../themed";
import Box from "../themed/Box";
import { Theme } from "../../theme";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { BLANK_MEETUP } from "../../models/meetups";
import MeetupCard from "../meetups/MeetupCard";

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

export default function CommunityHomePage({
  route,
  navigation,
}: CommunityHomePageProps) {
  const { communityID } = route.params;
  const [tokenState, tokenDispatch] = useToken();
  const [communityState, communityDispatch] = useCommunity();
  const accountState = useAccountState();

  const searchForMeetup = async () => {
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
  const [isAdmin, setIsAdmin] = useState(false);

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
    if (loadedCommunity.Admins.includes(accountState.account.email)) {
      setIsAdmin(true);
    }
  }, [communityState, route.params.communityID, accountState]);

  const { name, codeofconduct, Members } = community;
  const theme = useTheme<Theme>();
  const [readMoreReady, setReadMoreReady] = useState(false);

  return (
    <Box backgroundColor="mainBackground" style={{ ...styles.root }}>
      <ScrollView>
        <Box flexGrow={1} width="100%" padding="md" justifyContent="flex-start">
          <Text variant="header" textAlign="center">
            {name}
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
              onPress={() => {
                navigation.push("MemberList", { name: communityID });
              }}
            >{`${Members.length} members`}</Text>
            <Divider />
          </Box>
          <ReadMore
            numberOfLines={3}
            renderTruncatedFooter={(handlePress) =>
              readMoreReady && (
                <Text variant="link" onPress={handlePress} fontSize={14}>
                  Show More
                </Text>
              )
            }
            renderRevealedFooter={(handlePress) =>
              readMoreReady && (
                <Text variant="link" onPress={handlePress} fontSize={14}>
                  Show Less
                </Text>
              )
            }
            onReady={() => setReadMoreReady(true)}
          >
            <Text variant="body">{codeofconduct}</Text>
          </ReadMore>
          <Box flexDirection="row" marginVertical="md">
            <Divider />
          </Box>
          <Text textAlign="center" variant="subheader" marginBottom="sm">
            Want to find a new meetup for {name}?
          </Text>
          <ThemedButton title="Search for Meetup" onPress={searchForMeetup} />
          <Text textAlign="center" variant="subheader" marginVertical="md">
            Your meetups in {name}
          </Text>
        </Box>
      </ScrollView>
      <Box
        width="100%"
        marginBottom="sm"
        borderTopColor="borderPrimary"
        borderTopWidth={2}
      >
        <Text textAlign="center" margin="xs" variant="subheader">
          Community Actions
        </Text>
        <Box
          flexDirection="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {isAdmin && (
            <>
              <ThemedIcon
                size={20}
                name="edit"
                type="feather"
                reverse
                onPress={() => {
                  navigation.push("CommunityAdministration", {
                    name: communityID,
                  });
                }}
              />
              <ThemedIcon
                size={20}
                name="line-graph"
                type="entypo"
                reverse
                onPress={() => {
                  console.log("Navigate to statistics");
                }}
              />
              <ThemedIcon
                size={20}
                name="ban"
                type="fontisto"
                reverse
                onPress={() => {
                  navigation.push("BannedUsers", { name: communityID });
                }}
              />
            </>
          )}
          <ThemedIcon
            size={20}
            name="group"
            type="fontawesome"
            reverse
            onPress={() => {
              navigation.push("MemberList", { name: communityID });
            }}
          />

          <ThemedIcon
            size={20}
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
