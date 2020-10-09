import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import {
  getCommunity,
  loadCommunity,
  useCommunity,
} from "../../contexts/communityContext";
import { useToken } from "../../contexts/tokenContext";
import {
  CodeOfConductPageNavigationProp,
  CodeOfConductPageRouteProp,
} from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";

// React Navigation Types and Page Options

type CodeOfConductPageProps = {
  navigation: CodeOfConductPageNavigationProp;
  route: CodeOfConductPageRouteProp;
};

export const CodeOfConductPageOptions = {
  title: "Code Of Conduct",
};

// Page Styles

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

// Page Definition

export default function BannedUsersPage({ route }: CodeOfConductPageProps) {
  // Load Community Dependencies
  const [communityState, communityDispatch] = useCommunity();
  const [tokenState, tokenDispatch] = useToken();

  // Utilize community data
  const [codeOfConduct, setCodeOfConduct] = useState("");

  useEffect(() => {
    // automatically queue a data update
    loadCommunity(
      communityDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      route.params.name
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const community = getCommunity(communityState, route.params.name);
    setCodeOfConduct(community.codeofconduct);
  }, [communityState, route.params.name]);

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Text variant="header" style={{ textAlign: "center" }} m="sm">
        {route.params.name} Code of Conduct:
      </Text>
      <Text variant="body" m="sm">
        {codeOfConduct}
      </Text>
    </Box>
  );
}
