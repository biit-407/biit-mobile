import React from "react";
import { Dimensions, StyleSheet } from "react-native";

import { useConstructor } from "../../hooks";
import {
  CommunityStatsPageNavigationProp,
  CommunityStatsPageRouteProp,
} from "../../routes";
import theme from "../../theme";
import { Text } from "../themed";
import Box from "../themed/Box";

type CommunityStatsPageProps = {
  route: CommunityStatsPageRouteProp;
  navigation: CommunityStatsPageNavigationProp;
};

export const CommunityStatsPageOptions = {
  title: "Statistics",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
});

export default function CommunityStatsPage({}: // TODO uncomment once backend is updated
// route,
CommunityStatsPageProps) {
  // TODO uncomment once backend is updated
  // const { communityID } = route.params;
  // const [tokenState, tokenDispatch] = useToken();
  // const [, communityDispatch] = useCommunity();
  // const [stats, setStats] = useState([]);

  useConstructor(() => {
    // automatically queue a data update
    // TODO uncomment once backend is updated
    // setStats(getCommunityStats(
    //     tokenDispatch,
    //     tokenState.refreshToken,
    //     route.params.communityID
    // ));
  });

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box style={{ height: 16 }} />
      <Statline statName="Total Sessions" statValue="12" />
      <Statline statName="Total Meetups" statValue="50" />
      <Statline statName="Total Accepted" statValue="100" />
      <Statline statName="Average Rating" statValue="4.5/5" />
    </Box>
  );
}

function Statline({
  statName,
  statValue,
}: {
  statName: string;
  statValue: string;
}) {
  return (
    <>
      <Box
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: Dimensions.get("screen").width - 24,
          padding: 16,
          backgroundColor: theme.colors.cardBackground,
          marginBottom: 16,
          borderRadius: 8,
        }}
      >
        <Text variant="subheader" fontWeight={"bold"}>
          {statName}
        </Text>
        <Text variant="subheader" textAlign={"right"}>
          {statValue}
        </Text>
      </Box>
    </>
  );
}
