import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Add any parameters that are included with the page
type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
};

// Login Page Types

type LoginPageRouteProp = RouteProp<RootStackParamList, "Login">;

type LoginPageNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

export type LoginPageProps = {
  route: LoginPageRouteProp;
  navigation: LoginPageNavigationProp;
};

// Create Account Page Types
type CreateAccountPageRouteProp = RouteProp<
  RootStackParamList,
  "CreateAccount"
>;

type CreateAccountPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreateAccount"
>;

export type CreateAccountPageProps = {
  route: CreateAccountPageRouteProp;
  navigation: CreateAccountPageNavigationProp;
};
