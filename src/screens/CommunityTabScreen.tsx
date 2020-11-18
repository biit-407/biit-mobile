import * as React from "react";
import { Text, View } from "react-native";
import {
  BottomTabBarOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useTheme } from "@shopify/restyle";

import CommunityListPage, {
  CommunityListPageOptions,
} from "../components/communities/CommunityListPage";
import { Theme } from "../theme";
import { ThemedIcon } from "../components/themed";
import CreateCommunityPage, {
  CreateCommunityPageOptions,
} from "../components/communities/CreateCommunityPage";
import CommunitySearchPage, {
  CommunitySearchPageOptions,
} from "../components/communities/CommunitySearchPage";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function CommunityTabScreen() {
  const theme = useTheme<Theme>();
  const tabBarOptions: BottomTabBarOptions = {
    style: { backgroundColor: theme.colors.headerBackground },
    activeTintColor: theme.colors.tabBarActiveText,
    inactiveTintColor: theme.colors.tabBarInactiveText,
    labelStyle: { fontWeight: "bold" },
  };
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="My Communities"
        component={CommunityListPage}
        options={CommunityListPageOptions}
      />
      <Tab.Screen
        name="Search Communities"
        component={CommunitySearchPage}
        options={CommunitySearchPageOptions}
      />
      {/* #TODO:  Include create community and search for new community pages */}
      <Tab.Screen
        name="Create Community"
        component={CreateCommunityPage}
        options={CreateCommunityPageOptions}
      />
    </Tab.Navigator>
  );
}
