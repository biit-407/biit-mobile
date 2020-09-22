import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { useAzureAuth } from "../hooks";
import useAzureToken from "../hooks/useAzureToken";
import useAzureUserInfo from "../hooks/useAzureUserInfo";

export default function AzureLoginButton() {
    const [/*request*/, response, promptAsync]: [any, any, any] = useAzureAuth();
    const [setGrantToken, accessToken, /*refresh_token*/] = useAzureToken();
    const [setAccessToken, userInfo]: [any, any] = useAzureUserInfo();

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
