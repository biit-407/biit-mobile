import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Meetup } from "./models/meetups";

// Add any parameters that are included with the page
type RootStackParamList = {
  ViewProfile: undefined;
  EditProfile: undefined;
  BannedUsers: { name: string };
  CreateCommunity: undefined;
  JoinCommunity: { name: string; codeOfConduct: string; numMembers: number };
  LeaveCommunity: { name: string; numMembers: number };
  CommunityAdministration: { name: string };
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
  LocationRanker: {
    locations: string[];
    setLocations: (locations: string[]) => void;
  };
  Home: {
    futureMeetupIDs: string[];
    tentativeMeetupIDs: string[];
  };
  CommunityList: undefined;
  CommunityHome: {
    communityID: string;
  };
  CommunitySearch: undefined;
};

export type AuthRoutes = {
  Login: undefined;
  CreateAccount: undefined;
  CreateProfile: undefined;
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
  "MeetupDetails"
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
