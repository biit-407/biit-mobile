import React from "react";
import { useTheme } from "@shopify/restyle";
import { Icon, IconProps } from "react-native-elements";

import { Theme } from "../../theme";

type ThemedIconProps = IconProps;

// A reusable themed button
export default function ThemedIcon(props: ThemedIconProps) {
  const theme = useTheme<Theme>();
  return (
    <Icon
      reverseColor={theme.colors.buttonPrimaryBackground}
      {...props}
      color={props.color ?? theme.colors.iconPrimary}
    />
  );
}
