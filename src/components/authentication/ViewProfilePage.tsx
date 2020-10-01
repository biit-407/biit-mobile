import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { Button, StyleSheet } from "react-native";

import {
  ViewProfilePageNavigationProp,
  ViewProfilePageRouteProp,
} from "../../routes";
import Box from "../themed/Box";
import ThemedAvatar from "../themed/ThemedAvatar";
import Text from "../themed/Text";
import ThemedCard from "../themed/ThemedCard";

// React Navigation Types and Page Options

type ViewProfilePageProps = {
  navigation: ViewProfilePageNavigationProp;
  route: ViewProfilePageRouteProp;
};

export const ViewProfilePageOptions: StackNavigationOptions = {
  title: "View Profile",
};

// Page Styles

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

// Page Definition

export default function ViewProfilePage({ navigation }: ViewProfilePageProps) {
  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <ThemedCard>
        <ThemedAvatar
          uri="https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
          size="xlarge"
          edit={true}
          onEdit={() => {
            navigation.push("EditProfile");
          }}
        />
        <Text marginBottom="md" variant="header">
          John Smith
        </Text>
      </ThemedCard>
      <Button
        title={"Test"}
        onPress={() => {
          navigation.push("BannedUsers");
        }}
      />
    </Box>
  );
}
