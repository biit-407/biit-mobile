import React from "react";
import { StyleSheet } from "react-native";

import {
  LeaveCommunityPageRouteProp,
  LeaveCommunityPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";
import {
  leaveCommunity,
  useCommunityDispatch,
} from "../../contexts/communityContext";
import { useAccountState } from "../../contexts/accountContext";
import { useToken } from "../../contexts/tokenContext";
import ThemedIcon from "../themed/ThemedIcon";

type LeaveCommunityPageProps = {
  route: LeaveCommunityPageRouteProp;
  navigation: LeaveCommunityPageNavigationProp;
};

export const LeaveCommunityPageOptions = {
  title: "Leave Community",
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

export default function LeaveCommunityPage({
  route,
  navigation,
}: LeaveCommunityPageProps) {
  const communityDispatch = useCommunityDispatch();
  const [tokenState, tokenDispatch] = useToken();
  const accountState = useAccountState();

  function leave() {
    leaveCommunity(
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
        <Text variant="header" style={{ textAlign: "center" }}>
          Leaving "{route.params.name}"
        </Text>
        <Text variant="body">
          Are you sure you want to leave this community?
        </Text>
      </Box>
      <Box style={styles.ynbox}>
        <Box style={styles.ybtn}>
          <ThemedIcon
            name="check"
            type="entypo"
            size={32}
            reverse
            onPress={() => {
              leave();
              navigation.push("DevelopmentLinks");
            }}
          />
        </Box>
        <Box style={styles.nbtn}>
          <ThemedIcon
            name="cross"
            type="entypo"
            size={32}
            reverse
            onPress={() => navigation.push("DevelopmentLinks")}
          />
        </Box>
      </Box>
    </Box>
  );
}
