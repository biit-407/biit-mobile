import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import {
  MeetupResponsePageRouteProp,
  MeetupResponsePageNavigationProp,
} from "../../routes";
import theme from "../../theme";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedCard from "../themed/ThemedCard";
import ThemedIcon from "../themed/ThemedIcon";
import MeetupCard from "./MeetupCard";

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

        <MeetupCard />

        <ThemedCard>
          <Text variant="header">Top Ranked Locations</Text>
          <FlatList
            data={locations.slice(0, Math.min(3, locations.length))}
            keyExtractor={(item, index) => item + index.toString()}
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
            color={theme.colors.iconSelectedRed}
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
            color={theme.colors.iconSelectedGreen}
          />
          <Text variant="body">Accept</Text>
        </Box>
      </Box>
    </Box>
  );
}
