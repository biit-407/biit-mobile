import React from "react";
import { View } from "react-native";
import { Avatar, AvatarProps } from "react-native-elements";
import { useTheme } from "@shopify/restyle";

import { Theme } from "../../theme";

import Box from "./Box";
import ThemedIconButton from "./ThemedIconButton";

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
            bottom: 8,
            right: 8,
          }}
        >
          <ThemedIconButton
            type="feather"
            name="edit"
            size={36}
            onPress={() => onEdit && onEdit()}
          />
        </View>
      )}
    </Box>
  );
}
