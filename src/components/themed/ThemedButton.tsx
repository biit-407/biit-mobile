import React from "react";
import {
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  useRestyle,
  useTheme,
} from "@shopify/restyle";
import { TouchableHighlight } from "react-native-gesture-handler";

import { Theme } from "../../theme";

import Text from "./Text";
import Box from "./Box";

const restyleFunctions = [spacing, layout];
type ThemedButtonProps = SpacingProps<Theme> &
  LayoutProps<Theme> & {
    color?: keyof Theme["colors"];
    onPress?: () => void;
    title?: string;
    slim?: boolean;
  };

// A reusable themed button
export default function ThemedButton({
  color,
  onPress,
  title,
  slim,
  ...rest
}: ThemedButtonProps) {
  const theme = useTheme<Theme>();
  const props = useRestyle(restyleFunctions, rest);
  return (
    <Box
      backgroundColor={color ?? "buttonPrimaryBackground"}
      margin="md"
      borderRadius="xs"
      elevation={5}
      {...props}
    >
      <TouchableHighlight
        onPress={onPress}
        underlayColor={theme.colors.buttonHighlight}
        style={{ borderRadius: theme.borderRadii.xs }}
      >
        <Text
          textAlign="center"
          padding={slim ? "sm" : "md"}
          variant="buttonLabel"
        >
          {title}
        </Text>
      </TouchableHighlight>
    </Box>
  );
}
