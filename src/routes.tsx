import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Add any parameters that are included with the page
type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  CreateProfile: undefined;
  ViewProfile: undefined;
  EditProfile: undefined;
  BannedUsers: { name: string };
  CreateCommunity: undefined;
  JoinCommunity: { name: string };
  LeaveCommunity: { name: string };
  CommunityAdministration: { name: string };
  UserSettings: undefined;
  MemberList: { name: string };
  DevelopmentLinks: undefined;
  CodeOfConduct: { name: string };
  MeetupDetails: { meetingID: string };
  MeetupResponse: undefined;
  LocationRanker: {
    locations: string[];
    setLocations: (locations: string[]) => void;
  };
};

//TODO remove for release
// Development Links Page Types
export type DevelopmentLinksPageRouteProp = RouteProp<
  RootStackParamList,
  "DevelopmentLinks"
>;

export type DevelopmentLinksPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DevelopmentLinks"
>;

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

// Create Community Page Types
export type CreateCommunityPageRouteProp = RouteProp<
  RootStackParamList,
  "CreateCommunity"
>;

export type CreateCommunityPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreateCommunity"
>;

// Join Community Page Types
export type JoinCommunityPageRouteProp = RouteProp<
  RootStackParamList,
  "JoinCommunity"
>;

export type JoinCommunityPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "JoinCommunity"
>;

// Leave Community Page Types
export type LeaveCommunityPageRouteProp = RouteProp<
  RootStackParamList,
  "LeaveCommunity"
>;

export type LeaveCommunityPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LeaveCommunity"
>;

// Member List Page Types
export type MemberListPageRouteProp = RouteProp<
  RootStackParamList,
  "MemberList"
>;

export type MemberListPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MemberList"
>;

// Code of Conduct Page Types
export type CodeOfConductPageRouteProp = RouteProp<
  RootStackParamList,
  "CodeOfConduct"
>;

export type CodeOfConductPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CodeOfConduct"
>;

// Community Administration Page Types
export type CommunityAdministrationPageRouteProp = RouteProp<
  RootStackParamList,
  "CommunityAdministration"
>;

export type CommunityAdministrationPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CommunityAdministration"
>;

// User Settings Page Types
export type UserSettingsPageRouteProp = RouteProp<
  RootStackParamList,
  "UserSettings"
>;

export type UserSettingsPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UserSettings"
>;

// Meetup Details Page Types
export type MeetupDetailsPageRouteProp = RouteProp<
  RootStackParamList,
  "MeetupDetails"
>;

export type MeetupDetailsPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UserSettings"
// Meetup Response Page Types
export type MeetupResponsePageRouteProp = RouteProp<
  RootStackParamList,
  "MeetupResponse"
>;

export type MeetupResponsePageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MeetupResponse"
>;

export type LocationRankerPageRouteProp = RouteProp<
  RootStackParamList,
  "LocationRanker"
>;

export type LocationRankerPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LocationRanker"
>;
