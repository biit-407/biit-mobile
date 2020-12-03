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
import PreviousMeetupsPage, {
  PreviousMeetupsPageOptions,
} from "../components/meetups/PreviousMeetupsPage";
import PreviousUsersPage, {
  PreviousUsersPageOptions,
} from "../components/meetups/PreviousUsersPage";
import PreviousProfilePage, {
  PreviousProfilePageOptions,
} from "../components/meetups/PreviousProfilePage";

import { DrawerIcon } from "./DrawerIcon";
import { NotificationCenterIcon } from "./NotificationCenterIcon";

const AccountStack = createStackNavigator();

const AccountStackScreen = ({}) => {
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
          headerLeft: () => <DrawerIcon />,
        }}
      />
      <AccountStack.Screen
        name="ViewProfile"
        component={ViewProfilePage}
        options={{
          ...ViewProfilePageOptions,
          headerLeft: () => <DrawerIcon />,
          headerRight: () => <NotificationCenterIcon />,
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
        options={{
          ...PreviousMeetupsPageOptions,
          headerRight: () => <NotificationCenterIcon />,
        }}
      />
      <AccountStack.Screen
        name="PreviousUsers"
        component={PreviousUsersPage}
        options={{
          ...PreviousUsersPageOptions,
          headerRight: () => <NotificationCenterIcon />,
        }}
      />
      <AccountStack.Screen
        name="PreviousProfile"
        component={PreviousProfilePage}
        options={{
          ...PreviousProfilePageOptions,
          headerRight: () => <NotificationCenterIcon />,
        }}
      />
    </AccountStack.Navigator>
  );
};

export default AccountStackScreen;
