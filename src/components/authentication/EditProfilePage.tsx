import { useNavigation } from "@react-navigation/native";
import {
  HeaderBackButton,
  StackHeaderLeftButtonProps,
  StackNavigationOptions,
} from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { BottomSheet, Input, ListItem } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  EditProfilePageNavigationProp,
  EditProfilePageRouteProp,
} from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedInput from "../themed/ThemedInput";
import ThemedButton from "../themed/ThemedButton";
import ThemedAvatar from "../themed/ThemedAvatar";
import { setProfilePicture, updateAccount, useAccount } from "../../contexts/accountContext";
import { useToken } from "../../contexts/tokenContext";
import { EMPTY_PROFILE_PIC } from "../../models/constants";

// React Navigation Types and Page Options

type EditProfilePageProps = {
  navigation: EditProfilePageNavigationProp;
  route: EditProfilePageRouteProp;
};

export const EditProfilePageOptions: StackNavigationOptions = {
  title: "Edit Profile",
  headerLeft: () => <EditBackButton />,
};

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

function EditBackButton({ }: StackHeaderLeftButtonProps) {
  const navigator = useNavigation();
  return (
    <HeaderBackButton
      onPress={() =>
        Alert.alert(
          "Discard Changes?",
          "Are you sure your go back and discard your changes?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            { text: "OK", onPress: navigator.goBack },
          ]
        )
      }
    />
  );
}

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

type FormValues = {
  firstName: string;
  lastName: string;
};

const formErrors = {
  firstName: "First name cannot be empty",
  lastName: "Last name cannot be empty",
};

// Page Definition

export default function EditProfilePage({ }: EditProfilePageProps) {
  // Setup form validation for edit profile
  const navigation = useNavigation();
  const [accountState, accountDispatch] = useAccount();
  const { register, handleSubmit, setValue, errors } = useForm<FormValues>({
    defaultValues: {
      firstName: accountState.account.fname,
      lastName: accountState.account.lname,
    },
  });
  const [tokenState, tokenDispatch] = useToken();
  // Hook used to show and hide the bottomsheet for image selection
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  // Hook used to store local image url for profile image
  const [profileImageURL, setProfileImageURL] = useState(accountState.account.profileImage ? accountState.account.profileImage : EMPTY_PROFILE_PIC);

  useEffect(() => {
    register("firstName", { required: true, minLength: 1 });
    register("lastName", { required: true, minLength: 1 });
  }, [register]);

  const submitProfile: SubmitHandler<FormValues> = (data) => {
    updateAccount(
      accountDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      accountState.account,
      { ...accountState.account, fname: data.firstName, lname: data.lastName }
    );
    setProfilePicture(accountDispatch, tokenDispatch, tokenState.refreshToken, accountState.account, profileImageURL)
    navigation.goBack();
  };

 
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

  useEffect(() => {
    setProfileImageURL(accountState.account.profileImage ? accountState.account.profileImage : EMPTY_PROFILE_PIC)
  }, [accountState.account.profileImage])

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
        setProfileImageURL(EMPTY_PROFILE_PIC);
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
    <Box backgroundColor="mainBackground" pt="md" style={styles.root}>
      <ScrollView
        style={styles.form}
        contentContainerStyle={{ display: "flex", alignItems: "center" }}
      >
        <Text variant="body" mb="lg">
          Update and save your profile
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
          title="Save Profile"
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
