import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useHeaderHeight } from "@react-navigation/stack";
import { Input, BottomSheet, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  CreateProfilePageRouteProp,
  CreateProfilePageNavigationProp,
} from "../../routes";
import Text from "../themed/Text";
import Box from "../themed/Box";
import ThemedButton from "../themed/ThemedButton";
import ThemedInput from "../themed/ThemedInput";
import ThemedAvatar from "../themed/ThemedAvatar";
import {
  setProfilePicture,
  updateAccount,
  useAccount,
} from "../../contexts/accountContext";
import { useToken } from "../../contexts/tokenContext";
import { EMPTY_PROFILE_PIC } from "../../models/constants";

// React Navigation Types and Page Options

type CreateProfilePageProps = {
  route: CreateProfilePageRouteProp;
  navigation: CreateProfilePageNavigationProp;
};

// Note: Needed to create this as a its own component to access navigation in the header
const SkipButton = () => {
  const navigation = useNavigation();
  return (
    <Box me="lg">
      <TouchableOpacity
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "DevelopmentLinks" }],
          });
        }}
      >
        <Text variant="link">Skip</Text>
      </TouchableOpacity>
    </Box>
  );
};

export const CreateProfilePageOptions = {
  title: "",
  headerTransparent: true,
  headerRight: () => <SkipButton />,
};

// Page Styles

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  form: {
    width: "100%",
    flexGrow: 1,
  },
});

// Generic Image Selection

// Since there are two types of permissions and ways to select images (but the rest of the code is the same)
// I created a way to generify the approach by allowing the permission method and image selection as function args
type PermissionMethod = () => Promise<ImagePicker.PermissionResponse>;
type SelectionMethod = (
  options?: ImagePicker.ImagePickerOptions | undefined
) => Promise<ImagePicker.ImagePickerResult>;

// Options to be used for selecting the image, currently is 1:1 and allows cropping
const imagePickerOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
  quality: 1,
};

type FormValues = {
  firstName: string;
  lastName: string;
};

const formErrors = {
  firstName: "First name cannot be empty",
  lastName: "Last name cannot be empty",
};

export default function CreateProfilePage({
  navigation,
}: CreateProfilePageProps) {
  const [accountState, accountDispatch] = useAccount();
  const [tokenState, tokenDispatch] = useToken();

  // Setup form validation for edit profile
  const { register, handleSubmit, setValue, errors } = useForm<FormValues>({
    defaultValues: {
      firstName: accountState.account.fname,
      lastName: accountState.account.lname,
    },
  });

  useEffect(() => {
    register("firstName", { required: true, minLength: 1 });
    register("lastName", { required: true, minLength: 1 });
    // TODO: Call setValue for both name fields if populating with initial data
  }, [register]);

  // Hook used to store local image url for profile image
  const [profileImageURL, setProfileImageURL] = useState(
    accountState.account.profileImage
      ? accountState.account.profileImage
      : EMPTY_PROFILE_PIC
  );

  // Submit the profile data
  const submitProfile: SubmitHandler<FormValues> = (data) => {
    updateAccount(
      accountDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      accountState.account,
      { ...accountState.account, fname: data.firstName, lname: data.lastName }
    );

    setProfilePicture(
      accountDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      accountState.account,
      profileImageURL
    );

    navigation.reset({
      index: 0,
      routes: [{ name: "DevelopmentLinks" }],
    });
  };

  useEffect(() => {
    setProfileImageURL(
      accountState.account.profileImage
        ? accountState.account.profileImage
        : EMPTY_PROFILE_PIC
    );
  }, [accountState.account.profileImage]);

  // Hook used to show and hide the bottomsheet for image selection
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  // Generic method that allows user to select an image from the gallery/camera after requesting permissions
  // TODO: Add dialog/alert if user denies permission
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

  // Array that holds the 'data' to use for the bottomsheet options
  // It is in this scope since it needs access to the bottomsheet hooks
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

  // Ref to allow jumping from TextInput to TextInput when pressing DONE key
  const lastNameTextInput = React.createRef<Input>();

  return (
    <Box
      backgroundColor="mainBackground"
      style={{ ...styles.root, paddingTop: useHeaderHeight() }}
    >
      <ScrollView
        style={styles.form}
        contentContainerStyle={{ display: "flex", alignItems: "center" }}
      >
        <Text variant="header">Setup your profile</Text>
        <Text variant="body" style={{ marginBottom: 32 }}>
          Take a minute to customize your profile
        </Text>
        <ThemedInput
          placeholder={accountState.account.fname}
          label="First Name"
          returnKeyType="next"
          onSubmitEditing={() =>
            lastNameTextInput.current && lastNameTextInput.current.focus()
          }
          onChangeText={(text) => {
            setValue("firstName", text);
          }}
          errorMessage={errors.firstName ? formErrors.firstName : ""}
        />
        <ThemedInput
          placeholder={accountState.account.lname}
          label="Last Name"
          ref={lastNameTextInput}
          onChangeText={(text) => {
            setValue("lastName", text);
          }}
          errorMessage={errors.lastName ? formErrors.lastName : ""}
        />
        {profileImageURL !== "" && (
          <Box marginVertical="md">
            <ThemedAvatar size="xlarge" uri={profileImageURL} />
          </Box>
        )}
        <ThemedButton
          title="Select Profile Picture"
          onPress={async () => {
            setBottomSheetVisible(true);
          }}
        />
        <Box marginVertical="xs" />
      </ScrollView>
      <Box marginVertical="md">
        <ThemedButton
          title="Submit Profile"
          onPress={handleSubmit(submitProfile)}
        />
      </Box>
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
    </Box>
  );
}
