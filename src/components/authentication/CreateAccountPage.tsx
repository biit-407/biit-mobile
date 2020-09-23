import React from "react";
import { Image, StyleSheet } from "react-native";

import {
  CreateAccountPageNavigationProp,
  CreateAccountPageRouteProp,
} from "../../routes";
import Box from "../themed/Box";
import MicrosoftButton from "../themed/MicrosoftButton";
import Text from "../themed/Text";

// React Navigation Types and Page Options

type CreateAccountPageProps = {
  navigation: CreateAccountPageNavigationProp;
  route: CreateAccountPageRouteProp;
};

export const CreateAccountPageOptions = {
  title: "",
  headerTransparent: true,
};

// Page Styles

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

// Page Definition

export default function CreateAccountPage({
  navigation,
}: CreateAccountPageProps) {
  const createAccount = () =>
    navigation.reset({
      index: 0,
      routes: [{ name: "CreateProfile" }],
    });

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Image source={require("../../../assets/logo_200px.png")} />
      <Text variant="header">Create your account</Text>
      <Text variant="body" mb="xl">
        Have your Purdue credentials handy!
      </Text>
      <MicrosoftButton
        title="Create Account with Microsoft"
        onPress={createAccount}
      />
    </Box>
  );
}
