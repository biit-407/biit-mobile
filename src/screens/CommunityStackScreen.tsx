/**
 * This component is the navigation flow for an authenicated user (logged in)
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "@shopify/restyle";

import BannedUsersPage, {
  BannedUsersPageOptions,
} from "../components/communities/BannedUsersPage";
import CommunityAdministrationPage, {
  CommunityAdministrationPageOptions,
} from "../components/communities/CommunityAdministrationPage";
import MemberListPage, {
  MemberListPageOptions,
} from "../components/communities/MemberListPage";
import JoinCommunityPage, {
  JoinCommunityPageOptions,
} from "../components/communities/JoinCommunityPage";
import LeaveCommunityPage, {
  LeaveCommunityPageOptions,
} from "../components/communities/LeaveCommunityPage";
import { ThemedIcon } from "../components/themed";
import CommunityHomePage, {
  CommunityHomePageOptions,
} from "../components/communities/CommunityHomePage";
import { Theme } from "../theme";

import CommunityTabScreen from "./CommunityTabScreen";

const CommunityStack = createStackNavigator();

const CommunityStackScreen = (
  { navigation }: any // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  const theme = useTheme<Theme>();
  return (
    <CommunityStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.headerBackground,
        },
        headerTintColor: theme.colors.primaryText,
      }}
    >
      <CommunityStack.Screen
        name="Communities"
        component={CommunityTabScreen}
        options={{
          headerLeft: () => {
            return (
              <ThemedIcon
                size={24}
                reverse
                name="menu"
                type="entypo"
                onPress={() => {
                  navigation.openDrawer();
                }}
                color={theme.colors.headerBackground}
                iconStyle={{ color: theme.colors.primaryText }}
              />
            );
          },
        }}
      />
      <CommunityStack.Screen
        name="CommunityHome"
        component={CommunityHomePage}
        options={CommunityHomePageOptions}
      />
      <CommunityStack.Screen
        name="BannedUsers"
        component={BannedUsersPage}
        options={BannedUsersPageOptions}
      />
      <CommunityStack.Screen
        name="CommunityAdministration"
        component={CommunityAdministrationPage}
        options={CommunityAdministrationPageOptions}
      />
      <CommunityStack.Screen
        name="MemberList"
        component={MemberListPage}
        options={MemberListPageOptions}
        initialParams={{ name: "Johnsons" }}
      />
      <CommunityStack.Screen
        name="JoinCommunity"
        component={JoinCommunityPage}
        options={JoinCommunityPageOptions}
      />
      <CommunityStack.Screen
        name="LeaveCommunity"
        component={LeaveCommunityPage}
        options={LeaveCommunityPageOptions}
      />
    </CommunityStack.Navigator>
  );
};

export default CommunityStackScreen;
