import React from "react";
import { StyleSheet } from "react-native";

import {
    BugReportPageRouteProp,
    BugReportPageNavigationProp,
} from "../../routes";

import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedButton from "../themed/ThemedButton";

type BugReportPageProps = {
    route: BugReportPageRouteProp;
    navigation: BugReportPageNavigationProp;
};
  
export const BugReportPageOptions = {
    title: "Bug Report",
    headerTransparent: false,
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default function BugReportPage({
    route,
    navigation,
}: BugReportPageProps) {
    return (
        <Box backgroundColor="mainBackground" style={styles.root}>
            <Text>Bug Report Page</Text>
            <ThemedButton
                title="Back to DevLinks"
                onPress={() => {
                    navigation.push("DevelopmentLinks");
                }}
            />
        </Box>
    );
}