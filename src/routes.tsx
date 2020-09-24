import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Add any parameters that are included with the page
type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  CreateProfile: undefined;
};

// Login Page Types
export type LoginPageRouteProp = RouteProp<RootStackParamList, "Login">;

export type LoginPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

// Create Account Page Types
export type CreateAccountPageRouteProp = RouteProp<
  RootStackParamList,
  "CreateAccount"
>;

export type CreateAccountPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreateAccount"
>;

// Create Profile Page Types
export type CreateProfilePageRouteProp = RouteProp<
  RootStackParamList,
  "CreateAccount"
>;

export type CreateProfilePageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreateAccount"
>;
