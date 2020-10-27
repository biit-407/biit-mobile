import { StackNavigationOptions } from "@react-navigation/stack";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import DraggableFlatList from "react-native-draggable-flatlist";
import { StyleSheet } from "react-native";

import {
  LocationRankerPageNavigationProp,
  LocationRankerPageRouteProp,
} from "../../routes";
import ThemedListItem from "../themed/ThemedListItem";
import Box from "../themed/Box";
import ThemedButton from "../themed/ThemedButton";

type LocationRankerPageProps = {
  route: LocationRankerPageRouteProp;
  navigation: LocationRankerPageNavigationProp;
};

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

export default function LocationRankerPage({
  navigation,
  route,
}: LocationRankerPageProps) {
  const [locationData, setLocationData] = useState(route.params.locations);

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <DraggableFlatList
        data={locationData}
        renderItem={({ item, index, drag }) => {
          return (
            <TouchableOpacity onLongPress={drag}>
              <ThemedListItem title={`${index ?? 0 + 1}. ${item}`} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item}
        onDragEnd={({ data }) => setLocationData(data)}
      />
      <ThemedButton
        title="Save Ranking"
        onPress={() => {
          route.params.setLocations(locationData);
          navigation.goBack();
        }}
      />
    </Box>
  );
}
