import * as ImagePicker from "expo-image-picker";
import React, { ReactNode, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, StyleSheet } from "react-native";
import { BottomSheet, Icon, Input, ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  setProfilePicture,
  updateAccount,
  useAccount,
} from "../../contexts/accountContext";
import { useToken } from "../../contexts/tokenContext";
import { useConstructor } from "../../hooks";
import { EMPTY_PROFILE_PIC } from "../../models/constants";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedAvatar from "../themed/ThemedAvatar";
import ThemedButton from "../themed/ThemedButton";
import ThemedIconButton from "../themed/ThemedIconButton";
import ThemedInput from "../themed/ThemedInput";

const styles = StyleSheet.create({
  root: { flex: 1 },
});

type FormValues = {
  fname: string;
  lname: string;
  birthday: string | undefined;
};

const formErrors = {
  fname: "First name cannot be empty",
  lname: "Last name cannot be empty",
  birthday: "Birthday cannot be empty",
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
    icon: <Icon type="feather" name="camera" size={16} color="gray" />,
    onPress: undefined,
  },
  {
    title: "Gallery",
    icon: <Icon type="feather" name="image" size={16} color="gray" />,
    onPress: undefined,
  },
  {
    title: "Clear",
    icon: <Icon type="feather" name="trash" size={16} color="gray" />,
    onPress: undefined,
  },
  {
    title: "Cancel",
    icon: <Icon type="feather" name="x" size={16} color="white" />,
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
      birthday: accountState.account.birthday,
    },
  });

  useEffect(() => {
    register("fname", { required: true, minLength: 1 });
    register("lname", { required: true, minLength: 1 });
    register("birthday", { required: false });
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
      {
        email: accountState.account.email,
        ...formData,
      }
    );
    onFormSubmit();
  };
  const [date, setDate] = useState<undefined | Date>(
    accountState.account.birthday
      ? new Date(Date.parse(accountState.account.birthday))
      : undefined
  );
  const [show, setShow] = useState(false);

  // Adding this because I have on idea what type the event is
  // its not even used by the function
  const onChange = (
    _event: any /*eslint-disable-line @typescript-eslint/no-explicit-any */,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setValue("birthday", currentDate?.toISOString());
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <Box style={styles.root}>
      <ScrollView>
        <Box m="md">
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
          <Box flexDirection="row" alignItems="center" justifyContent="center">
            {date && (
              <Text variant="body" mr="md">
                Birthday: {date ? date.toLocaleDateString() : "Not set"}
              </Text>
            )}
            <ThemedIconButton
              type="feather"
              name="gift"
              onPress={showDatepicker}
            />
          </Box>

          {profileImageURL !== "" && (
            <Box
              marginVertical="md"
              alignItems="center"
              justifyContent="center"
            >
              <ThemedAvatar size="xlarge" uri={profileImageURL} />
            </Box>
          )}
          <ThemedButton
            title="Select Profile Picture"
            onPress={async () => {
              setBottomSheetVisible(true);
            }}
          />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date ? date : new Date()}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </Box>
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
