import React from "react";
import { useTheme } from "@shopify/restyle";
import { Button } from "react-native-elements";

import { Theme } from "../../theme";

type ThemedButtonProps = {
  title: string;
  onPress: () => void;
};

// A reusable themed button
export default function ThemedButton({ onPress, title }: ThemedButtonProps) {
  const theme = useTheme<Theme>();
  return (
    <Button
      title={title}
      onPress={onPress}
      buttonStyle={{ backgroundColor: theme.colors.buttonPrimaryBackground }}
      titleStyle={{ color: theme.colors.buttonPrimaryText }}
    />
  );
}
