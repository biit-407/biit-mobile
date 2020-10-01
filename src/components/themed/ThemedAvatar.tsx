import React from "react";
import { useTheme } from "@shopify/restyle";
import { Avatar, AvatarProps, Icon } from "react-native-elements";
import { View } from "react-native";

import { Theme } from "../../theme";

import Box from "./Box";

type ThemedAvatarProps = {
  uri: string;
  size: AvatarProps["size"];
  edit?: boolean;
  onEdit?: () => void;
};

// A reusable themed button
export default function ThemedAvatar({
  uri,
  size,
  edit,
  onEdit,
}: ThemedAvatarProps) {
  const theme = useTheme<Theme>();
  return (
    <Box p="xs">
      <Avatar
        rounded
        size={size}
        source={{ uri: uri }}
        containerStyle={{
          borderWidth: 3,
          borderColor: theme.colors.borderPrimary,
        }}
      />
      {edit && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <Icon
            reverse
            name="edit"
            size={16}
            reverseColor={theme.colors.buttonPrimaryBackground}
            color={theme.colors.iconPrimary}
            onPress={() => onEdit && onEdit()}
            raised
          />
        </View>
      )}
    </Box>
  );
}
