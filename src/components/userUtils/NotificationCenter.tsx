import React from 'react';
import { SectionList, SectionListData, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import NotificationCenterItem from './NotificationCenterItem';

import { Text } from '../themed'
import { getNotifications, dismissNotifications, useAccountState } from '../../contexts/accountContext'
import { useToken } from '../../contexts/tokenContext';

type NotificationCenterProps = {
    isVisible: boolean,
};

const styles = StyleSheet.create({
    notifCenterView: {
        borderWidth: 2,
        borderColor: "#3D2400",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        width: 200,
        height: "auto",
        maxHeight: 400,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        elevation: 20,
        position: "absolute",
        alignSelf: "flex-end",
    },
    closeButton: {
        width: 30,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderLeftWidth: 2,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#3D2400",
        backgroundColor: "red"
    },
    closeButtonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
});

// DUMMY TYPE
type Data = {
    id: number;
    title: string;
    btntxt?: string;
    showButton: boolean;
}

export default function NotificationCenter ({
    isVisible,
}: NotificationCenterProps) {
    // Cheese out a render update using this
    const [cheeseUpdate, setCheeseUpdate] = React.useState(false);

    //DUMMY DATA
    const [notificationsData, setNotificationsData] = React.useState<Data[]>([
        {id: 1, title: 'notif 1'/*, btntxt: 'button 1'*/, showButton: false},
        {id: 2, title: 'notif 2', btntxt: 'button 2', showButton: false},
        {id: 3, title: 'notif 3', btntxt: 'button 3', showButton: false},
        {id: 4, title: 'notif 4', btntxt: 'button 4', showButton: false},
        {id: 5, title: 'notif 5', btntxt: 'button 5', showButton: false},
        {id: 6, title: 'notif 6', btntxt: 'button 6', showButton: false},
        {id: 7, title: 'notif 7', btntxt: 'button 7', showButton: false},
        {id: 8, title: 'notif 8', btntxt: 'button 8', showButton: false},
        {id: 9, title: 'notif 9', btntxt: 'button 9', showButton: false},
    ]);

    function toggleShowButton(notifItem: Data) {
        notifItem.showButton = !notifItem.showButton;
    }

    function deleteItem(notifItem: Data) {
        setNotificationsData(notificationsData.filter(item => item.id !== notifItem.id));
    }

    /*********************************/
    /*          Real Data            */
    /*********************************/
    const [notifData, setNotifData] = React.useState<Notification[]>();
    const [isLoading, setLoading] = React.useState(false);

    // Retrieve account information
    const [tokenState, tokenDispatch] = useToken();
    const {
        account: { email },
    } = useAccountState();

    // Function to load notifications
    const loadNotifications = async () => {
        const notifData = await getNotifications(
            email,
            tokenState.refreshToken,
            tokenDispatch
        );
        setNotifData(notifData);
    }

    // Function to dismiss notification
    const dismissNotification = async () => {
        //TODO
    }

    // const notifications: SectionListData<Notification>[] = [
    //     {
    //         title: '',
    //         data: notifData,
    //         renderItem: ({item}) => {
    //             <View>
    //                 <Text>{item.title}</Text>
    //             </View>
    //         }
    //     }
    // ]

    return ( isVisible ? 
        <View style={styles.notifCenterView}>
            <SectionList 
                sections={[
                    { title: '', data: (notificationsData.length ? notificationsData : [{id: -1, title: "No Notifications", showButton: false}]) }
                ]}
                // keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (item.showButton ?
                    // buttons ARE shown
                    <View style={{flexDirection: "row"}}>
                        {/* item */}
                        <View style={{width: 170}}>
                            <TouchableWithoutFeedback 
                                onPress={() => {
                                    toggleShowButton(item);
                                    setCheeseUpdate(!cheeseUpdate);
                                }
                            }>
                                <NotificationCenterItem 
                                    text={item.title}
                                    buttonText={item.btntxt}
                                    buttonSlim={true}
                                    showButton={item.showButton}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        {/* delete button */}
                        <View>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => {
                                    deleteItem(item);
                                }}
                            >
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    // buttons NOT shown
                    <View>
                        <TouchableWithoutFeedback 
                            onPress={() => {
                                toggleShowButton(item);
                                setCheeseUpdate(!cheeseUpdate);
                            }
                        }>
                            <NotificationCenterItem 
                                text={item.title}
                                buttonText={item.btntxt}
                                buttonSlim={true}
                                showButton={item.showButton}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                )}
                scrollEnabled
            />
        </View>
        :
        <View></View>
    );
}