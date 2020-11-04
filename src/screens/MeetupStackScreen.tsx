/**
 * This component is the navigation flow for an authenicated user (logged in)
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LocationRankerPage, {
  LocationRankerPageOptions,
} from "../components/meetups/LocationRankerPage";
import MeetupDetailsPage, {
  MeetupDetailsPageOptions,
} from "../components/meetups/MeetupDetailsPage";
import MeetupListPage, {
  MeetupListPageOptions,
} from "../components/meetups/MeetupListPage";
import MeetupRatingPage, {
  MeetupRatingPageOptions,
} from "../components/meetups/MeetupRatingPage";
import MeetupResponsePage, {
  MeetupResponsePageOptions,
} from "../components/meetups/MeetupResponsePage";
import PreviousMeetupsPage, {
  PreviousMeetupsPageOptions,
} from "../components/meetups/PreviousMeetupsPage";

const MeetupStack = createStackNavigator();

const MeetupStackScreen = () => {
  return (
    <MeetupStack.Navigator>
      <MeetupStack.Screen
        name="MeetupRating"
        component={MeetupRatingPage}
        options={MeetupRatingPageOptions}
      />

      <MeetupStack.Screen
        name="MeetupResponse"
        component={MeetupResponsePage}
        options={MeetupResponsePageOptions}
      />
      <MeetupStack.Screen
        name="MeetupDetails"
        component={MeetupDetailsPage}
        options={MeetupDetailsPageOptions}
      />
      <MeetupStack.Screen
        name="LocationRanker"
        component={LocationRankerPage}
        options={LocationRankerPageOptions}
      />
      <MeetupStack.Screen
        name="MeetupList"
        component={MeetupListPage}
        options={MeetupListPageOptions}
      />
      <MeetupStack.Screen
        name="PreviousMeetups"
        component={PreviousMeetupsPage}
        options={PreviousMeetupsPageOptions}
      />
    </MeetupStack.Navigator>
  );
};

export default MeetupStackScreen;
