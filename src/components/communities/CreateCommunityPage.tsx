import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";

import { useAccountState } from "../../contexts/accountContext";
import {
  createCommunity,
  useCommunityDispatch,
} from "../../contexts/communityContext";
import { useSnackbarDispatch } from "../../contexts/snackbarContext";
import { useToken } from "../../contexts/tokenContext";
import { BLANK_COMMUNITY } from "../../models/community";
import { CommunityRoutes, StackNavigationProps } from "../../routes";
import { ThemedIcon } from "../themed";
import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedButton from "../themed/ThemedButton";
import ThemedInput from "../themed/ThemedInput";

export const CreateCommunityPageOptions = {
  tabBarIcon: ({
    color,
    size,
    focused,
  }: {
    color: string;
    focused: boolean;
    size: number;
  }) => (
    <ThemedIcon
      name="edit-2"
      type="feather"
      size={focused ? 30 : size}
      color={color}
    />
  ),
  tabBarLabel: ({ color, focused }: { focused: boolean; color: string }) => (
    <Text style={{ color: color }} fontSize={focused ? 12 : 10} mb="xs">
      Create Community
    </Text>
  ),
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
});

type FormValues = {
  name: string;
  codeOfConduct: string;
};

const formErrors = {
  name: "Community name cannot be empty",
  codeOfConduct: "Code of Conduct cannot be empty",
};

export default function CreateCommunityPage({
  navigation,
}: StackNavigationProps<CommunityRoutes, "CreateCommunity">) {
  const { register, handleSubmit, setValue, errors } = useForm<FormValues>();

  useEffect(() => {
    register("name", { required: true, minLength: 1 });
    register("codeOfConduct", { required: true, minLength: 1 });
  }, [register]);

  const communityDispatch = useCommunityDispatch();
  const [tokenState, tokenDispatch] = useToken();
  const accountState = useAccountState();
  const snackbarDispatch = useSnackbarDispatch();

  const submitCommunity: SubmitHandler<FormValues> = async (data) => {
    const response = await createCommunity(
      communityDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      {
        ...BLANK_COMMUNITY,
        name: data.name,
        codeofconduct: data.codeOfConduct,
        Admins: [accountState.account.email],
        Members: [accountState.account.email],
      }
    );
    if (response) {
      snackbarDispatch({
        type: "push",
        state: {
          snackbarVisible: true,
          snackbarMessage: "Successfully Created Community",
          queue: [],
          snackbarType: "success",
        },
        dispatch: snackbarDispatch,
      });
      navigation.navigate("CommunityList");
    } else {
      snackbarDispatch({
        type: "push",
        state: {
          snackbarVisible: true,
          snackbarMessage: "Failed to Create Community",
          queue: [],
          snackbarType: "error",
        },
        dispatch: snackbarDispatch,
      });
    }
  };

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <ScrollView style={{ flexGrow: 1 }}>
        <Box
          padding="md"
          backgroundColor="headerBackground"
          flexDirection="row"
          alignItems="center"
        >
          <ThemedIcon type="feather" name="bookmark" />
          <Text paddingLeft="sm" variant="sectionListHeader">
            Community Name
          </Text>
        </Box>
        <Box m="sm">
          <ThemedInput
            placeholder="Community Name"
            label={
              <Box>
                <Text variant="body">
                  What should your community be called?
                </Text>
                <Text variant="body">(*Community name is final)</Text>
              </Box>
            }
            onChangeText={(text) => {
              setValue("name", text);
            }}
            errorMessage={errors.name ? formErrors.name : ""}
          />
        </Box>

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
        <Box m="sm">
          <ThemedInput
            placeholder="Description of rules and conduct"
            label={<Text>What rules should members follow?</Text>}
            onChangeText={(text) => {
              setValue("codeOfConduct", text);
            }}
            errorMessage={errors.codeOfConduct ? formErrors.codeOfConduct : ""}
            multiline
          />
        </Box>
      </ScrollView>

      <ThemedButton
        title="Create Community"
        onPress={handleSubmit(submitCommunity)}
      />
    </Box>
  );
}
