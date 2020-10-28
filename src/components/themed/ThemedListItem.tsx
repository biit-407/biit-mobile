import React from "react";
import { useTheme } from "@shopify/restyle";
import { ListItem } from "react-native-elements";

import { Theme } from "../../theme";

import ThemedAvatar from "./ThemedAvatar";
import Text from "./Text";

type ThemedListItemProps = {
  title?: string;
  avatarUri?: string;
  rightContent?: React.ReactNode;
  onPress?: () => void;
};

// A reusable themed button
export default function ThemedListItem({
  avatarUri,
  title,
  rightContent,
  onPress,
}: ThemedListItemProps) {
  const theme = useTheme<Theme>();
  return (
    <ListItem
      bottomDivider
      topDivider
      onPress={onPress}
      containerStyle={{
        backgroundColor: theme.colors.cardBackground,
        borderColor: theme.colors.cardBorder,
      }}
    >
      {avatarUri && <ThemedAvatar size="small" uri={avatarUri} />}
      <ListItem.Content>
        <ListItem.Title>
          <Text variant="listHeader">{title}</Text>
        </ListItem.Title>
      </ListItem.Content>
      {rightContent}
    </ListItem>
  );
}
