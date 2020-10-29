import React from "react";
import { FlatList } from "react-native";

import { BLANK_MEETUP } from "../../models/meetups";
import { ThemedCard, Box } from "../themed";
import Text from "../themed/Text";

interface MeetupCardProps {
  id: string;
  timestamp: string;
  duration: string;
  location: string;
  userList: string[];
  key?: string;
}

const MeetupCard = ({
  id,
  timestamp,
  duration,
  location,
  userList,
  key,
}: MeetupCardProps) => {
  const renderParticipant = ({ item }: { item: string }) => (
    <Text variant="subheader">{item}</Text>
  );

  return (
    <ThemedCard>
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
      <Text variant="subheader">Started at {timestamp}</Text>
      <Text variant="subheader">Lasted {duration} minutes</Text>
      <Text variant="subheader">{location}</Text>
      <Text variant="header">Participants</Text>
      <FlatList
        data={userList}
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
};

export default MeetupCard;
