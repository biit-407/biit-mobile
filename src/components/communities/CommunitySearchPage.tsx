import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { BLANK_COMMUNITY, Community } from "../../models/community";
import {
  CommunitySearchPageRouteProp,
  CommunitySearchPageNavigationProp,
} from "../../routes";
import { ThemedIcon, ThemedListItem, ThemedRefreshControl } from "../themed";
import Box from "../themed/Box";
import ThemedSearchBar from "../themed/ThemedSearchBar";

type CommunitySearchPageProps = {
  route: CommunitySearchPageRouteProp;
  navigation: CommunitySearchPageNavigationProp;
};

export const CommunitySearchPageOptions = {
  tabBarIcon: ({ color }: { color: string }) => (
    <ThemedIcon name="search" type="material" color={color} />
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
}: CommunitySearchPageProps) {
  // TODO: Actually use community state once the endpoint is created
  // const [communityState, communityDispatch] = useCommunity();
  const [isLoading, setIsLoading] = useState(false);

  const communities: Community[] = [
    { ...BLANK_COMMUNITY, name: "oasd" },
    { ...BLANK_COMMUNITY, name: "oooga" },
    { ...BLANK_COMMUNITY, name: "oasa" },
  ];

  const [foundCommunities, setFoundCommunities] = useState(communities);

  const [searchText, setSearchText] = useState("");
  const onSearch = () => {
    // Don't perform a search on empty search string???
    if (searchText.length === 0) {
      setFoundCommunities([]);
      return;
    }
    // Indicate loading
    setIsLoading(true);
    // TODO: Integrate to search for communities matching the given search text
    setTimeout(() => {
      setFoundCommunities(communities);
      setIsLoading(false);
    }, 1000);
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

  return (
    <Box style={styles.root} backgroundColor="mainBackground">
      <ThemedSearchBar
        placeholder="Search for new communities..."
        value={searchText}
        onChangeText={setSearchText}
        onEndEditing={onSearch}
        onClear={onClear}
      />
      <FlatList
        data={foundCommunities}
        renderItem={renderListItem}
        keyExtractor={(community) => community.name}
        refreshControl={
          <ThemedRefreshControl refreshing={isLoading} onRefresh={onSearch} />
        }
      />
    </Box>
  );
}
