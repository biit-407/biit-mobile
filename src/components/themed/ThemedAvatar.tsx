import React from "react";
import { useTheme } from "@shopify/restyle";
import { Avatar, AvatarProps } from "react-native-elements";
import { View } from "react-native";

import { Theme } from "../../theme";

import Box from "./Box";
import ThemedIcon from "./ThemedIcon";

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
          <ThemedIcon
            reverse
            name="edit"
            size={16}
            onPress={() => onEdit && onEdit()}
            raised
          />
        </View>
      )}
    </Box>
  );
}
