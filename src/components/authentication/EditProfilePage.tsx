import React from "react";
import { Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  HeaderBackButton,
  StackHeaderLeftButtonProps,
  StackNavigationOptions,
} from "@react-navigation/stack";

import {
  EditProfilePageNavigationProp,
  EditProfilePageRouteProp,
} from "../../routes";
import Box from "../themed/Box";
import Text from "../themed/Text";

import UpdateProfileForm from "./UpdateProfileForm";

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

function EditBackButton({ navigation }: StackHeaderLeftButtonProps) {
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
  },
  form: {
    flexGrow: 1,
    flex: 1,
    alignItems: "center",
  },
});

// Page Definition

export default function EditProfilePage({ navigation }: EditProfilePageProps) {
  return (
    <Box backgroundColor="mainBackground" pt="md" style={styles.root}>
      <Text variant="body" mb="lg" textAlign="center">
        Update and save your profile
      </Text>
      <UpdateProfileForm style={styles.form} onFormSubmit={navigation.goBack} />
    </Box>
  );
}
