import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

import { getCommunityStats } from "../../contexts/communityContext";
import { useToken } from "../../contexts/tokenContext";
import { useConstructor } from "../../hooks";
import { BLANK_COMMUNITY_STATS, CommunityStats } from "../../models/community";
import { CommunityRoutes, StackNavigationProps } from "../../routes";
import theme from "../../theme";
import { Text } from "../themed";
import Box from "../themed/Box";

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

export default function CommunityStatsPage({
  route,
}: // TODO uncomment once backend is updated
StackNavigationProps<CommunityRoutes, "CommunityStats">) {
  const [tokenState, tokenDispatch] = useToken();
  const [stats, setStats] = useState<CommunityStats>(BLANK_COMMUNITY_STATS);

  useConstructor(async () => {
    // automatically queue a data update
    const data = await getCommunityStats(
      tokenDispatch,
      tokenState.refreshToken,
      route.params.communityID
    );
    if (data !== null) {
      setStats(data);
    }
  });
  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box style={{ height: 16 }} />
      <Statline
        statName="Total Sessions"
        statValue={stats.totalSessions?.toString() ?? 0}
      />
      <Statline
        statName="Total Meetups"
        statValue={stats.totalMeetups?.toString() ?? 0}
      />
      <Statline
        statName="Total Accepted"
        statValue={stats.totalAccepted?.toString() ?? 0}
      />
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
