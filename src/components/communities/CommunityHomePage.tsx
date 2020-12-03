import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ReadMore from "react-native-read-more-text";

import { useAccountState } from "../../contexts/accountContext";
import {
    getCommunity, loadCommunity, startMatching, useCommunity
} from '../../contexts/communityContext';
import { useNotificationCenter } from '../../contexts/notificationCenterContext';
import { useSnackbar } from '../../contexts/snackbarContext';
import { useToken } from '../../contexts/tokenContext';
import { useConstructor } from '../../hooks';
import { BLANK_COMMUNITY } from '../../models/community';
import { BLANK_MEETUP } from '../../models/meetups';
import { CommunityRoutes, StackNavigationProps } from '../../routes';
import { Theme } from '../../theme';
import MeetupCard from '../meetups/MeetupCard';
import { Text, ThemedButton } from '../themed';
import Box from '../themed/Box';
import ThemedIconButton from '../themed/ThemedIconButton';
import NotificationCenter from '../userUtils/NotificationCenter';

export const CommunityHomePageOptions = {
  title: "",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
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

interface CommunityActionProps {
  iconName: string;
  iconType: string;
  action: () => void;
  label: string;
  color?: keyof Theme["colors"];
}

const CommunityAction = ({
  iconName,
  iconType,
  action,
  label,
  color,
}: CommunityActionProps) => {
  return (
    <Box justifyContent="center" alignItems="center">
      <ThemedIconButton
        name={iconName}
        type={iconType}
        onPress={action}
        buttonColor={color}
      />
      <Text>{label}</Text>
    </Box>
  );
};

export default function CommunityHomePage({
  route,
  navigation,
}: StackNavigationProps<CommunityRoutes, "CommunityHome">) {
  const { communityID } = route.params;
  const [tokenState, tokenDispatch] = useToken();
  const [communityState, communityDispatch] = useCommunity();
  const accountState = useAccountState();
  const [, snackbarDispatch] = useSnackbar();

  const searchForMeetup = async () => {
    console.log("Searching");
    const result = await startMatching(
      tokenDispatch,
      tokenState.refreshToken,
      accountState.account.email,
      communityID
    );
    if (result) {
      snackbarDispatch({
        type: "push",
        state: {
          snackbarVisible: true,
          snackbarMessage: "Successfully Created Meetups",
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
  const [readMoreReady, setReadMoreReady] = useState(false);

  const meetups = [
    { ...BLANK_MEETUP },
    { ...BLANK_MEETUP },
    { ...BLANK_MEETUP },
  ];

  const [notificationCenterState, ] = useNotificationCenter();

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <FlatList
        style={{ width: "100%" }}
        ListHeaderComponent={
          <Box padding="md" justifyContent="flex-start">
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
            <Text textAlign="center" margin="xs" variant="subheader">
              Community Actions
            </Text>
            <Box
              mt="md"
              flexDirection="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <CommunityAction
                iconName="users"
                iconType="feather"
                label="Members"
                action={() =>
                  navigation.push("MemberList", { name: communityID })
                }
              />
              <CommunityAction
                iconName="pie-chart"
                iconType="feather"
                label="Statistics"
                action={() =>
                  navigation.push("CommunityStats", {
                    communityID: communityID,
                  })
                }
              />
              <CommunityAction
                iconName="user-minus"
                iconType="feather"
                label="Leave"
                color="buttonDanger"
                action={() =>
                  navigation.push("LeaveCommunity", {
                    name: communityID,
                    numMembers: community.Members.length,
                  })
                }
              />
            </Box>
            <Box
              mt="md"
              flexDirection="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              {isAdmin && (
                <>
                  <CommunityAction
                    iconName="edit-3"
                    iconType="feather"
                    label="Administrate"
                    action={() =>
                      navigation.push("CommunityAdministration", {
                        name: communityID,
                      })
                    }
                  />
                  <CommunityAction
                    iconName="user-x"
                    iconType="feather"
                    label="Banned"
                    action={() =>
                      navigation.push("BannedUsers", { name: communityID })
                    }
                  />
                </>
              )}
            </Box>
            <Box flexDirection="row" marginVertical="md">
              <Divider />
            </Box>
            <Text textAlign="center" variant="subheader" marginBottom="sm">
              Want to find a new meetup for {name}?
            </Text>
            <ThemedButton title="Search for Meetup" onPress={searchForMeetup} />
            <Text
              textAlign="center"
              variant="subheader"
              marginTop="lg"
              fontWeight="bold"
            >
              Your meetups in {name}
            </Text>
          </Box>
        }
        ListFooterComponent={<Box pb="md" />}
        data={meetups}
        keyExtractor={(item) => item.id + Math.random() * 1000}
        renderItem={({ item }) => <MeetupCard {...item} isClickable={false} />}
      />
      <NotificationCenter
        isVisible={notificationCenterState.visible}
      />
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
