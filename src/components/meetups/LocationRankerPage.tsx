import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import DraggableFlatList from "react-native-draggable-flatlist";
import { StyleSheet, YellowBox } from "react-native";

import { HomeRoutes, StackNavigationProps } from "../../routes";
import ThemedListItem from "../themed/ThemedListItem";
import Box from "../themed/Box";
import ThemedButton from "../themed/ThemedButton";

export const LocationRankerPageOptions: StackNavigationOptions = {
  title: "Rank Locations",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

// Ignore the serializer warning
YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);

export default function LocationRankerPage({
  navigation,
  route,
}: StackNavigationProps<HomeRoutes, "LocationRanker">) {
  const [locationData, setLocationData] = useState(route.params.locations);

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <DraggableFlatList
        data={locationData}
        renderItem={({ item, index, drag }) => {
          return (
            <TouchableOpacity onLongPress={drag}>
              <ThemedListItem title={`${(index ?? 0) + 1}. ${item}`} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item}
        onDragEnd={({ data }) => setLocationData(data)}
      />
      <Box m="lg">
        <ThemedButton
          title="Update Rankings"
          onPress={() => {
            route.params.setLocations(locationData);
            navigation.goBack();
          }}
        />
      </Box>
    </Box>
  );
}
