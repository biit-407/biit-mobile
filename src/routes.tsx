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
    community: string;
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
    zoomLink?: string;
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
  PreviousProfile: { previousUser: PreviousUser };
};

export type CommunityRoutes = {
  BannedUsers: { name: string };
  CreateCommunity: undefined;
  JoinCommunity: { name: string; codeOfConduct: string; numMembers: number };
  LeaveCommunity: { name: string; numMembers: number };
  CommunityAdministration: { name: string };
  MemberList: { name: string };
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
