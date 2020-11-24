/**
 * This component is the navigation flow for an authenicated user (logged in)
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserTimePreferencePage, {
  UserTimePreferencePageOptions,
} from "../components/settings/UserTimePreferencePage";
import theme from "../theme";
import UserSettingsPage, {
  UserSettingsPageOptions,
} from "../components/settings/UserSettingsPage";
import UserBugReportPage, {
  UserBugReportPageOptions,
} from "../components/settings/UserBugReportPage";
import UserFeedbackPage, {
  UserFeedbackPageOptions,
} from "../components/settings/UserFeedbackPage";

import { DrawerIcon } from "./DrawerIcon";

const SettingsStack = createStackNavigator();

const SettingsStackScreen = ({}) => {
  return (
    <SettingsStack.Navigator
      initialRouteName="ViewProfile"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.headerBackground,
        },
        headerTintColor: theme.colors.primaryText,
      }}
    >
      <SettingsStack.Screen
        name="UserSettings"
        component={UserSettingsPage}
        options={{
          ...UserSettingsPageOptions,
          headerLeft: () => <DrawerIcon />,
        }}
      />
      <SettingsStack.Screen
        name="UserTimePreference"
        component={UserTimePreferencePage}
        options={UserTimePreferencePageOptions}
      />
      <SettingsStack.Screen
        name="UserBugReport"
        component={UserBugReportPage}
        options={UserBugReportPageOptions}
      />
      <SettingsStack.Screen
        name="UserFeedback"
        component={UserFeedbackPage}
        options={UserFeedbackPageOptions}
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackScreen;
