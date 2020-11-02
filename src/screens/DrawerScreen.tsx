import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import AccountStackScreen from "./AccountStackScreen";
import CommunityStackScreen from "./CommunityStackScreen";
import MeetupStackScreen from "./MeetupStackScreen";
import SettingsStackScreen from "./SettingsStackScreen";



const Drawer = createDrawerNavigator()


interface DrawerScreenProps { }

const DrawerScreen = ({ }: DrawerScreenProps) => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='Profile' component={AccountStackScreen} />
            <Drawer.Screen name='Community' component={CommunityStackScreen}/>
            <Drawer.Screen name='Meetup' component={MeetupStackScreen} />
            <Drawer.Screen name='Settings' component={SettingsStackScreen} />
        </Drawer.Navigator>);
};

export default DrawerScreen