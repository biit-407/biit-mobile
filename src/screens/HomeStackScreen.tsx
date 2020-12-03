/**
 * This component is the navigation flow for an authenicated user (logged in)
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import theme from "../theme";
import MeetupResponsePage, {
  MeetupResponsePageOptions,
} from "../components/meetups/MeetupResponsePage";
import MeetupDetailsPage, {
  MeetupDetailsPageOptions,
} from "../components/meetups/MeetupDetailsPage";
import MeetupListPage, {
  MeetupListPageOptions,
} from "../components/meetups/MeetupListPage";
import MeetupRatingPage, {
  MeetupRatingPageOptions,
} from "../components/meetups/MeetupRatingPage";
import LocationRankerPage, {
  LocationRankerPageOptions,
} from "../components/meetups/LocationRankerPage";

import { DrawerIcon } from "./DrawerIcon";
import { NotificationCenterIcon } from "./NotificationCenterIcon";

const HomeStack = createStackNavigator();

// const HomeStackScreen = (
//   { navigation }: any // eslint-disable-line @typescript-eslint/no-explicit-any
// ) => {
const HomeStackScreen = ({}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.headerBackground,
        },
        headerTintColor: theme.colors.primaryText,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={MeetupListPage}
        options={{
          ...MeetupListPageOptions,
          headerLeft: () => <DrawerIcon />,
          headerRight: () => <NotificationCenterIcon />,
        }}
        initialParams={{
          futureMeetupIDs: ["test"],
          tentativeMeetupIDs: ["temp"],
        }}
      />

      <HomeStack.Screen
        name="MeetupResponse"
        component={MeetupResponsePage}
        options={{
          ...MeetupResponsePageOptions,
          headerRight: () => <NotificationCenterIcon />,
        }}
      />

      <HomeStack.Screen
        name="MeetupDetails"
        component={MeetupDetailsPage}
        options={{
          ...MeetupDetailsPageOptions,
          headerRight: () => <NotificationCenterIcon />,
        }}
      />

      <HomeStack.Screen
        name="MeetupRating"
        component={MeetupRatingPage}
        options={{
          ...MeetupRatingPageOptions,
          headerRight: () => <NotificationCenterIcon />,
        }}
      />

      <HomeStack.Screen
        name="LocationRanker"
        component={LocationRankerPage}
        options={{
          ...LocationRankerPageOptions,
          headerRight: () => <NotificationCenterIcon />,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
