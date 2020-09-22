import React from "react";
import { Image, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

import { LoginPageRouteProp, LoginPageNavigationProp } from "../../routes";

type LoginPageProps = {
  route: LoginPageRouteProp;
  navigation: LoginPageNavigationProp;
};

export default function LoginPage({ navigation }: LoginPageProps) {
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
      <View
        style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Image source={require("../../../assets/logo_200px.png")} />
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#3D2400" }}>
          Welcome to biit
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 32, color: "#3D2400" }}>
          Login and get started!
        </Text>
        <Button
          title="Sign in with Microsoft"
          buttonStyle={{ backgroundColor: "#2F2F2F" }}
          icon={
            <Image
              source={require("../../../assets/microsoft-logo.png")}
              style={{ marginEnd: 12 }}
            />
          }
        />
        <View style={{ marginVertical: 24 }}>
          <TouchableOpacity onPress={() => navigation.push("CreateAccount")}>
            <Text
              style={{
                textDecorationLine: "underline",
                fontSize: 16,
                color: "#3D2400",
              }}
            >
              Need to Create an Account?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
