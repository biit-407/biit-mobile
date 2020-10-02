import React from "react";
import { useTheme } from "@shopify/restyle";
import { RefreshControl, RefreshControlProps } from "react-native";

import { Theme } from "../../theme";

type ThemedRefreshControlProps = RefreshControlProps & {
  onRefresh: () => void;
  refreshing: boolean;
};

// A reusable themed button
export default function ThemedRefreshControl(props: ThemedRefreshControlProps) {
  const theme = useTheme<Theme>();
  return (
    <RefreshControl
      colors={[theme.colors.buttonPrimaryText]}
      progressBackgroundColor={theme.colors.buttonPrimaryBackground}
      {...props}
    />
  );
}
