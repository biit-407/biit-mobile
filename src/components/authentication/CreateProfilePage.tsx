import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/stack";
import { Input, Button, BottomSheet, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import {
  CreateProfilePageRouteProp,
  CreateProfilePageNavigationProp,
} from "../../routes";

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
  const [isVisible, setIsVisible] = useState(false);
  const list = [
    {
      title: "Camera",
      icon: <Icon name="camera" size={16} color="gray" />,
      onPress: async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === ImagePicker.PermissionStatus.GRANTED) {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
        }
        setIsVisible(false);
      },
    },
    {
      title: "Gallery",
      icon: <Icon name="image" size={16} color="gray" />,
      onPress: async () => {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status === ImagePicker.PermissionStatus.GRANTED) {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
        }
        setIsVisible(false);
      },
    },
    {
      title: "Cancel",
      icon: <Icon name="remove" size={16} color="white" />,
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];
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
          onPress={async () => {
            setIsVisible(true);
          }}
        />
      </ScrollView>
      <BottomSheet
        isVisible={isVisible}
        modalProps={{ presentationStyle: "overFullScreen" }}
      >
        {list.map((l, i) => (
          <ListItem
            containerStyle={l.containerStyle}
            onPress={l.onPress}
            key={i}
          >
            {l.icon}
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  );
}
