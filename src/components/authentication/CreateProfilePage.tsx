import React, { useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/stack";
import {
  Input,
  Button,
  BottomSheet,
  ListItem,
  Image,
} from "react-native-elements";
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

const SkipButton = () => {
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
  headerRight: () => <SkipButton />,
};

type PermissionMethod = () => Promise<ImagePicker.PermissionResponse>;
type SelectionMethod = (
  options?: ImagePicker.ImagePickerOptions | undefined
) => Promise<ImagePicker.ImagePickerResult>;

const imagePickerOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
  quality: 1,
};

export default function CreateAccountPage({
  navigation,
}: CreateProfilePageProps) {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [profileImageURL, setProfileImageURL] = useState("");
  const selectImage = async (
    permissionMethod: PermissionMethod,
    selectionMethod: SelectionMethod
  ) => {
    const { status } = await permissionMethod();
    if (status === ImagePicker.PermissionStatus.GRANTED) {
      const result = await selectionMethod(imagePickerOptions);
      if (!result.cancelled) {
        setProfileImageURL(result.uri);
      }
    }
    setBottomSheetVisible(false);
  };

  const bottomSheetOptions = [
    {
      title: "Camera",
      icon: <Icon name="camera" size={16} color="gray" />,
      onPress: () =>
        selectImage(
          ImagePicker.requestCameraPermissionsAsync,
          ImagePicker.launchCameraAsync
        ),
    },
    {
      title: "Gallery",
      icon: <Icon name="image" size={16} color="gray" />,
      onPress: () =>
        selectImage(
          ImagePicker.requestCameraRollPermissionsAsync,
          ImagePicker.launchImageLibraryAsync
        ),
    },
    {
      title: "Clear",
      icon: <Icon name="trash" size={16} color="gray" />,
      onPress: () => {
        setProfileImageURL("");
        setBottomSheetVisible(false);
      },
    },
    {
      title: "Cancel",
      icon: <Icon name="remove" size={16} color="white" />,
      onPress: () => setBottomSheetVisible(false),
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
    },
  ];
  const lastNameTextInput = React.createRef<Input>();

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
          flexGrow: 1,
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
          returnKeyType="next"
          onSubmitEditing={() =>
            lastNameTextInput.current && lastNameTextInput.current.focus()
          }
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
          ref={lastNameTextInput}
        />
        {profileImageURL !== "" && (
          <Image
            source={{ uri: profileImageURL }}
            style={{
              width: Dimensions.get("window").width * 0.5,
              aspectRatio: 1,
              borderRadius: 100,
              borderColor: "#B88953",
              borderWidth: 3,
              marginVertical: 8,
            }}
          />
        )}
        <Button
          title="Select Profile Picture"
          buttonStyle={{ backgroundColor: "#B88953" }}
          titleStyle={{ color: "#F2DBB9" }}
          onPress={async () => {
            setBottomSheetVisible(true);
          }}
        />
      </ScrollView>
      <View style={{ marginVertical: 16 }}>
        <Button
          title="Submit Profile"
          buttonStyle={{ backgroundColor: "#B88953" }}
          titleStyle={{ color: "#F2DBB9" }}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          }}
        />
      </View>
      <BottomSheet
        isVisible={isBottomSheetVisible}
        modalProps={{ onRequestClose: () => setBottomSheetVisible(false) }}
      >
        {bottomSheetOptions.map((option, index) => (
          <ListItem
            containerStyle={option.containerStyle}
            onPress={option.onPress}
            key={index}
          >
            {option.icon}
            <ListItem.Content>
              <ListItem.Title style={option.titleStyle}>
                {option.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  );
}
