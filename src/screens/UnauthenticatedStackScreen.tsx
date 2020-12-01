/**
 * This component is the navigation flow for an unauthenicated user (not logged in)
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginPage, {
  LoginPageOptions,
} from "../components/authentication/LoginPage";
import CreateAccountPage, {
  CreateAccountPageOptions,
} from "../components/authentication/CreateAccountPage";
import CreateProfilePage, {
  CreateProfilePageOptions,
} from "../components/authentication/CreateProfilePage";

const UnauthenticatedStack = createStackNavigator();

const UnauthenticatedStackScreen = () => {
  return (
    <UnauthenticatedStack.Navigator>
      <UnauthenticatedStack.Screen
        name="Login"
        component={LoginPage}
        options={LoginPageOptions}
      />
      <UnauthenticatedStack.Screen
        name="CreateAccount"
        component={CreateAccountPage}
        options={CreateAccountPageOptions}
      />
      <UnauthenticatedStack.Screen
        name="CreateProfile"
        component={CreateProfilePage}
        options={CreateProfilePageOptions}
      />
    </UnauthenticatedStack.Navigator>
  );
};

export default UnauthenticatedStackScreen;
