import React from "react";
import { Button, Text, View } from "react-native";

import { LoginPageProps } from "../../types";

export default function LoginPage({ navigation }: LoginPageProps) {
  return (
    <View>
      <Text>Hello World</Text>
      <Button
        title="Create Account"
        onPress={() => navigation.push("CreateAccount")}
      />
    </View>
  );
}
