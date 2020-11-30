import React from 'react';
import { Icon } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { layout, LayoutProps, spacing, SpacingProps, useRestyle, useTheme } from '@shopify/restyle';

import { Theme } from '../../theme';
import Box from './Box';

const restyleFunctions = [spacing, layout];
type ThemedIconButtonProps = SpacingProps<Theme> &
  LayoutProps<Theme> & {
    iconColor?: keyof Theme["colors"];
    buttonColor?: keyof Theme["colors"];
    onPress?: () => void;
    size?: number;
    type: string;
    name: string;
  };

// A reusable themed icon button
export default function ThemedIconButton({
  type,
  name,
  onPress,
  size,
  iconColor,
  buttonColor,
  ...rest
}: ThemedIconButtonProps) {
  const theme = useTheme<Theme>();
  const props = useRestyle(restyleFunctions, rest);
  const BUTTON_SIZE = size ?? 48;
  return (
    <Box
      backgroundColor={buttonColor ?? "iconButtonBackground"}
      elevation={5}
      {...props}
      style={{ borderRadius: BUTTON_SIZE / 2 }}
    >
      <TouchableHighlight
        onPress={onPress}
        underlayColor={theme.colors.iconButtonUnderlay}
        style={{
          borderRadius: BUTTON_SIZE / 2,
          width: BUTTON_SIZE,
          height: BUTTON_SIZE,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          name={name}
          type={type}
          color={iconColor ?? theme.colors.iconButtonForeground}
          size={BUTTON_SIZE / 2}
        />
      </TouchableHighlight>
    </Box>
  );
}
