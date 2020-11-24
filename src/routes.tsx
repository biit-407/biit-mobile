import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Meetup } from "./models/meetups";

// Add any parameters that are included with the page
type RootStackParamList = {
  BannedUsers: { name: string };
  CreateCommunity: undefined;
  JoinCommunity: { name: string; codeOfConduct: string; numMembers: number };
  LeaveCommunity: { name: string; numMembers: number };
  CommunityAdministration: { name: string };
  MemberList: { name: string };
  DevelopmentLinks: undefined;

  CommunityList: undefined;
  CommunityHome: {
    communityID: string;
  };
  CommunitySearch: undefined;
};

export type AuthRoutes = {
  Login: undefined;
  CreateAccount: undefined;
};

export type AccountRoutes = {
  CreateProfile: undefined;
  ViewProfile: undefined;
  EditProfile: undefined;
  PreviousMeetups: { pastMeetups: Meetup[] };
};

export type HomeRoutes = {
  Home: {
    futureMeetupIDs: string[];
    tentativeMeetupIDs: string[];
  };
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

// Community Home Page Types
export type CommunityHomePageRouteProp = RouteProp<
  RootStackParamList,
  "CommunityHome"
>;

export type CommunityHomePageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CommunityHome"
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

// Community List Page Types
export type CommunitySearchPageRouteProp = RouteProp<
  RootStackParamList,
  "CommunitySearch"
>;

export type CommunitySearchPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CommunitySearch"
>;
