import React from "react";
import { useTheme } from "@shopify/restyle";
import { Card } from "react-native-elements";
import { StyleProp, ViewStyle } from "react-native";

import { Theme } from "../../theme";

type ThemedButtonProps = {
  children?: React.ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

// A reusable themed button
export default function ThemedCard({ children }: ThemedButtonProps) {
  const theme = useTheme<Theme>();
  return (
    <Card
      containerStyle={{
        width: "95%",
        borderColor: theme.colors.cardBorder,
        backgroundColor: theme.colors.cardBackground,
        borderWidth: 2,
        borderRadius: 16,
        elevation: 4,
      }}
      wrapperStyle={{
        backgroundColor: theme.colors.cardBackground,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Card>
  );
}
