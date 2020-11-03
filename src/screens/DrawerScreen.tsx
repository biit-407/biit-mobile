import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import ThemedAvatar from "../components/themed/ThemedAvatar";
import AccountStackScreen from "./AccountStackScreen";
import CommunityStackScreen from "./CommunityStackScreen";
import HomeStackScreen from "./HomeStackScreen";
import MeetupStackScreen from "./MeetupStackScreen";
import SettingsStackScreen from "./SettingsStackScreen";
import Text from '../components/themed/Text';
import { getProfilePicture, useAccount } from "../contexts/accountContext";
import { EMPTY_PROFILE_PIC } from "../models/constants";
import { useToken } from "../contexts/tokenContext";
import Box from "../components/themed/Box";
import { FlatList } from "react-native";
import { ThemedIcon } from "../components/themed";
import theme from "../theme";


const Drawer = createDrawerNavigator()


interface DrawerScreenProps {
}

const DrawerScreen = ({ }: DrawerScreenProps) => {
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerComponent {...props} />} drawerStyle={{ backgroundColor: theme.colors.drawerBackground }}>
            <Drawer.Screen name='Home' component={HomeStackScreen} />
            <Drawer.Screen name='Profile' component={AccountStackScreen} />
            <Drawer.Screen name='Community' component={CommunityStackScreen} />
            <Drawer.Screen name='Meetup' component={MeetupStackScreen} />
            <Drawer.Screen name='Settings' component={SettingsStackScreen} />
        </Drawer.Navigator>);
};

const DrawerComponent = ({ navigation }: any) => {
    const [accountState, accountDispatch] = useAccount();
    const [tokenState, tokenDispatch] = useToken();
    const [avatar, setAvatar] = useState(EMPTY_PROFILE_PIC);
    const [showCommunities, setShowCommunities] = React.useState(false)


    useEffect(() => {
        getProfilePicture(
            accountDispatch,
            tokenDispatch,
            tokenState.refreshToken,
            accountState.account
        );
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setAvatar(
            accountState.account.profileImage
                ? accountState.account.profileImage
                : EMPTY_PROFILE_PIC
        );
    }, [accountState.account.profileImage]);

    return (
        <>
            <DrawerContentScrollView  >
                <Box style={{ alignItems: 'center', marginTop: 16 }}>
                    <ThemedAvatar
                        uri={avatar}
                        size="xlarge"
                        edit={true}
                        onEdit={() => {
                            navigation.navigate('Profile', {
                                screen: 'EditProfile',
                                initial: false,
                            });
                        }}
                    />
                    <Text marginBottom="md" variant="header" style={{ color: theme.colors.drawerPrimaryText }}>
                        {accountState.account.fname + " " + accountState.account.lname}
                    </Text>
                </Box>

                <CustomDrawerItem navigation={navigation} label={'Home'} location={'Home'} icon={'home'} />

                <CustomDrawerItem navigation={navigation} label={'Profile'} location={'Profile'} icon={'smile'} />

                <DrawerItem
                    label={'Communities'}
                    onPress={() => setShowCommunities(!showCommunities)}
                    labelStyle={{ fontWeight: 'bold', fontSize: 16, height: 48, color: theme.colors.drawerPrimaryText }}
                    style={{ height: 64 }}
                    icon={() => {
                        return (
                            <ThemedIcon
                                size={24}
                                reverse
                                name="briefcase"
                                type="feather"
                                color={theme.colors.drawerBackground}
                                iconStyle={{ color: theme.colors.drawerPrimaryText, fontWeight: 'bold', height: 48 }}
                            />
                        )
                    }}
                />
                {showCommunities ?
                    <FlatList
                        data={['Johnsons']}
                        keyExtractor={(_item: any, index: { toString: () => any; }) => index.toString()}
                        renderItem={renderCommunity}
                        style={{ width: "100%" }}
                    />
                    :
                    <></>
                }
                <CustomDrawerItem navigation={navigation} label={'Settings'} location={'Settings'} icon={'settings'} />
            </DrawerContentScrollView>
        </>
    )
}


const renderCommunity = ({ item }: { item: string; index: number }) => {
    return (
        <>
            <DrawerItem
                label={item}
                onPress={() => { }}
                labelStyle={{fontSize: 16, height: 48, color: theme.colors.drawerPrimaryText }}
                style={{ height: 64 }}
                icon={() => {
                    return (
                        <ThemedIcon
                            size={24}
                            reverse
                            name="briefcase"
                            type="feather"
                            color={theme.colors.drawerBackground}
                            iconStyle={{ color: theme.colors.drawerPrimaryText, height: 48 }}
                        />
                    )
                }}
            />
        </>
    );
};

const CustomDrawerItem = ({ navigation, label, location, icon }: any) => {
    return (
        <DrawerItem
            label={label}
            onPress={() => navigation.navigate(location)}
            labelStyle={{ fontWeight: 'bold', fontSize: 16, height: 48, color: theme.colors.drawerPrimaryText }}
            style={{ height: 64 }}
            icon={() => {
                return (
                    <ThemedIcon
                        size={24}
                        reverse
                        name={icon}
                        type="feather"
                        color={theme.colors.drawerBackground}
                        iconStyle={{ color: theme.colors.drawerPrimaryText, fontWeight: 'bold', height: 48 }}
                    />
                )
            }}
        />
    )
}

export default DrawerScreen