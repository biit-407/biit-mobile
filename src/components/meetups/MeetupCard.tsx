import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Linking } from "react-native";

import { BLANK_MEETUP, MeetupType } from "../../models/meetups";
import {
  getDayAsString,
  getShortMonthName,
  getTimeAsString,
} from "../../utils/timeUtils";
import { ThemedCard, Box } from "../themed";
import Text from "../themed/Text";

interface MeetupCardProps {
  id: string;
  timestamp: string;
  duration: string;
  location?: string;
  userList: Record<string, number>;
  meetupType: MeetupType;
  isClickable?: boolean;
  onPress?: () => void;
  zoomLink?: string;
  key?: string;
}

function epochToJsDate(ts: number) {
  // ts = epoch timestamp
  // returns date obj
  return new Date(ts * 1000);
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
  zoomLink,
  onPress,
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
          onPress={onPress}
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
          zoomLink={zoomLink}
          onPress={onPress}
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
  onPress,
}: MeetupCardProps) => {
  const navigation = useNavigation();
  const acceptedUsers = [];
  for (const [email, value] of Object.entries(userList)) {
    if (value === 1) {
      acceptedUsers.push(email);
    }
  }
  const date = epochToJsDate(parseInt(timestamp, 10));
  return (
    <ThemedCard
      onPressFunction={
        isClickable
          ? () => {
              if (onPress) {
                onPress();
              } else {
                navigation.navigate("MeetupResponse", {
                  meetupID: id,
                  timestamp: timestamp,
                  duration: duration,
                  location: location,
                  userList: userList,
                });
              }
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
          {id.substring(0, 8)}
        </Text>
      </Box>
      <Text variant="subheader">
        Starts on {getShortMonthName(date)} {getDayAsString(date)} at{" "}
        {getTimeAsString(date)}
      </Text>
      <Text variant="subheader">Lasts {duration} minutes</Text>
      <Text variant="subheader">{location}</Text>
      <Text variant="header">Participants</Text>
      <FlatList
        data={acceptedUsers}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={renderParticipant}
        listKey={key}
        ListEmptyComponent={
          <Text variant="body">No users have accepted yet</Text>
        }
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
  onPress,
  zoomLink,
}: MeetupCardProps) => {
  const navigation = useNavigation();
  const acceptedUsers = [];
  for (const [email, value] of Object.entries(userList)) {
    if (value === 1) {
      acceptedUsers.push(email);
    }
  }
  const date = epochToJsDate(parseInt(timestamp, 10));

  return (
    <ThemedCard
      onPressFunction={
        isClickable
          ? () => {
              if (onPress) {
                onPress();
              } else {
                navigation.navigate("MeetupResponse", {
                  meetupID: id,
                  timestamp: timestamp,
                  duration: duration,
                  location: location,
                  userList: userList,
                });
              }
            }
          : undefined
      }
    >
      <Box
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 8,
        }}
      >
        <Text variant="header" style={{ flex: 1 }}>
          Meetup
        </Text>
        <Text
          variant="subheader"
          style={{
            flex: 1,
            textAlign: "right",
            paddingRight: 8,
            paddingTop: 6,
          }}
        >
          {id.substring(0, 8)}
        </Text>
      </Box>
      <Text variant="subheader">
        Starts on {getShortMonthName(date)} {getDayAsString(date)} at{" "}
        {getTimeAsString(date)}
      </Text>
      <Text variant="subheader">Lasts {duration} minutes</Text>
      <Text variant="subheader">{location}</Text>
      {location === "Online" && zoomLink && (
        <Text onPress={() => Linking.openURL(zoomLink)}>{zoomLink}</Text>
      )}
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
  userList: BLANK_MEETUP.user_list,
  meetupType: "accepted",
  isClickable: true,
};

export default MeetupCard;
