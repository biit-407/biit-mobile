import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import { LoadAssets } from "./src/components";
import LoginPage, {
  LoginPageOptions,
} from "./src/components/authentication/LoginPage";
import CreateAccountPage, {
  CreateAccountPageOptions,
} from "./src/components/authentication/CreateAccountPage";
import CreateProfilePage, {
  CreateProfilePageOptions,
} from "./src/components/authentication/CreateProfilePage";

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <LoadAssets {...{ fonts }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={LoginPageOptions}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccountPage}
          options={CreateAccountPageOptions}
        />
        <Stack.Screen
          name="CreateProfile"
          component={CreateProfilePage}
          options={CreateProfilePageOptions}
        />
      </Stack.Navigator>
    </LoadAssets>
  );
}
