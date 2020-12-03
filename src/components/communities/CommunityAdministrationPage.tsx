import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Alert, ScrollView, StyleSheet } from "react-native";

import { useAccountState } from "../../contexts/accountContext";
import {
  getCommunity,
  loadCommunity,
  updateCommunity,
  useCommunity,
} from "../../contexts/communityContext";
import { useNotificationCenter } from "../../contexts/notificationCenterContext";
import { useToken } from "../../contexts/tokenContext";
import { useConstructor } from "../../hooks";
import { BLANK_COMMUNITY } from "../../models/community";
import { CommunityRoutes, StackNavigationProps } from "../../routes";
import { ThemedIcon } from "../themed";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedButton from "../themed/ThemedButton";
import ThemedInput from "../themed/ThemedInput";
import NotificationCenter from "../userUtils/NotificationCenter";

export const CommunityAdministrationPageOptions = {
  title: "Community Administration",
  headerTransparent: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
});

type FormValues = {
  codeOfConduct: string;
};

const formErrors = {
  codeOfConduct: "Code of Conduct cannot be empty",
};

export default function CommunityAdministrationPage({
  route,
}: StackNavigationProps<CommunityRoutes, "CommunityAdministration">) {
  const [communityState, communityDispatch] = useCommunity();
  const [community, setCommunity] = useState(BLANK_COMMUNITY);

  // Get account and token information
  const [tokenState, tokenDispatch] = useToken();
  const accountState = useAccountState();

  // Get the community information
  useConstructor(() => {
    loadCommunity(
      communityDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      route.params.name
    );
  });

  useEffect(() => {
    const loadedCommunity = getCommunity(communityState, route.params.name);
    setCommunity(loadedCommunity);
  }, [communityState, route.params.name]);

  // Setup initial form
  const { register, handleSubmit, setValue, errors } = useForm<FormValues>({
    defaultValues: {
      codeOfConduct: community.codeofconduct,
    },
  });

  // Register the form values
  useEffect(() => {
    register("codeOfConduct", { required: true, minLength: 1 });
  }, [register]);

  // Create a handler for submitting the form
  const submitCommunity: SubmitHandler<FormValues> = (data) => {
    updateCommunity(
      communityDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      accountState.account.email,
      community.name,
      {
        ...community,
        codeofconduct: data.codeOfConduct,
      }
    )
      .then(() => Alert.alert("Updated Community!"))
      .catch((err) => Alert.alert("Error Updating Community!", err));
  };

  const [notificationCenterState, ] = useNotificationCenter();

  return (
    <Box style={styles.root} backgroundColor="mainBackground">
      <ScrollView style={{ flexGrow: 1 }}>
        <Box
          padding="md"
          backgroundColor="headerBackground"
          flexDirection="row"
          alignItems="center"
        >
          <ThemedIcon type="feather" name="book-open" />
          <Text paddingLeft="sm" variant="sectionListHeader">
            Code of Conduct
          </Text>
        </Box>
        <ThemedInput
          placeholder={community.codeofconduct}
          label="Edit Code of Conduct"
          onChangeText={(text) => {
            setValue("codeOfConduct", text);
          }}
          errorMessage={errors.codeOfConduct ? formErrors.codeOfConduct : ""}
          multiline
          containerStyle={{ padding: 16 }}
          style={{ margin: 5 }}
        />
      </ScrollView>

      <ThemedButton
        title="Confirm Changes"
        onPress={handleSubmit(submitCommunity)}
      />
      <NotificationCenter
        isVisible={notificationCenterState.visible}
      />
    </Box>
  );
}
