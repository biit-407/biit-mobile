import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { BLANK_COMMUNITY, Community } from "../../models/community";
import {
  CommunityListPageNavigationProp,
  CommunityListPageRouteProp,
} from "../../routes";
import { ThemedIcon, ThemedListItem } from "../themed";
import Box from "../themed/Box";
import ThemedSearchBar from "../themed/ThemedSearchBar";

type CommunityListPageProps = {
  route: CommunityListPageRouteProp;
  navigation: CommunityListPageNavigationProp;
};

export const CommunityListPageOptions = {
  tabBarIcon: ({ color }: { color: string }) => (
    <ThemedIcon name="group" type="fontawesome" color={color} />
  ),
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
});

// const Item = ({ title }: { title: string }) => (
//   <Box style={styles.listitem}>
//     <Text>{title}</Text>
//   </Box>
// );

export default function CommunityListPage({
  navigation,
}: CommunityListPageProps) {
  // TODO: Actually use community state once the endpoint is created
  // const [communityState, communityDispatch] = useCommunity();

  const communities: Community[] = [
    { ...BLANK_COMMUNITY, name: "biit" },
    { ...BLANK_COMMUNITY, name: "Johnsons" },
  ];

  const [filteredCommunities, setFilteredCommunities] = useState(communities);

  const [search, setSearch] = useState("");
  const onSearch = (searchText: string) => {
    setSearch(searchText);
    searchText = searchText.toLowerCase().replace(/\s/g, "");
    const filtered = communities.filter(({ name }) => {
      name = name.toLowerCase().replace(/\s/g, "");
      return name.includes(searchText);
    });
    setFilteredCommunities(filtered);
  };

  const renderListItem = ({ item }: { item: Community }) => (
    <ThemedListItem
      title={item.name}
      onPress={() => {
        navigation.push("CommunityHome", { communityID: item.name });
      }}
      chevron
    />
  );

  return (
    <Box style={styles.root} backgroundColor="mainBackground">
      <ThemedSearchBar
        placeholder="Search your communities..."
        onChangeText={onSearch}
        value={search}
      />
      <FlatList
        data={filteredCommunities}
        renderItem={renderListItem}
        keyExtractor={(community) => community.name}
      />
    </Box>
  );
}
