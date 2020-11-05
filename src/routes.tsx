import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Meetup } from "./models/meetups";

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
  MeetupList: undefined;
  MeetupDetails: {
    meetupID: string;
    timestamp: string;
    duration: string;
    location: string;
    userList: Record<string, number>;
  };
  MeetupResponse: {
    meetupID: string;
    timestamp: string;
    duration: string;
    location: string;
    userList: Record<string, number>;
  };
  MeetupRating: {
    meetupID: string;
    timestamp: string;
    duration: string;
    location: string;
    userList: Record<string, number>;
  };
  PreviousMeetups: { pastMeetups: Meetup[] };
  LocationRanker: {
    locations: string[];
    setLocations: (locations: string[]) => void;
  };
  UserTimePreference: undefined;
  Home: {
    futureMeetupIDs: string[];
    tentativeMeetupIDs: string[];
  };
  CommunityHome: {
    communityID: string;
  };
  Feedback: undefined;
  BugReport: undefined;
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

// Meetup List Page Types
export type MeetupListPageRouteProp = RouteProp<
  RootStackParamList,
  "MeetupList"
>;

export type MeetupListPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MeetupList"
>;

// Meetup Details Page Types
export type MeetupDetailsPageRouteProp = RouteProp<
  RootStackParamList,
  "MeetupDetails"
>;

export type MeetupDetailsPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UserSettings"
>;

// Meetup Response Page Types
export type MeetupResponsePageRouteProp = RouteProp<
  RootStackParamList,
  "MeetupResponse"
>;

export type MeetupResponsePageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MeetupResponse"
>;

// Meetup Rating Page Types
export type MeetupRatingPageRouteProp = RouteProp<
  RootStackParamList,
  "MeetupRating"
>;

export type MeetupRatingPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MeetupRating"
>;

// Location Ranker Page Types
export type LocationRankerPageRouteProp = RouteProp<
  RootStackParamList,
  "LocationRanker"
>;

export type LocationRankerPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LocationRanker"
>;

// Previous Meetup Page Types
export type PreviousMeetupsPageRouteProp = RouteProp<
  RootStackParamList,
  "PreviousMeetups"
>;

export type PreviousMeetupsPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PreviousMeetups"
>;

// User Time Preferences Page Types
export type UserTimePreferencePageRouteProp = RouteProp<
  RootStackParamList,
  "UserTimePreference"
>;

export type UserTimePreferencePageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UserTimePreference"
>;

// Home Page Types
export type HomePageRouteProp = RouteProp<RootStackParamList, "Home">;

export type HomePageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

// Community Home Page Types
export type CommunityHomePageRouteProp = RouteProp<
  RootStackParamList,
  "CommunityHome"
>;

export type CommunityHomePageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CommunityHome"
>;

// Feedback Page Types
export type FeedbackPageRouteProp = RouteProp<
  RootStackParamList,
  "Feedback"
>;

export type FeedbackPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Feedback"
>;
// Bug Report Page Types
export type BugReportPageRouteProp = RouteProp<
  RootStackParamList,
  "BugReport"
>;

export type BugReportPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BugReport"
>;
