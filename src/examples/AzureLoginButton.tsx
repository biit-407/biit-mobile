import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { useAzureAuth } from "../hooks";
import {
  CompletedAzureAuthResponse,
  UseAzureAuthReturnType,
} from "../hooks/useAzureAuth";
import useAzureToken from "../hooks/useAzureToken";
import useAzureUserInfo from "../hooks/useAzureUserInfo";
import { AzureUserInfo } from "../models";

export default function AzureLoginButton() {
  const [
    ,
    /*request*/ response,
    promptAsync,
  ]: UseAzureAuthReturnType = useAzureAuth();
  const [setGrantToken, accessToken /*refresh_token*/] = useAzureToken();
  const [setAccessToken, userInfo]: [
    React.Dispatch<React.SetStateAction<string | null>>,
    AzureUserInfo | null
  ] = useAzureUserInfo();

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

  return (
    <View style={styles.container}>
      {(response === null || response?.type !== "success") && (
        <Button
          title="Login"
          onPress={() => {
            promptAsync({ useProxy: true });
          }}
        />
      )}
      {!(response === null || response?.type !== "success") && (
        <Text>Successfully Logged in {userInfo?.name} using Azure Oauth</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
