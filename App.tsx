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
import ViewProfilePage, {
  ViewProfilePageOptions,
} from "./src/components/authentication/ViewProfilePage";
import EditProfilePage, {
  EditProfilePageOptions,
} from "./src/components/authentication/EditProfilePage";
import theme from "./src/theme";
import BannedUsersPage, {
  BannedUsersPageOptions,
} from "./src/components/communities/BannedUsersPage";
import { TokenProvider } from "./src/components/tokenContext";

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <LoadAssets {...{ fonts }}>
      <TokenProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.headerBackground,
          },
          headerTintColor: theme.colors.primaryText,
        }}
      >
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
        <Stack.Screen
          name="ViewProfile"
          component={ViewProfilePage}
          options={ViewProfilePageOptions}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfilePage}
          options={EditProfilePageOptions}
        />
        <Stack.Screen
          name="BannedUsers"
          component={BannedUsersPage}
          options={BannedUsersPageOptions}
        />
      </Stack.Navigator>
      </TokenProvider>
        

    </LoadAssets>
  );
}
