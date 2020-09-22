import React from "react";
import { Image, View } from "react-native";
import { Button } from "react-native-elements";

import {
  CreateAccountPageRouteProp,
  CreateAccountPageNavigationProp,
} from "../../routes";

type CreateAccountPageProps = {
  route: CreateAccountPageRouteProp;
  navigation: CreateAccountPageNavigationProp;
};

export default function CreateAccountPage({
  navigation,
}: CreateAccountPageProps) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFE8C6",
      }}
    >
      <Image
        source={require("../../../assets/logo_200px.png")}
        style={{ marginVertical: 64 }}
      />
      <Button
        title="Create Account with Microsoft"
        buttonStyle={{ backgroundColor: "#2F2F2F" }}
        icon={
          <Image
            source={require("../../../assets/microsoft-logo.png")}
            style={{ marginEnd: 12 }}
          />
        }
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "CreateProfile" }],
          });
        }}
      />
    </View>
  );
}
