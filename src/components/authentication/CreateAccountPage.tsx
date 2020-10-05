import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";

import { useAzureAuth, useAzureToken, useAzureUserInfo } from "../../hooks";
import useAccount from "../../hooks/useAccount";
import {
  CompletedAzureAuthResponse,
  UseAzureAuthReturnType,
} from "../../hooks/useAzureAuth";
import { AzureUserInfo } from "../../models";
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
  const [
    ,
    /*request*/ response,
    promptAsync,
  ]: UseAzureAuthReturnType = useAzureAuth();
  const [setGrantToken, accessToken, refreshToken] = useAzureToken();
  const [setAccessToken, userInfo]: [
    React.Dispatch<React.SetStateAction<string | null>>,
    AzureUserInfo | null
  ] = useAzureUserInfo();
  const [
    ,
    /*account*/ createAccount,
    /*loginAccount*/
    /*logoutAccount*/
    /*updateAccount*/
    /*deleteAccount*/
    ,
    ,
    ,
    ,
  ] = useAccount();

  // NOTE: These chained useEffect calls may need to be replaced with a
  // state management library like redux or recoil
  useEffect(() => {
    if ((response as CompletedAzureAuthResponse)?.params?.code) {
      setGrantToken((response as CompletedAzureAuthResponse)?.params?.code);
    }
  }, [response, setGrantToken]);

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [accessToken, setAccessToken]);

  useEffect(() => {
    if (userInfo && refreshToken) {
      _createAccount(
        refreshToken,
        userInfo.givenName,
        userInfo.familyName,
        userInfo.email
      );
    }
  }, [userInfo, refreshToken]); // eslint-disable-line react-hooks/exhaustive-deps

  async function _createAccount(
    token: string,
    fname: string,
    lname: string,
    email: string
  ) {
    await createAccount({
      fname: fname,
      lname: lname,
      email: email,
      token: token,
    });
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
      <MicrosoftButton title="Create Account with Microsoft" onPress={press} />
    </Box>
  );
}
