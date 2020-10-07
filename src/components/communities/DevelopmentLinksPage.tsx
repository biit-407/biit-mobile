import React from "react";
import { View, Text, Button } from "react-native"

import { DevelopmentLinksPageRouteProp, DevelopmentLinksPageNavigationProp } from "../../routes";

type DevelopmentLinksPageProps = {
  route: DevelopmentLinksPageRouteProp;
  navigation: DevelopmentLinksPageNavigationProp;
};

export default function DevelopmentLinksPage({ navigation }: DevelopmentLinksPageProps) {
    return(
        <View>
            <Text>Hello World! Development Links page here.</Text>
            <Button 
                title="Join Community"
                onPress={() => navigation.push("JoinCommunity")}
            />
            <Button 
                title="Leave Community"
                onPress={() => navigation.push("LeaveCommunity")}
            />
            <Button 
                title="Member List"
                onPress={() => navigation.push("MemberList")}
            />
            <Button 
                title="Create Community"
                onPress={() => navigation.push("CreateCommunity")}
            />
            <Button 
                title="Community Administration"
                onPress={() => navigation.push("CommunityAdministration")}
            />
            <Button 
                title="Login"
                onPress={() => navigation.push("Login")}
            />
            <Button 
                title="Create Account"
                onPress={() => navigation.push("CreateAccount")}
            />
            <Button 
                title="User Settings"
                onPress={() => navigation.push("UserSettings")}
            />
        </View>
    );
}