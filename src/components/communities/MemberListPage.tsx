import React, { useEffect, useState } from "react";
import { StyleSheet, SectionList, Alert } from "react-native";

import {
  banUserFromCommunity,
  getCommunity,
  loadCommunity,
  useCommunity,
} from "../../contexts/communityContext";
import { useToken } from "../../contexts/tokenContext";
import { Account } from "../../models/accounts";
import { BLANK_COMMUNITY, Community } from "../../models/community";
import { useAccountState } from "../../contexts/accountContext";
import {
  MemberListPageRouteProp,
  MemberListPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedIcon from "../themed/ThemedIcon";
import ThemedListItem from "../themed/ThemedListItem";
import { useConstructor } from "../../hooks";

type MemberListPageProps = {
  route: MemberListPageRouteProp;
  navigation: MemberListPageNavigationProp;
};

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

export default function MemberListPage({ route }: MemberListPageProps) {
  // Get app contexts
  const [tokenState, tokenDispatch] = useToken();
  const [communityState, communityDispatch] = useCommunity();
  const accountState = useAccountState();

  // Create state for page variables
  const [memberData, setMemberData] = useState<MemberListSection[]>([]);
  const [community, setCommunity] = useState<Community>(BLANK_COMMUNITY);

  // Load the community data
  useConstructor(() => {
    loadCommunity(
      communityDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      route.params.name
    );
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

  const renderBanHammer = (
    account: Account,
    communityInfo: Community,
    memberEmail: string
  ) => {
    const admins = communityInfo.Admins;
    if (!admins.includes(account.email) || admins.includes(memberEmail)) {
      return null;
    }
    return (
      <ThemedIcon
        size={24}
        name="ban"
        type="fontisto"
        onPress={() => promptBanUser(memberEmail, communityInfo.name)}
      />
    );
  };

  const Item = ({ title }: { title: string }) => (
    <ThemedListItem
      title={title}
      rightContent={renderBanHammer(accountState.account, community, title)}
    />
  );

  return (
    <Box style={styles.root} backgroundColor="mainBackground">
      <SectionList
        sections={memberData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title, icon } }) => (
          <Box
            padding="md"
            backgroundColor="headerBackground"
            flexDirection="row"
            alignItems="center"
          >
            <ThemedIcon type="font-awesome" name={icon} />
            <Text paddingLeft="sm" variant="sectionListHeader">
              {title}
            </Text>
          </Box>
        )}
        ListEmptyComponent={() => <Text>No members exist</Text>}
      />
    </Box>
  );
}
