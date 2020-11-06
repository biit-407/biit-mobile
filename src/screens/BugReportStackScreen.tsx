/**
 * This component is the navigation flow for an unauthenicated user (not logged in)
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ThemedIcon } from "../components/themed";
import theme from "../theme";
import BugReportPage, {
  BugReportPageOptions,
} from "../components/userUtils/BugReportPage";

const BugReportStack = createStackNavigator();

const BugReportStackScreen = (
  { navigation }: any // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  return (
    <BugReportStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.headerBackground,
        },
        headerTintColor: theme.colors.primaryText,
      }}
    >
      <BugReportStack.Screen
        name="BugReport"
        component={BugReportPage}
        options={{
          ...BugReportPageOptions,
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
    </BugReportStack.Navigator>
  );
};

export default BugReportStackScreen;
