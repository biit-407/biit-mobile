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
        // width: "95%",
        borderColor: theme.colors.cardBackground,
        backgroundColor: theme.colors.cardBackground,
        borderWidth: 2,
        borderRadius: 4,
        elevation: 16,
        shadowColor: "#000000",
        shadowOpacity: 0.29,
        shadowOffset: {
          width: 8,
          height: 8,
        },
        shadowRadius: 16,
        marginBottom: 8,
      }}
      wrapperStyle={{
        backgroundColor: theme.colors.cardBackground,
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      {children}
    </Card>
  );
}
