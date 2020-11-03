import React from "react";
import { FlatList, StyleSheet } from "react-native";

import {
    HomePageRouteProp,
    HomePageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import { BLANK_MEETUP, Meetup } from "../../models/meetups";
import useConstructor from "../../hooks/useConstructor";
import MeetupCard from "../meetups/MeetupCard";
import Text from '../themed/Text';

type HomePageProps = {
    route: HomePageRouteProp;
    navigation: HomePageNavigationProp;
};

export const HomePageOptions = {
    title: "Home",
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
});

interface TextItem  { text: string; variant: any; }
function isTextItem(value: any) {
    return 'text' in value && 'variant' in value
}

export default function HomePage({
    route,
}: HomePageProps) {
    const { futureMeetupIDs, tentativeMeetupIDs } = route.params;

    const [meetups, setMeetups] = React.useState<(Meetup | TextItem)[]>([]);
    const load = (futureIDs: string[], tentativeIDs: string[]) => {
        const ml = [];
        ml.push({ text: 'Future Meetups', variant: 'header' })
        if (futureIDs.length > 0) {
            for (const meetupID in futureIDs) {
                // TODO load meetup
                ml.push({ ...BLANK_MEETUP, id: meetupID });
            }
        } else {
            ml.push({ text: "No Future Meetups", variant: 'subheader' })
        }

        ml.push({ text: 'Tentative Meetups', variant: 'header' })
        if (tentativeIDs.length > 0) {
            for (const meetupID in tentativeIDs) {
                // TODO load meetup
                ml.push({ ...BLANK_MEETUP, id: meetupID });
            }
        } else {
            ml.push({ text: "No Tentative Meetups", variant: 'subheader' })
        }

        setMeetups(ml);
    };

    useConstructor(() => {
        load(futureMeetupIDs, tentativeMeetupIDs);
    });

    const renderMeetup = ({ item }: { item: Meetup | TextItem; index: number }) => {
        return (
            <>
                { isTextItem(item) ?
                    <Text variant={(item as TextItem).variant} padding='md'>{(item as TextItem).text}</Text>
                    :
                    <MeetupCard
                        id={(item as Meetup).id}
                        duration={(item as Meetup).duration}
                        timestamp={(item as Meetup).timestamp}
                        userList={(item as Meetup).user_list}
                        location={(item as Meetup).location}
                    />
                }
            </>
        );
    };

    return (
        <Box backgroundColor="mainBackground" style={{ ...styles.root }}>
            <FlatList
                data={meetups}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={renderMeetup}
                style={{ width: "100%" }}
                ListFooterComponent={<Box style={{ opacity: 1, height: 24 }} />}
            />
        </Box>
    );
}
