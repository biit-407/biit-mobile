import React from "react";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { LoginPageRouteProp, LoginPageNavigationProp } from "../../routes";
import Box from "../themed/Box";
import MicrosoftButton from "../themed/MicrosoftButton";
import Text from "../themed/Text";

type LoginPageProps = {
  route: LoginPageRouteProp;
  navigation: LoginPageNavigationProp;
};

export default function LoginPage({ navigation }: LoginPageProps) {
  return (
    <Box
      backgroundColor="mainBackground"
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Image source={require("../../../assets/logo_200px.png")} />
        <Text variant="header">Welcome to biit</Text>
        <Text variant="body" mb="xl">
          Login and get started!
        </Text>
        <MicrosoftButton title="Sign in with Microsoft" />
        <View style={{ marginVertical: 24 }}>
          <TouchableOpacity onPress={() => navigation.push("CreateAccount")}>
            <Text variant="link">Need to Create an Account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Box>
  );
}
