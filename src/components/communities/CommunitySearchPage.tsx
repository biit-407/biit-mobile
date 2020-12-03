import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useAccountState } from "../../contexts/accountContext";
import { getAllCommunities } from "../../contexts/communityContext";
import { useToken } from "../../contexts/tokenContext";
import { Community } from "../../models/community";
import { CommunityRoutes, StackNavigationProps } from "../../routes";
import {
  Text,
  ThemedIcon,
  ThemedListItem,
  ThemedRefreshControl,
} from "../themed";
import Box from "../themed/Box";
import ThemedSearchBar from "../themed/ThemedSearchBar";

export const CommunitySearchPageOptions = {
  tabBarIcon: ({
    color,
    size,
    focused,
  }: {
    color: string;
    focused: boolean;
    size: number;
  }) => (
    <ThemedIcon
      name="search"
      type="feather"
      size={focused ? 30 : size}
      color={color}
    />
  ),
  tabBarLabel: ({ color, focused }: { focused: boolean; color: string }) => (
    <Text style={{ color: color }} fontSize={focused ? 12 : 10} mb="xs">
      Search Communities
    </Text>
  ),
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
});

export default function CommunitySearchPage({
  navigation,
}: StackNavigationProps<CommunityRoutes, "CommunitySearch">) {
  // Retrive context variables
  const {
    account: { email },
  } = useAccountState();
  const [tokenState, tokenDispatch] = useToken();

  // Create state for loading in communities
  const [refreshing, setRefreshing] = useState(false);

  const [foundCommunities, setFoundCommunities] = useState<Community[]>([]);

  const [searchText, setSearchText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const onChangeText = (text: string) => {
    setIsTyping(true);
    setSearchText(text);
  };
  const onSearch = async () => {
    setIsTyping(false);

    // Don't perform a search on empty search string???
    if (searchText.length === 0) {
      setFoundCommunities([]);
      return;
    }

    // Indicate loading
    setRefreshing(true);

    // Fetch all communites
    const allCommunities =
      (await getAllCommunities(
        email,
        tokenState.refreshToken,
        tokenDispatch
      )) ?? [];

    // Filter communities by user membership and then by search text
    const filteredCommunites = allCommunities
      .filter((community) => !community.Members.includes(email))
      .filter(({ name }) => {
        name = name.toLowerCase().replace(/\s/g, "");
        return name.includes(searchText.toLowerCase().replace(/\s/g, ""));
      });

    setFoundCommunities(filteredCommunites);
    setRefreshing(false);
  };

  const onClear = () => {
    // Clear found communities
    setFoundCommunities([]);
  };

  const renderListItem = ({ item }: { item: Community }) => {
    const { name, codeofconduct, Members } = item;
    return (
      <ThemedListItem
        title={item.name}
        onPress={() => {
          setFoundCommunities([]);
          setSearchText("");
          navigation.push("JoinCommunity", {
            name,
            codeOfConduct: codeofconduct,
            numMembers: Members.length,
          });
        }}
        chevron
      />
    );
  };

  const listEmpty = () => {
    const message =
      searchText.length === 0 || isTyping
        ? "Start searching for new communities!"
        : "No communities matched your search";
    return (
      <Text textAlign="center" m="md" variant="subheader">
        {message}
      </Text>
    );
  };

  return (
    <Box style={styles.root} backgroundColor="mainBackground">
      <ThemedSearchBar
        placeholder="Search for new communities..."
        value={searchText}
        onChangeText={onChangeText}
        onEndEditing={onSearch}
        onClear={onClear}
      />
      <FlatList
        data={foundCommunities}
        renderItem={renderListItem}
        keyExtractor={(community) => community.name}
        refreshControl={
          <ThemedRefreshControl refreshing={refreshing} onRefresh={onSearch} />
        }
        ListEmptyComponent={listEmpty}
      />
    </Box>
  );
}
