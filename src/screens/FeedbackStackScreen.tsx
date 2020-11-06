/**
 * This component is the navigation flow for an unauthenicated user (not logged in)
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemedIcon } from "../components/themed";
import theme from "../theme";

import FeedbackPage, { FeedbackPageOptions } from "../components/userUtils/FeedbackPage";

const FeedbackStack = createStackNavigator();

const FeedbackStackScreen = (
  {navigation}: any,
) => {
  return (
    <FeedbackStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.headerBackground,
        },
        headerTintColor: theme.colors.primaryText,
      }}
    >
      <FeedbackStack.Screen
        name="Feedback"
        component={FeedbackPage}
        options={{
          ...FeedbackPageOptions,
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
    </FeedbackStack.Navigator>
  );
};

export default FeedbackStackScreen;
