/**
 * This component is the navigation flow for an authenicated user (logged in)
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage, { HomePageOptions } from "../components/userUtils/HomePage";
import theme from "../theme";
import { ThemedIcon } from "../components/themed";

const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }: any) => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.headerBackground,
                },
                headerTintColor: theme.colors.primaryText,
            }}
        >
            <HomeStack.Screen
                name="Home"
                component={HomePage}
                options={{
                    ...HomePageOptions,
                    headerLeft: () => {
                        return <ThemedIcon
                            size={24}
                            reverse
                            name="menu"
                            type="entypo"
                            onPress={() => { navigation.openDrawer() }}
                            color={theme.colors.headerBackground}
                            iconStyle={{ color: theme.colors.primaryText }}
                        />
                    }
                }}
                initialParams={{futureMeetupIDs: ['test'], tentativeMeetupIDs: []}}
            />

        </HomeStack.Navigator>
    );
};

export default HomeStackScreen