import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { PreviousUser } from "./models/accounts";
import { Meetup } from "./models/meetups";

export type AuthRoutes = {
  Login: undefined;
  CreateAccount: undefined;
};

export type HomeRoutes = {
  MeetupList: undefined;
  MeetupRating: {
    meetupID: string;
    timestamp: string;
    duration: string;
    location: string;
    userList: Record<string, number>;
  };
  LocationRanker: {
    locations: string[];
    setLocations: (locations: string[]) => void;
  };
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
};

export type AccountRoutes = {
  CreateProfile: undefined;
  ViewProfile: undefined;
  EditProfile: undefined;
  PreviousMeetups: { pastMeetups: Meetup[] };
  PreviousUsers: undefined;
};

export type CommunityRoutes = {
  BannedUsers: { name: string };
  CreateCommunity: undefined;
  JoinCommunity: { name: string; codeOfConduct: string; numMembers: number };
  LeaveCommunity: { name: string; numMembers: number };
  CommunityAdministration: { name: string };
  MemberList: { name: string };
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
  CommunityStats: {
    communityID: string;
  };
};

export type SettingsRoutes = {
  UserSettings: undefined;
  UserTimePreference: undefined;
  UserFeedback: undefined;
  UserBugReport: undefined;
};

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

// Login Page Types
export type LoginPageRouteProp = RouteProp<AuthRoutes, "Login">;

export type LoginPageNavigationProp = StackNavigationProp<AuthRoutes, "Login">;

// Create Account Page Types
export type CreateAccountPageRouteProp = RouteProp<AuthRoutes, "CreateAccount">;

export type CreateAccountPageNavigationProp = StackNavigationProp<
  AuthRoutes,
  "CreateAccount"
>;

// Create Profile Page Types
export type CreateProfilePageRouteProp = RouteProp<
  AccountRoutes,
  "CreateProfile"
>;

export type CreateProfilePageNavigationProp = StackNavigationProp<
  AccountRoutes,
  "CreateProfile"
>;

// View Profile Page Types
export type ViewProfilePageRouteProp = RouteProp<AccountRoutes, "ViewProfile">;

export type ViewProfilePageNavigationProp = StackNavigationProp<
  AccountRoutes,
  "ViewProfile"
>;

// View Profile Page Types
export type EditProfilePageRouteProp = RouteProp<AccountRoutes, "EditProfile">;

export type EditProfilePageNavigationProp = StackNavigationProp<
  AccountRoutes,
  "EditProfile"
>;

// Banned Users Page Types
export type BannedUsersPageRouteProp = RouteProp<
  CommunityRoutes,
  "BannedUsers"
>;

export type BannedUsersPageNavigationProp = StackNavigationProp<
  CommunityRoutes,
  "BannedUsers"
>;

// Create Community Page Types
export type CreateCommunityPageRouteProp = RouteProp<
  CommunityRoutes,
  "CreateCommunity"
>;

export type CreateCommunityPageNavigationProp = StackNavigationProp<
  CommunityRoutes,
  "CreateCommunity"
>;

// Join Community Page Types
export type JoinCommunityPageRouteProp = RouteProp<
  CommunityRoutes,
  "JoinCommunity"
>;

export type JoinCommunityPageNavigationProp = StackNavigationProp<
  CommunityRoutes,
  "JoinCommunity"
>;

// Leave Community Page Types
export type LeaveCommunityPageRouteProp = RouteProp<
  CommunityRoutes,
  "LeaveCommunity"
>;

export type LeaveCommunityPageNavigationProp = StackNavigationProp<
  CommunityRoutes,
  "LeaveCommunity"
>;

// Member List Page Types
export type MemberListPageRouteProp = RouteProp<CommunityRoutes, "MemberList">;

export type MemberListPageNavigationProp = StackNavigationProp<
  CommunityRoutes,
  "MemberList"
>;

// Community Administration Page Types
export type CommunityAdministrationPageRouteProp = RouteProp<
  CommunityRoutes,
  "CommunityAdministration"
>;

export type CommunityAdministrationPageNavigationProp = StackNavigationProp<
  CommunityRoutes,
  "CommunityAdministration"
>;

// User Settings Page Types
export type UserSettingsPageRouteProp = RouteProp<
  SettingsRoutes,
  "UserSettings"
>;

