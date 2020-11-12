import React from "react";
import { useTheme } from "@shopify/restyle";
import { ListItem } from "react-native-elements";

import { Theme } from "../../theme";

import ThemedAvatar from "./ThemedAvatar";
import Text from "./Text";
import ThemedIcon from "./ThemedIcon";

type ThemedListItemProps = {
  title?: string;
  avatarUri?: string;
  subtitle?: string;
  iconName?: string;
  iconType?: string;
  rightContent?: React.ReactNode;
  onPress?: () => void;
  slim?: boolean;
};

// A reusable themed button
export default function ThemedListItem({
  avatarUri,
  iconName,
  iconType,
  title,
  subtitle,
  rightContent,
  onPress,
  slim,
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
      {iconName && iconType && (
        <ThemedIcon name={iconName} type={iconType} size={slim ? 20 : 24} />
      )}
      {avatarUri && <ThemedAvatar size="small" uri={avatarUri} />}
      <ListItem.Content>
        <ListItem.Title>
          <Text variant={slim ? "body" : "listHeader"}>{title}</Text>
        </ListItem.Title>
        {subtitle && (
          <ListItem.Subtitle>
            <Text>{subtitle}</Text>
          </ListItem.Subtitle>
        )}
      </ListItem.Content>
      {rightContent}
    </ListItem>
  );
}
