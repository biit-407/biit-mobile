import React from "react";
import { useTheme } from "@shopify/restyle";
import { Button } from "react-native-elements";

import { Theme } from "../../theme";

type ThemedButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
};

// A reusable themed button
export default function ThemedButton({
  onPress,
  title,
  color,
}: ThemedButtonProps) {
  const theme = useTheme<Theme>();
  return (
    <Button
      title={title}
      onPress={onPress}
      buttonStyle={{
        backgroundColor: color ?? theme.colors.buttonPrimaryBackground,
      }}
      titleStyle={{ color: theme.colors.buttonPrimaryText }}
      raised
    />
  );
}
