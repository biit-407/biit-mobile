import React from "react";
import { useTheme } from "@shopify/restyle";
import { Avatar, AvatarProps } from "react-native-elements";

import { Theme } from "../../theme";

type ThemedAvatarProps = {
  uri: string;
  size: AvatarProps["size"];
};

// A reusable themed button
export default function ThemedAvatar({ uri, size }: ThemedAvatarProps) {
  const theme = useTheme<Theme>();
  return (
    <Avatar
      rounded
      size={size}
      source={{ uri: uri }}
      containerStyle={{
        borderWidth: 3,
        borderColor: theme.colors.borderPrimary,
      }}
    />
  );
}
