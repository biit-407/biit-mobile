import React from "react";
import { Image } from "react-native";
import { Button } from "react-native-elements";

type MicrosoftButtonProps = {
  title?: string;
  onPress?: () => void;
};

// A reusable button used for Microsoft Login
export default function MicrosoftButton({
  title,
  onPress,
}: MicrosoftButtonProps) {
  return (
    <Button
      title={title}
      buttonStyle={{ backgroundColor: "#2F2F2F" }}
      icon={
        <Image
          source={require("../../../assets/microsoft-logo.png")}
          style={{ marginEnd: 8 }}
        />
      }
      onPress={onPress}
    />
  );
}
