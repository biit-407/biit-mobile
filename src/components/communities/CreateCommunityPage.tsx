import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Alert, ScrollView, StyleSheet } from 'react-native';

import { useAccountState } from '../../contexts/accountContext';
import { createCommunity, useCommunityDispatch } from '../../contexts/communityContext';
import { useToken } from '../../contexts/tokenContext';
import { BLANK_COMMUNITY } from '../../models/community';
import { CommunityRoutes, StackNavigationProps } from '../../routes';
import { ThemedIcon } from '../themed';
import Box from '../themed/Box';
import Text from '../themed/Text';
import ThemedButton from '../themed/ThemedButton';
import ThemedInput from '../themed/ThemedInput';

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
  header: {
    paddingLeft: 10,
    color: "#3d3400",
  },
  detailbox: {
    padding: 5,
  },
  option: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
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

export default function CreateCommunityPage({}: StackNavigationProps<
  CommunityRoutes,
  "CreateCommunity"
>) {
  const { register, handleSubmit, setValue, errors } = useForm<FormValues>();

  useEffect(() => {
    register("name", { required: true, minLength: 1 });
    register("codeOfConduct", { required: true, minLength: 1 });
  }, [register]);

  const communityDispatch = useCommunityDispatch();
  const [tokenState, tokenDispatch] = useToken();
  const accountState = useAccountState();

  const submitCommunity: SubmitHandler<FormValues> = (data) => {
    console.log({
      ...BLANK_COMMUNITY,
      name: data.name,
      codeofconduct: data.codeOfConduct,
      Admins: [accountState.account.email],
      Members: [accountState.account.email],
      token: tokenState.refreshToken,
    });
    createCommunity(communityDispatch, tokenDispatch, tokenState.refreshToken, {
      ...BLANK_COMMUNITY,
      name: data.name,
      codeofconduct: data.codeOfConduct,
      Admins: [accountState.account.email],
      Members: [accountState.account.email],
      // token: tokenState.accessToken,
    })
      .then(() => Alert.alert("Created Community!"))
      .catch((err) => Alert.alert("Error Creating Community!", err));
  };

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <ScrollView>
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
        <Box style={styles.detailbox}>
          <ThemedInput
            placeholder="Community Name"
            label="What should your community be called?"
            onChangeText={(text) => {
              setValue("name", text);
            }}
            errorMessage={errors.name ? formErrors.name : ""}
          />
          <Text variant="body">* Community name is final</Text>
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
        <Box style={styles.detailbox}>
          <ThemedInput
            placeholder="Booga oog, o boo gaboo agoo."
            label="What rules should members follow?"
            onChangeText={(text) => {
              setValue("codeOfConduct", text);
            }}
            errorMessage={errors.codeOfConduct ? formErrors.codeOfConduct : ""}
            multiline={true}
          />
        </Box>
        <ThemedButton title="Submit" onPress={handleSubmit(submitCommunity)} />
      </ScrollView>
    </Box>
  );
}
