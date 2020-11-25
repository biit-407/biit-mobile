/**
 * This component is the navigation flow for an authenicated user (logged in)
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CreateProfilePage, {
  CreateProfilePageOptions,
} from "../components/authentication/CreateProfilePage";
import EditProfilePage, {
  EditProfilePageOptions,
} from "../components/authentication/EditProfilePage";
import ViewProfilePage, {
  ViewProfilePageOptions,
} from "../components/authentication/ViewProfilePage";
import theme from "../theme";
import { ThemedIcon } from "../components/themed";
import PreviousMeetupsPage, {
  PreviousMeetupsPageOptions,
} from "../components/meetups/PreviousMeetupsPage";
import PreviousUsersPage, {
  PreviousUsersPageOptions,
} from "../components/meetups/PreviousUsersPage";
import PreviousProfilePage, {
  PreviousProfilePageOptions,
} from "../components/meetups/PreviousProfilePage";

const AccountStack = createStackNavigator();

const AccountStackScreen = (
  { navigation }: any // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  return (
    <AccountStack.Navigator
      initialRouteName="ViewProfile"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.headerBackground,
        },
        headerTintColor: theme.colors.primaryText,
      }}
    >
      <AccountStack.Screen
        name="CreateProfile"
        component={CreateProfilePage}
        options={{
          ...CreateProfilePageOptions,
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
      <AccountStack.Screen
        name="ViewProfile"
        component={ViewProfilePage}
        options={{
          ...ViewProfilePageOptions,
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
      <AccountStack.Screen
        name="EditProfile"
        component={EditProfilePage}
        options={{
          ...EditProfilePageOptions,
        }}
      />
      <AccountStack.Screen
        name="PreviousMeetups"
        component={PreviousMeetupsPage}
        options={PreviousMeetupsPageOptions}
      />
      <AccountStack.Screen
        name="PreviousUsers"
        component={PreviousUsersPage}
        options={PreviousUsersPageOptions}
      />
      <AccountStack.Screen
        name="PreviousProfile"
        component={PreviousProfilePage}
        options={PreviousProfilePageOptions}
      />
    </AccountStack.Navigator>
  );
};

export default AccountStackScreen;
