import React from "react";
import { StyleSheet } from "react-native";

import {
  LeaveCommunityPageRouteProp,
  LeaveCommunityPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import ThemedButton from "../themed/ThemedButton";
import Text from "../themed/Text";

type LeaveCommunityPageProps = {
  route: LeaveCommunityPageRouteProp;
  navigation: LeaveCommunityPageNavigationProp;
};

export const LeaveCommunityPageOptions = {
  title: "",
  headerTransparent: true,
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
  navigation,
}: LeaveCommunityPageProps) {
  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box style={styles.txtbox}>
        <Text>Are you sure you want to leave this community?</Text>
      </Box>
      <Box style={styles.ynbox}>
        <Box style={styles.ybtn}>
          <ThemedButton
            title="Yes"
            onPress={() => navigation.push("DevelopmentLinks")}
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
