import React from "react";
import { Image, StyleSheet } from "react-native";

import {
  CreateAccountPageRouteProp,
  CreateAccountPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import MicrosoftButton from "../themed/MicrosoftButton";
import Text from "../themed/Text";

type CreateAccountPageProps = {
  route: CreateAccountPageRouteProp;
  navigation: CreateAccountPageNavigationProp;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function CreateAccountPage({
  navigation,
}: CreateAccountPageProps) {
  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Image source={require("../../../assets/logo_200px.png")} />
      <Text variant="header">Create your account</Text>
      <Text variant="body" mb="xl">
        Have your Purdue credentials handy!
      </Text>
      <MicrosoftButton
        title="Create Account with Microsoft"
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "CreateProfile" }],
          });
        }}
      />
    </Box>
  );
}
