import React from "react";
import { useTheme } from "@shopify/restyle";
import { Card } from "react-native-elements";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

import { Theme } from "../../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

type ThemedButtonProps = {
  children?: React.ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onPressFunction?: ((event: GestureResponderEvent) => void) | undefined
};

// A reusable themed button
export default function ThemedCard({ children, wrapperStyle, onPressFunction }: ThemedButtonProps) {
  const theme = useTheme<Theme>();
  return (
    <>
      {onPressFunction !== undefined ?
        < TouchableOpacity onPress={onPressFunction} style={{ paddingBottom: 24 }}>
          <Card
            containerStyle={{
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
              ...(wrapperStyle as ViewStyle)
            }}
          >
            {children}
          </Card>
        </TouchableOpacity>
        :
        <Card
          containerStyle={{
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
            ...(wrapperStyle as ViewStyle)
          }}
        >
          {children}
        </Card>
      }
    </>
  );
}
