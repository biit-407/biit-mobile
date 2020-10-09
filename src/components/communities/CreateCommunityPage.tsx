import React, { useEffect, useState } from "react";
import { ScrollView, Switch, StyleSheet, Alert } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  CreateCommunityPageRouteProp,
  CreateCommunityPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import ThemedButton from "../themed/ThemedButton";
import ThemedInput from "../themed/ThemedInput";
import Text from "../themed/Text";
import {
  createCommunity,
  useCommunityDispatch,
} from "../../contexts/communityContext";
import { useToken } from "../../contexts/tokenContext";
import { BLANK_COMMUNITY } from "../../models/community";
import { useAccountState } from "../../contexts/accountContext";

type CreateCommunityPageProps = {
  route: CreateCommunityPageRouteProp;
  navigation: CreateCommunityPageNavigationProp;
};

export const CreateCommunityPageOptions = {
  title: "Create Community",
  headerTransparent: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFE8C6",
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

export default function CreateCommunityPage({}: CreateCommunityPageProps) {
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

  const [sw1, setSw1] = useState(false);
  const toggleSw1 = () => setSw1((previousState) => !previousState);
  const [sw2, setSw2] = useState(false);
  const toggleSw2 = () => setSw2((previousState) => !previousState);
  const [sw3, setSw3] = useState(false);
  const toggleSw3 = () => setSw3((previousState) => !previousState);

  return (
    <ScrollView style={styles.root}>
      <Box backgroundColor="headerBackground">
        <Text variant="header" style={styles.header}>
          Title
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

      <Box backgroundColor="headerBackground">
        <Text variant="header" style={styles.header}>
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
      <Box backgroundColor="headerBackground">
        <Text variant="header" style={styles.header}>
          Options
        </Text>
      </Box>
      <Box style={styles.detailbox}>
        <Box style={styles.option}>
          <Text variant="body">Option 1</Text>
          <Switch
            trackColor={{ false: "#FAD092", true: "#D8AD6D" }}
            thumbColor={sw1 ? "#B88953" : "#D8AD6D"}
            onValueChange={toggleSw1}
            value={sw1}
          />
        </Box>
        <Box style={styles.option}>
          <Text variant="body">Option 2</Text>
          <Switch
            trackColor={{ false: "#FAD092", true: "#D8AD6D" }}
            thumbColor={sw2 ? "#B88953" : "#D8AD6D"}
            onValueChange={toggleSw2}
            value={sw2}
          />
        </Box>
        <Box style={styles.option}>
          <Text variant="body">Option 3</Text>
          <Switch
            trackColor={{ false: "#FAD092", true: "#D8AD6D" }}
            thumbColor={sw3 ? "#B88953" : "#D8AD6D"}
            onValueChange={toggleSw3}
            value={sw3}
          />
        </Box>
      </Box>
      <ThemedButton title="Submit" onPress={handleSubmit(submitCommunity)} />
    </ScrollView>
  );
}
