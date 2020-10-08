import React from "react";
import { StyleSheet } from "react-native";

import {
  JoinCommunityPageRouteProp,
  JoinCommunityPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import ThemedButton from "../themed/ThemedButton";
import Text from "../themed/Text";
import {
  joinCommunity,
  useCommunityDispatch,
} from "../../contexts/communityContext";
import { useToken } from "../../contexts/tokenContext";
import { useAccountState } from "../../contexts/accountContext";

type JoinCommunityPageProps = {
  route: JoinCommunityPageRouteProp;
  navigation: JoinCommunityPageNavigationProp;
};

export const JoinCommunityPageOptions = {
  title: "Join Community",
  headerTransparent: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  txtbox: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  ynbox: {
    display: "flex",
    flexDirection: "row",
  },
  ybtn: {
    marginLeft: "10%",
    marginRight: "20%",
  },
  nbtn: {
    marginLeft: "20%",
    marginRight: "10%",
  },
});

export default function JoinCommunityPage({
  route,
  navigation,
}: JoinCommunityPageProps) {
  const communityDispatch = useCommunityDispatch();
  const [tokenState, tokenDispatch] = useToken();
  const accountState = useAccountState();

  function join() {
    joinCommunity(
      communityDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      accountState.account.email,
      route.params.name
    );
  }

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box style={styles.txtbox}>
        <Text>Are you sure you want to join this community?</Text>
      </Box>
      <Box style={styles.ynbox}>
        <Box style={styles.ybtn}>
          <ThemedButton
            title="Yes"
            onPress={() => {
              join();
              navigation.push("DevelopmentLinks");
            }}
          />
        </Box>
        <Box style={styles.nbtn}>
          <ThemedButton
            title="No"
            onPress={() => navigation.push("DevelopmentLinks")}
          />
        </Box>
      </Box>
    </Box>
  );
}
