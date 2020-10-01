import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Add any parameters that are included with the page
type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  CreateProfile: undefined;
  ViewProfile: undefined;
  EditProfile: undefined;
  BannedUsers: undefined;
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

// View Profile Page Types
export type ViewProfilePageRouteProp = RouteProp<
  RootStackParamList,
  "ViewProfile"
>;

export type ViewProfilePageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ViewProfile"
>;

// View Profile Page Types
export type EditProfilePageRouteProp = RouteProp<
  RootStackParamList,
  "EditProfile"
>;

export type EditProfilePageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditProfile"
>;

// Banned Users Page Types
export type BannedUsersPageRouteProp = RouteProp<
  RootStackParamList,
  "BannedUsers"
>;

export type BannedUsersPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BannedUsers"
>;
