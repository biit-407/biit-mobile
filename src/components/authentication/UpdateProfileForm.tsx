import React, { ReactNode, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, StyleSheet } from "react-native";
import { BottomSheet, Input, ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  setProfilePicture,
  updateAccount,
  useAccount,
} from "../../contexts/accountContext";
import { useConstructor } from "../../hooks";
import { EMPTY_PROFILE_PIC } from "../../models/constants";
import Box from "../themed/Box";
import ThemedAvatar from "../themed/ThemedAvatar";
import ThemedButton from "../themed/ThemedButton";
import ThemedInput from "../themed/ThemedInput";
import { useToken } from "../../contexts/tokenContext";

const styles = StyleSheet.create({
  root: { flexGrow: 1, flex: 1, alignItems: "center" },
  form: { width: "100%" },
  formContent: { display: "flex", alignItems: "center" },
});

type FormValues = {
  fname: string;
  lname: string;
};

const formErrors = {
  fname: "First name cannot be empty",
  lname: "Last name cannot be empty",
};

// Set the bottomsheet options
type BottomSheetOption = {
  title: string;
  icon: ReactNode;
  onPress?: () => void;
  containerStyle?: Record<string, string>;
  titleStyle?: Record<string, string>;
};
const bottomSheetOptions: BottomSheetOption[] = [
  {
    title: "Camera",
    icon: <Icon name="camera" size={16} color="gray" />,
    onPress: undefined,
  },
  {
    title: "Gallery",
    icon: <Icon name="image" size={16} color="gray" />,
    onPress: undefined,
  },
  {
    title: "Clear",
    icon: <Icon name="trash" size={16} color="gray" />,
    onPress: undefined,
  },
  {
    title: "Cancel",
    icon: <Icon name="remove" size={16} color="white" />,
    onPress: undefined,
    containerStyle: { backgroundColor: "red" },
    titleStyle: { color: "white" },
  },
];

const imagePickerOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [1, 1],
  quality: 1,
};

type UpdateProfileFormProps = {
  onFormSubmit: () => void;
};

export default function UpdateProfileForm({
  onFormSubmit,
}: UpdateProfileFormProps) {
  // Setup form validation
  const [accountState, accountDispatch] = useAccount();
  const { register, handleSubmit, setValue, errors } = useForm<FormValues>({
    defaultValues: {
      fname: accountState.account.fname,
      lname: accountState.account.lname,
    },
  });
  useEffect(() => {
    register("fname", { required: true, minLength: 1 });
    register("lname", { required: true, minLength: 1 });
  }, [register]);

  // Setup profile field
  const [profileImageURL, setProfileImageURL] = useState(
    accountState.account.profileImage ?? EMPTY_PROFILE_PIC
  );

  // Hook used to show and hide the bottomsheet for image selection
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  // Generic method that allows user to select an image from the gallery/camera after requesting permissions
  const selectImage = async (
    permissionMethod: CallableFunction,
    selectionMethod: CallableFunction
  ) => {
    const { status } = await permissionMethod();
    if (status === ImagePicker.PermissionStatus.GRANTED) {
      const result = await selectionMethod(imagePickerOptions);
      if (!result.cancelled) {
        setProfileImageURL(result.uri);
      }
    } else {
      Alert.alert(
        "Enable permissions",
        "Please enable camera and file permission"
      );
    }
    setBottomSheetVisible(false);
  };

  // Hook in bottomsheet methods
  useConstructor(() => {
    bottomSheetOptions[0].onPress = () => {
      selectImage(
        ImagePicker.requestCameraPermissionsAsync,
        ImagePicker.launchCameraAsync
      );
    };
    bottomSheetOptions[1].onPress = () => {
      selectImage(
        ImagePicker.requestCameraRollPermissionsAsync,
        ImagePicker.launchImageLibraryAsync
      );
    };
    bottomSheetOptions[2].onPress = () => {
      setProfileImageURL(EMPTY_PROFILE_PIC);
      setBottomSheetVisible(false);
    };
    bottomSheetOptions[3].onPress = () => setBottomSheetVisible(false);
  });

  // Ref to allow jumping from TextInput to TextInput when pressing DONE key
  const lastNameTextInput = React.createRef<Input>();

  // Get token methods to make account updates
  const [{ refreshToken }, tokenDispatch] = useToken();

  const submitProfile: SubmitHandler<FormValues> = (formData: FormValues) => {
    setProfilePicture(
      accountDispatch,
      tokenDispatch,
      refreshToken,
      { ...accountState.account, ...formData },
      profileImageURL
    );
    updateAccount(
      accountDispatch,
      tokenDispatch,
      refreshToken,
      accountState.account,
      { ...accountState.account, ...formData }
    );

    onFormSubmit();
  };

  return (
    <Box style={styles.root}>
      <ScrollView
        style={styles.form}
        contentContainerStyle={styles.formContent}
      >
        <ThemedInput
          placeholder={accountState.account.fname}
          label="First Name"
          returnKeyType="next"
          onSubmitEditing={() =>
            lastNameTextInput.current && lastNameTextInput.current.focus()
          }
          onChangeText={(text) => {
            setValue("fname", text);
          }}
          errorMessage={errors.fname ? formErrors.fname : ""}
        />
        <ThemedInput
          placeholder={accountState.account.lname}
          label="Last Name"
          ref={lastNameTextInput}
          onChangeText={(text) => {
            setValue("lname", text);
          }}
          errorMessage={errors.lname ? formErrors.lname : ""}
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
