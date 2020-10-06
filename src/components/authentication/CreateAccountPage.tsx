import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";

import { useAzureAuth } from "../../hooks";
import { useAccount, createAccount } from "../accountContext";
import {
  CompletedAzureAuthResponse,
  UseAzureAuthReturnType,
} from "../../hooks/useAzureAuth";
import {
  CreateAccountPageNavigationProp,
  CreateAccountPageRouteProp,
} from "../../routes";
import Box from "../themed/Box";
import MicrosoftButton from "../themed/MicrosoftButton";
import Text from "../themed/Text";
import { useToken } from "../tokenContext";
import { requestTokens, requestUserInfo, useAzure } from "../azureContext";
import { BLANK_ACCOUNT } from "../../models/accounts";

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
  const [, response, promptAsync]: UseAzureAuthReturnType = useAzureAuth();

  const [tokenState, tokenDispatch] = useToken();
  const [accountState, accountDispatch] = useAccount();
  const [azureState, azureDispatch] = useAzure();

  useEffect(() => {
    if (
      (response as CompletedAzureAuthResponse)?.params?.code &&
      !azureState.grantToken
    ) {
      const grantToken = (response as CompletedAzureAuthResponse)?.params?.code;
      azureDispatch({
        type: "set grant token",
        ...azureState,
        grantToken: grantToken,
      });
    }
  }, [response, azureDispatch, azureState]);

  useEffect(() => {
    if (
      azureState.grantToken &&
      !azureState.accessToken &&
      !azureState.refreshToken
    ) {
      requestTokens(azureDispatch, azureState);
    }
  }, [azureDispatch, azureState]);

  useEffect(() => {
    if (azureState.accessToken && azureState.refreshToken) {
      tokenDispatch({
        type: "set",
        refreshToken: azureState.refreshToken,
        accessToken: azureState.accessToken,
      });
      requestUserInfo(azureDispatch, azureState);
    }
  }, [azureDispatch, tokenDispatch, azureState]);

  useEffect(() => {
    if (accountState.status === "logged in") {
      // TODO an unexpected error has occurred
      console.log("an unexpected error has occurred");
      accountDispatch({
        type: "invalidate",
        account: BLANK_ACCOUNT,
        error: "an unexpected error has occurred",
      });
    } else if (
      azureState.userInfo.email !== "" &&
      tokenState.refreshToken &&
      (accountState.status === "logged out" || accountState.status === "error")
    ) {
      createAccount(
        accountDispatch,
        tokenState.refreshToken,
        {
          fname: azureState.userInfo.givenName,
          lname: azureState.userInfo.familyName,
          email: azureState.userInfo.email,
        },
        tokenDispatch
      );
      navigation.reset({
        index: 0,
        routes: [{ name: "CreateProfile" }],
      });
    }
  }, [
    azureState.userInfo,
    accountDispatch,
    accountState.status,
    navigation,
    tokenState.refreshToken,
    tokenDispatch,
  ]);

  function press() {
    if (!azureState.grantToken) {
      promptAsync({ useProxy: true });
    }
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
