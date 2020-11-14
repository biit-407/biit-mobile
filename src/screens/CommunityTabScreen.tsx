import * as React from "react";
import { Text, View } from "react-native";
import {
  BottomTabBarOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useTheme } from "@shopify/restyle";

import CommunityListPage, {
  CommunityListPageOptions,
} from "../components/communities/CommunityList";
import { Theme } from "../theme";
import { ThemedIcon } from "../components/themed";

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
      {/* #TODO:  Include create community and search for new community pages */}
      <Tab.Screen
        name="Search Communities"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <ThemedIcon name="search" type="material" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create Community"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <ThemedIcon name="create" type="material" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
