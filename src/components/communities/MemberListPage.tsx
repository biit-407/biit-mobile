import React from "react";
import { StyleSheet, SectionList, ScrollView } from "react-native"

import { MemberListPageRouteProp, MemberListPageNavigationProp } from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";

type MemberListPageProps = {
  route: MemberListPageRouteProp;
  navigation: MemberListPageNavigationProp;
};

export const MemberListPageOptions = {
    title: "Member List",
    headerTransparent: false,
}

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
    }
});

// Mocked data
const DATA = [
    {
        title: "A",
        data: ["Aaron", "Angie", "Arnold"]
    },
    {
        title: "B",
        data: ["Barney", "Brian", "Buster"]
    },
    {
        title: "C",
        data: ["Candace", "Cassie", "Cleo", "Cori"]
    },
    {
        title: "D",
        data: ["Dawn", "Doris", "Dwayne"]
    },
    {
        title: "E",
        data: ["Earl", "Erin", "Esther"]
    },
    {
        title: "F",
        data: ["Felix", "Flint", "Frank"]
    },
    {
        title: "G",
        data: ["Garrett", "Grace", "Grant"]
    },
    {
        title: "H",
        data: ["Harold", "Heather", "Henry"]
    },
];

const Item = ({ title }) => (
    <Box style={styles.listitem}>
        <Text>{title}</Text>
    </Box>
);

export default function MemberListPage({ navigation }: MemberListPageProps) {
    return(
        <Box style={styles.root}>
            <Box>
                <Text>Community Name</Text>
            </Box>
            <ScrollView style={styles.list}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item+index}
                    renderItem={({item}) => <Item title={item} />}
                    renderSectionHeader={({section: {title}}) => (
                        <Box backgroundColor="headerBackground" style={styles.header}>
                            <Text>{title}</Text>
                        </Box>
                    )}
                    ListEmptyComponent={() => (
                        <Text>No members exist</Text>
                    )}
                />
            </ScrollView>
        </Box>
    );
}