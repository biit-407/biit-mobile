import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import { useAzureAuth, useAzureToken, useAzureUserInfo } from "../../hooks";
import useAccount from "../../hooks/useAccount";

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
  const [/*request*/, response, promptAsync]: [any, any, any] = useAzureAuth();
const [setGrantToken, accessToken, refresh_token] = useAzureToken();
  const [setAccessToken, userInfo]: [any, any] = useAzureUserInfo();
  const [account, createAccount, loginAccount, logoutAccount, updateAccount, deleteAccount] = useAccount()

  // NOTE: These chained useEffect calls may need to be replaced with a 
  // state management library like redux or recoil
  useEffect(() => {
    if (response?.params?.code) {
      setGrantToken(response?.params?.code)
    }
  }, [response])

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken)
    }
  }, [accessToken])

  useEffect(() => {
    if (userInfo && refresh_token) {
      _createAccount(refresh_token, userInfo.given_name, userInfo.family_name, userInfo.email)
    }
  }, [userInfo])

  async function _createAccount(token: string, fname: string, lname: string, email: string) {
    await createAccount({
      fname: fname,
      lname: lname,
      email: email,
      token: token
    })
    navigation.reset({
      index: 0,
      routes: [{ name: "CreateProfile" }],
    });
  }

  function press() {
    promptAsync({ useProxy: true });
  }

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Image source={require("../../../assets/logo_200px.png")} />
      <Text variant="header">Create your account</Text>
      <Text variant="body" mb="xl">
        Have your Purdue credentials handy!
      </Text>
      <MicrosoftButton
        title="Create Account with Microsoft"
        onPress={press}
      />
    </Box>
  );
}
