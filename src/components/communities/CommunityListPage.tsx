import React, { useEffect, useState } from "react";
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
  // Retrive context variables
  const {
    account: { email },
  } = useAccountState();
  const [tokenState, tokenDispatch] = useToken();

  // Create state for loading in communities
  const [refreshing, setRefreshing] = useState(false);
  const [communities, setCommunities] = useState<Community[]>([]);

  // Create state for filtering in communities
  const [filteredCommunities, setFilteredCommunities] = useState(communities);
  const [search, setSearch] = useState("");

  // Function to filter communites based on the searchText
  const onSearch = (searchText: string) => {
    setSearch(searchText);
    searchText = searchText.toLowerCase().replace(/\s/g, "");
    const filtered = communities.filter(({ name }) => {
      name = name.toLowerCase().replace(/\s/g, "");
      return name.includes(searchText);
    });
    setFilteredCommunities(filtered);
  };

  // Function to load all the user's communities
  const loadCommunities = async () => {
    setRefreshing(true);
    const myCommunities = await getAllCommunities(
      email,
      tokenState.refreshToken,
      tokenDispatch
    );
    setCommunities(
      myCommunities?.filter((community) => community.Members.includes(email)) ??
        []
    );
    setRefreshing(false);
  };

  // Effect to properly display results after loading in communities
  useEffect(
    () => onSearch(search),
    [communities] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Allows automatic loading on the page when navigating to the page from a nested or parent screen
  // Used in this case for when the user creates a new community and are redirected here
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadCommunities();
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderListItem = ({ item }: { item: Community }) => (
    <ThemedListItem
      title={item.name}
      onPress={() => {
        navigation.push("CommunityHome", { communityID: item.name });
      }}
      chevron
    />
  );

  const listEmpty = () => {
    const message =
      communities.length === 0
        ? "You are not part of any communities. Please join or create one!"
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
        placeholder="Search your communities..."
        onChangeText={onSearch}
        value={search}
      />
      <FlatList
        data={filteredCommunities}
        renderItem={renderListItem}
        keyExtractor={(community) => community.name}
        ListEmptyComponent={listEmpty}
        refreshControl={
          <ThemedRefreshControl
            refreshing={refreshing}
            onRefresh={loadCommunities}
          />
        }
      />
    </Box>
  );
}
