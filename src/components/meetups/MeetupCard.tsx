import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList } from "react-native";

import { BLANK_MEETUP, MeetupType } from "../../models/meetups";
import { getDayAsString, getShortMonthName, getTimeAsString } from "../../utils/timeUtils";
import { ThemedCard, Box } from "../themed";
import Text from "../themed/Text";

interface MeetupCardProps {
  id: string;
  timestamp: string;
  duration: string;
  location: string;
  userList: Record<string, number>;
  meetupType: MeetupType;
  isClickable?: boolean;
  key?: string;
}

function epochToJsDate(ts: number) {
  // ts = epoch timestamp
  // returns date obj
  return new Date(ts * 1000);
}

function properDateString(date: Date) {
  return date.getMonth().toLocaleString()
}

const renderParticipant = ({ item }: { item: string }) => (
  <Text variant="subheader">{item}</Text>
);

const MeetupCard = ({
  id,
  timestamp,
  duration,
  location,
  userList,
  meetupType,
  isClickable,
}: // key,
  MeetupCardProps) => {
  return (
    <>
      {meetupType === "tentative" ? (
        <TentativeMeetupCard
          id={id}
          timestamp={timestamp}
          duration={duration}
          location={location}
          userList={userList}
          meetupType={meetupType}
          isClickable={isClickable}
        // key={key}
        />
      ) : (
          <AcceptedMeetupCard
            id={id}
            timestamp={timestamp}
            duration={duration}
            location={location}
            userList={userList}
            meetupType={meetupType}
            isClickable={isClickable}
          // key={key}
          />
        )}
    </>
  );
};

const TentativeMeetupCard = ({
  id,
  timestamp,
  duration,
  location,
  userList,
  isClickable,
  key,
}: MeetupCardProps) => {
  const navigation = useNavigation();
  const acceptedUsers = [];
  for (const [email, value] of Object.entries(userList)) {
    if (value === 1) {
      acceptedUsers.push(email);
    }
  }
  const date = epochToJsDate(parseInt(timestamp))

  return (
    <ThemedCard
      onPressFunction={
        isClickable
          ? () => {
            navigation.navigate("MeetupResponse", {
              meetupID: id,
              timestamp: timestamp,
              duration: duration,
              location: location,
              userList: userList,
            });
          }
          : undefined
      }
    >
      <Box style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text variant="header" style={{ flex: 1 }}>
          Meetup
        </Text>
        <Text
          variant="subheader"
          style={{ flex: 1, textAlign: "right", paddingRight: 8 }}
        >
          {id}
        </Text>
      </Box>
      <Text variant="subheader">Starts on {getShortMonthName(date)} {getDayAsString(date)} at {getTimeAsString(date)}</Text>
      <Text variant="subheader">Lasts {duration} minutes</Text>
      <Text variant="subheader">{location}</Text>
      <Text variant="header">Participants</Text>
      <FlatList
        data={acceptedUsers}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={renderParticipant}
        listKey={key}
      />
    </ThemedCard>
  );
};

const AcceptedMeetupCard = ({
  id,
  timestamp,
  duration,
  location,
  userList,
  isClickable,
  key,
}: MeetupCardProps) => {
  const navigation = useNavigation();
  const acceptedUsers = [];
  for (const [email, value] of Object.entries(userList)) {
    if (value === 1) {
      acceptedUsers.push(email);
    }
  }
  const date = epochToJsDate(parseInt(timestamp))

  return (
    <ThemedCard
      onPressFunction={
        isClickable
          ? () => {
            navigation.navigate("MeetupDetails", {
              meetupID: id,
              timestamp: timestamp,
              duration: duration,
              location: location,
              userList: userList,
            });
          }
          : undefined
      }
    >
      <Box style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: 8 }}>
        <Text variant="header" style={{ flex: 1 }}>
          Meetup
        </Text>
        <Text
          variant="subheader"
          style={{ flex: 1, textAlign: "right", paddingRight: 8, paddingTop: 6 }}
        >
          {id.substring(0, 16)}
        </Text>
      </Box>
      <Text variant="subheader">Starts on {getShortMonthName(date)} {getDayAsString(date)} at {getTimeAsString(date)}</Text>
      <Text variant="subheader">Lasts {duration} minutes</Text>
      <Text variant="subheader">{location}</Text>
      <Text variant="header">Participants</Text>
      <FlatList
        data={acceptedUsers}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={renderParticipant}
        listKey={key}
      />
    </ThemedCard>
  );
};

MeetupCard.defaultProps = {
  id: BLANK_MEETUP.id,
  timestamp: BLANK_MEETUP.timestamp,
  duration: BLANK_MEETUP.duration,
  location: BLANK_MEETUP.location,
  userList: BLANK_MEETUP.user_list,
  meetupType: "accepted",
  isClickable: true,
};

export default MeetupCard;
