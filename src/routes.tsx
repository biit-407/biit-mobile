import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { PreviousUser } from "./models/accounts";
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
  JoinCommunity: { name: string; codeOfConduct: string; numMembers: number };
  LeaveCommunity: { name: string; numMembers: number };
  CommunityAdministration: { name: string };
  UserSettings: undefined;
  MemberList: { name: string };
  DevelopmentLinks: undefined;
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
  PreviousUsers: undefined;
  PreviousProfile: { previousUser: PreviousUser };
  LocationRanker: {
    locations: string[];
    setLocations: (locations: string[]) => void;
  };
  UserTimePreference: undefined;
  Home: {
    futureMeetupIDs: string[];
    tentativeMeetupIDs: string[];
  };
  CommunityList: undefined;
  CommunityHome: {
    communityID: string;
  };
  CommunitySearch: undefined;
  Feedback: undefined;
  BugReport: undefined;
  CommunityStats: {
    communityID: string;
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

// Previous People Page Types
export type PreviousUsersPageRouteProp = RouteProp<
  RootStackParamList,
  "PreviousUsers"
>;

export type PreviousUsersPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PreviousUsers"
>;

// Previous Profile Page Types
export type PreviousProfilePageRouteProp = RouteProp<
  RootStackParamList,
  "PreviousProfile"
>;

export type PreviousProfilePageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PreviousProfile"
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
export type FeedbackPageRouteProp = RouteProp<RootStackParamList, "Feedback">;

export type FeedbackPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Feedback"
>;
// Bug Report Page Types
export type BugReportPageRouteProp = RouteProp<RootStackParamList, "BugReport">;

export type BugReportPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BugReport"
>;

// Community List Page Types
export type CommunityListPageRouteProp = RouteProp<
  RootStackParamList,
  "CommunityList"
>;

export type CommunityListPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CommunityList"
>;


export type CommunityStatsPageRouteProp = RouteProp<
  RootStackParamList,
  "CommunityStats"
>;

export type CommunityStatsPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CommunityStats"

// Community List Page Types
export type CommunitySearchPageRouteProp = RouteProp<
  RootStackParamList,
  "CommunitySearch"
>;

export type CommunitySearchPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CommunitySearch"

>;
