import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { LoadAssets } from "./src/components";
import LoginPage from "./src/components/authentication/LoginPage";

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <LoadAssets {...{ fonts }}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={LoginPage} />
      </Stack.Navigator>
    </LoadAssets>
  );
}
