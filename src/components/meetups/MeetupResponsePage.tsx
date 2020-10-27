import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import {
  MeetupResponsePageRouteProp,
  MeetupResponsePageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedCard from "../themed/ThemedCard";
import ThemedIcon from "../themed/ThemedIcon";

type MeetupResponsePageProps = {
  route: MeetupResponsePageRouteProp;
  navigation: MeetupResponsePageNavigationProp;
};

export const MeetupResponsePageOptions: StackNavigationOptions = {
  title: "",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default function MeetupReponsePage({
  navigation,
}: MeetupResponsePageProps) {
  const onAccept = () => {
    navigation.pop();
  };
  const onDecline = () => {
    navigation.pop();
  };
  const renderParticipant = ({ item }: { item: string }) => (
    <Text variant="body">{item}</Text>
  );
  const renderLocations = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => <Text variant="body">{`${index + 1}. ${item}`}</Text>;
  const meetupTime = "3:00 PM";
  const meetupDuration = 25;
  const meetupParticipants = ["John Smith", "Bob Smith", "Alice Smith"];

  const [locations, setLocations] = useState(["Online", "Test", "Another"]);

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box flex={3} width="95%">
        <ThemedCard>
          <Text variant="header">Meetup Details</Text>
          <Text variant="subheader">Starts at {meetupTime}</Text>
          <Text variant="subheader">Lasts {meetupDuration} minutes</Text>
        </ThemedCard>
        <ThemedCard>
          <Text variant="subheader">Participants</Text>
          <FlatList
            data={meetupParticipants}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderParticipant}
          />
        </ThemedCard>
        <ThemedCard>
          <Text variant="subheader">Top Ranked Locations</Text>
          <FlatList
            data={locations.slice(0, Math.min(3, locations.length))}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderLocations}
          />
          <Box marginTop="sm">
            <TouchableOpacity
              onPress={() =>
                navigation.push("LocationRanker", { locations, setLocations })
              }
            >
              <Text variant="link">Rank Locations</Text>
            </TouchableOpacity>
          </Box>
        </ThemedCard>
      </Box>

      <Box
        flex={1}
        flexDirection="row"
        justifyContent="space-around"
        width="95%"
      >
        <Box alignItems="center">
          <ThemedIcon
            size={32}
            raised
            reverse
            name="cross"
            type="entypo"
            onPress={onDecline}
          />
          <Text variant="body">Decline</Text>
        </Box>

        <Box alignItems="center">
          <ThemedIcon
            size={32}
            raised
            reverse
            name="check"
            type="entypo"
            onPress={onAccept}
          />
          <Text variant="body">Accept</Text>
        </Box>
      </Box>

      {/* <Modal
        animationType="slide"
        visible={showLocationModal}
        presentationStyle="fullScreen"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <DraggableFlatList
          data={locations}
          renderItem={({ item, index, drag, isActive }) => {
            return (
              <TouchableOpacity
                style={{
                  height: 100,
                  backgroundColor: isActive ? "blue" : "red",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onLongPress={drag}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    fontSize: 32,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => `draggable-item-${item}`}
          onDragEnd={({ data }) => setLocations(data)}
        />
        <Box flexDirection="row" justifyContent="space-between">
          <ThemedButton
            title="Go Back"
            onPress={() => setShowLocationModal(false)}
          />
          <Text>Rank Locations</Text>
          <ThemedButton
            title="Confirm"
            onPress={() => setShowLocationModal(false)}
          />
        </Box>
      </Modal> */}
    </Box>
  );
}
