import React, { useEffect, useState } from "react";
import { StyleSheet, SectionList, ScrollView } from "react-native";
import { getCommunity, loadCommunity, useCommunity } from "../../contexts/communityContext";
import { useToken } from "../../contexts/tokenContext";

import {
  MemberListPageRouteProp,
  MemberListPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";

type MemberListPageProps = {
  route: MemberListPageRouteProp;
  navigation: MemberListPageNavigationProp;
};

export const MemberListPageOptions = {
  title: "Member List",
  headerTransparent: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE8C6",
  },
  list: {
    width: "100%",
  },
  listitem: {
    paddingLeft: 10,
    borderBottomWidth: 1,
  },
  header: {
    paddingLeft: 5,
  },
});

// Mocked data
// const DATA = [
//   {
//     title: "A",
//     data: ["Aaron", "Angie", "Arnold"],
//   },
//   {
//     title: "B",
//     data: ["Barney", "Brian", "Buster"],
//   },
//   {
//     title: "C",
//     data: ["Candace", "Cassie", "Cleo", "Cori"],
//   },
//   {
//     title: "D",
//     data: ["Dawn", "Doris", "Dwayne"],
//   },
//   {
//     title: "E",
//     data: ["Earl", "Erin", "Esther"],
//   },
//   {
//     title: "F",
//     data: ["Felix", "Flint", "Frank"],
//   },
//   {
//     title: "G",
//     data: ["Garrett", "Grace", "Grant"],
//   },
//   {
//     title: "H",
//     data: ["Harold", "Heather", "Henry"],
//   },
//   {
//     title: "I",
//     data: ["Iroh", "Irwin", "Irma"],
//   },
// ];

const Item = ({ title }: { title: string }) => (
  <Box style={styles.listitem}>
    <Text>{title}</Text>
  </Box>
);

export default function MemberListPage({ route }: MemberListPageProps) {

  const [communityState, communityDispatch] = useCommunity()
  const [data, setData] = useState<{title: string, data: string[]}[]>([])
  const [tokenState, tokenDispatch] = useToken()

  useEffect(() => {
    // automatically queue a data update
    loadCommunity(communityDispatch, tokenDispatch, tokenState.refreshToken, route.params.name)
  }, [])

  useEffect(() => {
    const community = getCommunity(communityState, route.params.name)
    setData([...data, { title: 'Admins', data: community.Admins }])
    setData([...data, { title: 'Members', data: community.Members }])
  }, [communityState])

  return (
    <Box style={styles.root}>
      <Box>
        <Text>Community Name</Text>
      </Box >
      <SectionList
        style={styles.list}
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Box backgroundColor="headerBackground" style={styles.header}>
            <Text>{title}</Text>
          </Box>
        )}
        ListEmptyComponent={() => <Text>No members exist</Text>}
      />
    </Box>
  );
}
