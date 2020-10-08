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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE8C6",
  },
  list: {
    width: "100%",
  },
  header: {
    paddingLeft: 5,
  },
});

// const Item = ({ title }: { title: string }) => (
//   <Box style={styles.listitem}>
//     <Text>{title}</Text>
//   </Box>
// );

export default function MemberListPage({ route }: MemberListPageProps) {
  const [communityState, communityDispatch] = useCommunity();
  const [data, setData] = useState<{ title: string; data: string[] }[]>([]);
  const [community, setCommunity] = useState<Community>(BLANK_COMMUNITY);
  const [tokenState, tokenDispatch] = useToken();
  const accountState = useAccountState();

  useEffect(() => {
    // automatically queue a data update
    loadCommunity(
      communityDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      route.params.name
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const tempCommunity = getCommunity(communityState, route.params.name);
    setData([
      { title: "Admins", data: tempCommunity.Admins },
      { title: "Members", data: tempCommunity.Members },
    ]);
    setCommunity(tempCommunity);
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
          onPress: () => {
            banUserFromCommunity(
              tokenDispatch,
              tokenState.refreshToken,
              accountState.account.email,
              email,
              communityName
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
        name="cross"
        type="entypo"
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
    <Box style={styles.root}>
      <Box marginVertical="md">
        <Text variant="header">{community.name}</Text>
      </Box>
      <SectionList
        style={styles.list}
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Box backgroundColor="headerBackground" style={styles.header}>
            <Text>{title}</Text>
          </Box>
        )}
        ListEmptyComponent={() => <Text>No members exist</Text>}
      />
    </Box>
  );
}
