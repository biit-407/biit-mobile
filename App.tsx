import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import { LoadAssets } from "./src/components";
import LoginPage from "./src/components/authentication/LoginPage";
import CreateAccountPage from "./src/components/authentication/CreateAccountPage";

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
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccountPage}
          options={{ title: "", headerTransparent: true }}
        />
      </Stack.Navigator>
    </LoadAssets>
  );
}
