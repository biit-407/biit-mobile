import React from "react";
import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/stack";

import {
  CreateProfilePageRouteProp,
  CreateProfilePageNavigationProp,
} from "../../routes";
import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

type CreateProfilePageProps = {
  route: CreateProfilePageRouteProp;
  navigation: CreateProfilePageNavigationProp;
};

const HeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }}
      style={{ marginEnd: 24 }}
    >
      <Text
        style={{
          color: "#3D2400",
          textDecorationLine: "underline",
          fontSize: 16,
        }}
      >
        Skip
      </Text>
    </TouchableOpacity>
  );
};

export const CreateProfilePageOptions = {
  title: "",
  headerTransparent: true,
  headerRight: () => <HeaderLeft />,
};

export default function CreateAccountPage({}: CreateProfilePageProps) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#FFE8C6",
        paddingTop: useHeaderHeight(),
      }}
    >
      <ScrollView
        style={{
          width: "100%",
        }}
        contentContainerStyle={{ display: "flex", alignItems: "center" }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#3D2400" }}>
          Setup your profile
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 32, color: "#3D2400" }}>
          Take a minute to customize your profile
        </Text>
        <Input
          containerStyle={{ width: "80%" }}
          placeholder="John"
          placeholderTextColor="#B88953"
          selectionColor="#B88953"
          inputStyle={{ color: "#3D2400" }}
          inputContainerStyle={{ borderBottomColor: "#B88953" }}
          label="First Name"
          labelStyle={{ color: "#B88953" }}
        />
        <Input
          containerStyle={{ width: "80%" }}
          placeholder="Smith"
          placeholderTextColor="#B88953"
          selectionColor="#B88953"
          inputStyle={{ color: "#3D2400" }}
          inputContainerStyle={{ borderBottomColor: "#B88953" }}
          label="Last Name"
          labelStyle={{ color: "#B88953" }}
        />
        <Button
          title="Select Profile Picture"
          buttonStyle={{ backgroundColor: "#B88953" }}
          titleStyle={{ color: "#F2DBB9" }}
        />
      </ScrollView>
    </View>
  );
}
