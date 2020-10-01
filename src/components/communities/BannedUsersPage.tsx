import { useTheme } from "@shopify/restyle";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";

import {
  BannedUsersPageNavigationProp,
  BannedUsersPageRouteProp,
} from "../../routes";
import { Theme } from "../../theme";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedAvatar from "../themed/ThemedAvatar";

// React Navigation Types and Page Options

type BannedUsersPageProps = {
  navigation: BannedUsersPageNavigationProp;
  route: BannedUsersPageRouteProp;
};

export const BannedUsersPageOptions = {
  title: "Banned Users",
};

// Page Styles

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

// Dummy info used for now

type User = {
  id: number;
  firstName: string;
  lastName: string;
  profileImage: string;
};

const dummyData: User[] = [];
for (let i = 0; i <= 45; i++) {
  dummyData.push({
    id: i,
    firstName: "John",
    lastName: "Smith" + i,
    profileImage:
      "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
  });
}

console.log(dummyData);

// Page Definition

export default function BannedUsersPage({}: BannedUsersPageProps) {
  const theme = useTheme<Theme>();
  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <FlatList
        data={dummyData}
        renderItem={({ item }) => (
          <ListItem
            bottomDivider
            topDivider
            containerStyle={{
              backgroundColor: theme.colors.cardBackground,
              borderColor: theme.colors.cardBorder,
            }}
          >
            <ThemedAvatar size="small" uri={item.profileImage} />
            <ListItem.Content>
              <ListItem.Title>
                <Text variant="listHeader">{`${item.firstName} ${item.lastName}`}</Text>
              </ListItem.Title>
            </ListItem.Content>
            <Box mr="xs">
              <Icon
                size={24}
                name="cross"
                type="entypo"
                color={theme.colors.iconPrimary}
                onPress={() =>
                  Alert.alert(
                    `Unban ${item.firstName} ${item.lastName}?`,
                    `Are you sure you want to unban ${item.firstName} ${item.lastName} from this community?`
                  )
                }
              />
            </Box>
          </ListItem>
        )}
        keyExtractor={(item: User) => item.id.toString()}
      />
    </Box>
  );
}
