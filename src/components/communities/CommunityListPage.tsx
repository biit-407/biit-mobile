import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { BLANK_COMMUNITY, Community } from '../../models/community';
import { CommunityRoutes, StackNavigationProps } from '../../routes';
import { Text, ThemedIcon, ThemedListItem } from '../themed';
import Box from '../themed/Box';
import ThemedSearchBar from '../themed/ThemedSearchBar';

export const CommunityListPageOptions = {
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
      name="users"
      type="feather"
      size={focused ? 30 : size}
      color={color}
    />
  ),
  tabBarLabel: ({ color, focused }: { focused: boolean; color: string }) => (
    <Text style={{ color: color }} fontSize={focused ? 12 : 10} mb="xs">
      My Communities
    </Text>
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
}: StackNavigationProps<CommunityRoutes, "CommunityList">) {
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
