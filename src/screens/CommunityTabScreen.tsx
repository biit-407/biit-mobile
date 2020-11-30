import * as React from 'react';

import { BottomTabBarOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@shopify/restyle';

import CommunityListPage, {
    CommunityListPageOptions
} from '../components/communities/CommunityListPage';
import CommunitySearchPage, {
    CommunitySearchPageOptions
} from '../components/communities/CommunitySearchPage';
import CreateCommunityPage, {
    CreateCommunityPageOptions
} from '../components/communities/CreateCommunityPage';
import { Theme } from '../theme';

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
        name="CommunityList"
        component={CommunityListPage}
        options={CommunityListPageOptions}
      />
      <Tab.Screen
        name="CommunitySearch"
        component={CommunitySearchPage}
        options={CommunitySearchPageOptions}
      />
      {/* #TODO:  Include create community and search for new community pages */}
      <Tab.Screen
        name="CreateCommunity"
        component={CreateCommunityPage}
        options={CreateCommunityPageOptions}
      />
    </Tab.Navigator>
  );
}
