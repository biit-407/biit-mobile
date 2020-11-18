import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { BLANK_COMMUNITY, Community } from "../../models/community";
import {
  CommunitySearchPageRouteProp,
  CommunitySearchPageNavigationProp,
} from "../../routes";
import { ThemedIcon, ThemedListItem } from "../themed";
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

  const communities: Community[] = [
    { ...BLANK_COMMUNITY, name: "oasd" },
    { ...BLANK_COMMUNITY, name: "Johnsons" },
  ];

  const [foundCommunities, setFoundCommunities] = useState(communities);

  const [searchText, setSearchText] = useState("");
  const onSearch = () => {
    console.log(searchText);
  };

  const onClear = () => {
    console.log(searchText);
  };

  const renderListItem = ({ item }: { item: Community }) => (
    <ThemedListItem
      title={item.name}
      onPress={() => {
        navigation.push("JoinCommunity", { name: item.name });
      }}
      chevron
    />
  );

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
      />
    </Box>
  );
}
