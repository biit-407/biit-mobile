/**
 * This component is the navigation flow for an authenicated user (logged in)
 */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BannedUsersPage, { BannedUsersPageOptions } from "../components/communities/BannedUsersPage";
import CodeOfConductPage, { CodeOfConductPageOptions } from "../components/communities/CodeOfConductPage";
import CommunityAdministrationPage, { CommunityAdministrationPageOptions } from "../components/communities/CommunityAdministrationPage";
import MemberListPage, { MemberListPageOptions } from "../components/communities/MemberListPage";
import CreateCommunityPage, { CreateCommunityPageOptions } from "../components/communities/CreateCommunityPage";
import JoinCommunityPage, { JoinCommunityPageOptions } from "../components/communities/JoinCommunityPage";
import LeaveCommunityPage, { LeaveCommunityPageOptions } from "../components/communities/LeaveCommunityPage";
import theme from "../theme";
import { ThemedIcon } from "../components/themed";

const CommunityStack = createStackNavigator();

const CommunityStackScreen = ({ navigation }: any) => {
    return (
        <CommunityStack.Navigator
            initialRouteName='MemberList'
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.headerBackground,
                },
                headerTintColor: theme.colors.primaryText,
            }}
        >
            <CommunityStack.Screen
                name="BannedUsers"
                component={BannedUsersPage}
                options={BannedUsersPageOptions}
            />
            <CommunityStack.Screen
                name="CodeOfConduct"
                component={CodeOfConductPage}
                options={CodeOfConductPageOptions}
            />
            <CommunityStack.Screen
                name="CommunityAdministration"
                component={CommunityAdministrationPage}
                options={CommunityAdministrationPageOptions}
            />
            <CommunityStack.Screen
                name="MemberList"
                component={MemberListPage}
                options={{
                    ...MemberListPageOptions,
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
                initialParams={{ name: 'Johnsons'}}
            />
            <CommunityStack.Screen
                name="CreateCommunity"
                component={CreateCommunityPage}
                options={CreateCommunityPageOptions}
            />
            <CommunityStack.Screen
                name="JoinCommunity"
                component={JoinCommunityPage}
                options={JoinCommunityPageOptions}
            />
            <CommunityStack.Screen
                name="LeaveCommunity"
                component={LeaveCommunityPage}
                options={LeaveCommunityPageOptions}
            />
        </CommunityStack.Navigator>
    );
};

export default CommunityStackScreen