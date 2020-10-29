import React from "react";
import { SwitchProps } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Switch } from "react-native-gesture-handler";

import { Theme } from "../../theme";

type ThemedSwitchProps = SwitchProps;

// A reusable themed switch component
export default function ThemedSwitch(props: ThemedSwitchProps) {
  const theme = useTheme<Theme>();
  return (
    <Switch
      trackColor={{
        false: theme.colors.switchTrackDisabled,
        true: theme.colors.switchTrackEnabled,
      }}
      thumbColor={
        props.value
          ? theme.colors.switchThumbEnabled
          : theme.colors.switchThumbDisabled
      }
      {...props}
    />
  );
}