export type UserSettingsPageNavigationProp = StackNavigationProp<
  SettingsRoutes,
  "UserSettings"
>;

// Meetup List Page Types
export type MeetupListPageRouteProp = RouteProp<HomeRoutes, "MeetupList">;

export type MeetupListPageNavigationProp = StackNavigationProp<
  HomeRoutes,
  "MeetupList"
>;

// Meetup Details Page Types
export type MeetupDetailsPageRouteProp = RouteProp<HomeRoutes, "MeetupDetails">;

export type MeetupDetailsPageNavigationProp = StackNavigationProp<
  SettingsRoutes,
  "UserSettings"
>;

// Meetup Response Page Types
export type MeetupResponsePageRouteProp = RouteProp<
  HomeRoutes,
  "MeetupResponse"
>;

export type MeetupResponsePageNavigationProp = StackNavigationProp<
  HomeRoutes,
  "MeetupResponse"
>;

// Meetup Rating Page Types
export type MeetupRatingPageRouteProp = RouteProp<HomeRoutes, "MeetupRating">;

export type MeetupRatingPageNavigationProp = StackNavigationProp<
  HomeRoutes,
  "MeetupRating"
>;

// Location Ranker Page Types
export type LocationRankerPageRouteProp = RouteProp<
  HomeRoutes,
  "LocationRanker"
>;

export type LocationRankerPageNavigationProp = StackNavigationProp<
  HomeRoutes,
  "LocationRanker"
>;

// Previous Meetup Page Types
export type PreviousMeetupsPageRouteProp = RouteProp<
  AccountRoutes,
  "PreviousMeetups"
>;

export type PreviousMeetupsPageNavigationProp = StackNavigationProp<
  AccountRoutes,
  "PreviousMeetups"
>;

// Previous People Page Types
export type PreviousUsersPageRouteProp = RouteProp<
  CommunityRoutes,
  "PreviousUsers"
>;

export type PreviousUsersPageNavigationProp = StackNavigationProp<
  CommunityRoutes,
  "PreviousUsers"
>;

// Previous Profile Page Types
export type PreviousProfilePageRouteProp = RouteProp<
  CommunityRoutes,
  "PreviousProfile"
>;

export type PreviousProfilePageNavigationProp = StackNavigationProp<
  CommunityRoutes,
  "PreviousProfile"
>;

// User Time Preferences Page Types
export type UserTimePreferencePageRouteProp = RouteProp<
  CommunityRoutes,
  "UserTimePreference"
>;

export type UserTimePreferencePageNavigationProp = StackNavigationProp<
  CommunityRoutes,
  "UserTimePreference"
>;

// Home Page Types
export type HomePageRouteProp = RouteProp<CommunityRoutes, "Home">;

export type HomePageNavigationProp = StackNavigationProp<
  CommunityRoutes,
  "Home"
>;

// Community Home Page Types
export type CommunityHomePageRouteProp = RouteProp<
  CommunityRoutes,
  "CommunityHome"
>;

export type CommunityHomePageNavigationProp = StackNavigationProp<
  CommunityRoutes,
  "CommunityHome"
>;

// Feedback Page Types
export type FeedbackPageRouteProp = RouteProp<SettingsRoutes, "UserFeedback">;

export type FeedbackPageNavigationProp = StackNavigationProp<
  SettingsRoutes,
  "UserFeedback"
>;
// Bug Report Page Types
export type BugReportPageRouteProp = RouteProp<SettingsRoutes, "UserBugReport">;

export type BugReportPageNavigationProp = StackNavigationProp<
  SettingsRoutes,
  "UserBugReport"
>;

// Community List Page Types
export type CommunityListPageRouteProp = RouteProp<
  CommunityRoutes,
  "CommunityList"
>;

export type CommunityListPageNavigationProp = StackNavigationProp<
  CommunityRoutes,
  "CommunityList"
>;

export type CommunityStatsPageRouteProp = RouteProp<
  CommunityRoutes,
  "CommunityStats"
>;

export type CommunityStatsPageNavigationProp = StackNavigationProp<
  CommunityRoutes,
  "CommunityStats"
>;

// Community List Page Types
export type CommunitySearchPageRouteProp = RouteProp<
  CommunityRoutes,
  "CommunitySearch"
>;

export type CommunitySearchPageNavigationProp = StackNavigationProp<
  CommunityRoutes,
  "CommunitySearch"
>;
