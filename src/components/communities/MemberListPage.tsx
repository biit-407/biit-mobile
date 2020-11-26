import React, { useEffect, useState } from "react";
import { StyleSheet, SectionList, Alert, SectionListData } from "react-native";

import {
  banUserFromCommunity,
  getCommunity,
  loadCommunity,
  useCommunity,
} from "../../contexts/communityContext";
import { useToken } from "../../contexts/tokenContext";
import { BLANK_COMMUNITY, Community } from "../../models/community";
import { useAccountState } from "../../contexts/accountContext";
import { CommunityRoutes, StackNavigationProps } from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedIcon from "../themed/ThemedIcon";
import ThemedListItem from "../themed/ThemedListItem";
import { ThemedRefreshControl } from "../themed";
import { useConstructor } from "../../hooks";

export const MemberListPageOptions = {
  title: "Member List",
  headerTransparent: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
});

type MemberListSection = { title: string; icon: string; data: string[] };

export default function MemberListPage({
  route,
}: StackNavigationProps<CommunityRoutes, "MemberList">) {
  const [tokenState, tokenDispatch] = useToken();
  const [communityState, communityDispatch] = useCommunity();
  const accountState = useAccountState();

  // Create state for page variables
  const [memberData, setMemberData] = useState<MemberListSection[]>([]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [community, setCommunity] = useState<Community>(BLANK_COMMUNITY);

  const loadMemberData = async () => {
    setIsRefreshing(true);
    await loadCommunity(
      communityDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      route.params.name
    );
    setIsRefreshing(false);
  };

  // Load in member data on render
  useConstructor(() => {
    loadMemberData();
  });

  // Upon loading the community, set the data of the section list
  useEffect(() => {
    const loadedCommunity = getCommunity(communityState, route.params.name);
    const { Admins, Members } = loadedCommunity;
    setMemberData([
      { title: "Admins", data: Admins, icon: "user" },
      {
        title: "Members",
        data: Members.filter((member) => !Admins.includes(member)),
        icon: "users",
      },
    ]);
    setCommunity(loadedCommunity);
  }, [communityState, route.params.name]);

  const promptBanUser = (email: string, communityName: string) => {
    Alert.alert(
      "Ban " + email,
      "Are you sure you want to ban " + email + " from " + communityName + "?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await banUserFromCommunity(
              tokenDispatch,
              tokenState.refreshToken,
              accountState.account.email,
              email,
              communityName
            );
            loadCommunity(
              communityDispatch,
              tokenDispatch,
              tokenState.refreshToken,
              route.params.name
            );
          },
        },
      ]
    );
  };

  const promptPromoteUser = (email: string, communityName: string) => {
    Alert.alert(
      `Promote ${email}?`,
      `Are you sure you want to promote ${email} to admin in ${communityName}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            // TODO: Add in promotion method
            loadCommunity(
              communityDispatch,
              tokenDispatch,
              tokenState.refreshToken,
              route.params.name
            );
          },
        },
      ]
    );
  };

  const MemberListItem = ({ memberEmail }: { memberEmail: string }) => {
    const { Admins, name } = community;
    const showRightContent =
      Admins.includes(accountState.account.email) &&
      !Admins.includes(memberEmail);
    const rightContent = (
      <>
        <ThemedIcon
          size={24}
          name="person-add"
          type="material"
          onPress={() => promptPromoteUser(memberEmail, name)}
        />
        <Box marginHorizontal="sm" />
        <ThemedIcon
          size={24}
          name="cross"
          type="entypo"
          onPress={() => promptBanUser(memberEmail, name)}
        />
      </>
    );

    return (
      <ThemedListItem
        title={memberEmail}
        rightContent={showRightContent ? rightContent : null}
      />
    );
  };

  const SectionListHeader = ({
    section,
  }: {
    section: SectionListData<string>;
  }) => (
    <Box
      padding="md"
      backgroundColor="headerBackground"
      flexDirection="row"
      alignItems="center"
    >
      <ThemedIcon type="font-awesome" name={section.icon} />
      <Text paddingLeft="sm" variant="sectionListHeader">
        {section.title}
      </Text>
    </Box>
  );

  return (
    <Box style={styles.root} backgroundColor="mainBackground">
      <SectionList
        refreshControl={
          <ThemedRefreshControl
            onRefresh={loadMemberData}
            refreshing={isRefreshing}
          />
        }
        sections={memberData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <MemberListItem memberEmail={item} />}
        renderSectionHeader={({ section }) => (
          <SectionListHeader section={section} />
        )}
        ListEmptyComponent={() => <Text>No members exist</Text>}
      />
    </Box>
  );
}
