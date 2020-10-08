import React, { useEffect, useState } from "react";
import { ScrollView, Switch, StyleSheet, Alert } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  CommunityAdministrationPageRouteProp,
  CommunityAdministrationPageNavigationProp,
} from "../../routes";
import Box from "../themed/Box";
import ThemedButton from "../themed/ThemedButton";
import ThemedInput from "../themed/ThemedInput";
import Text from "../themed/Text";
import {
  updateCommunity,
  useCommunityDispatch,
  useCommunityState,
} from "../../contexts/communityContext";
import { useToken } from "../../contexts/tokenContext";
import { useAccountState } from "../../contexts/accountContext";

type CommunityAdministrationPageProps = {
  route: CommunityAdministrationPageRouteProp;
  navigation: CommunityAdministrationPageNavigationProp;
};

export const CommunityAdministrationPageOptions = {
  title: "Community Administration",
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

export default function CommunityAdministrationPage({
  route,
}: CommunityAdministrationPageProps) {
  // TODO: Refactor using Stephen's hook (Stephen has a hook in the yet to be merged PR)
  const communityState = useCommunityState();
  const [community] = communityState.communities.filter(
    (element) => element.name.toLowerCase() === route.params.name.toLowerCase()
  );

  // Setup initial form
  const { register, handleSubmit, setValue, errors } = useForm<FormValues>({
    defaultValues: {
      name: community.name,
      codeOfConduct: community.codeofconduct,
    },
  });

  // Register the form values
  useEffect(() => {
    register("name", { required: true, minLength: 1 });
    register("codeOfConduct", { required: true, minLength: 1 });
  }, [register]);

  // Create a handler for submitting the form
  const communityDispatch = useCommunityDispatch();
  const [tokenState, tokenDispatch] = useToken();
  const accountState = useAccountState();

  const submitCommunity: SubmitHandler<FormValues> = (data) => {
    updateCommunity(
      communityDispatch,
      tokenDispatch,
      tokenState.refreshToken,
      accountState.account.email,
      {
        ...community,
        name: data.name,
        codeofconduct: data.codeOfConduct,
      }
    )
      .then(() => Alert.alert("Updated Community!"))
      .catch((err) => Alert.alert("Error Updating Community!", err));
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
          placeholder={community.name}
          label="Edit Community Name"
          onChangeText={(text) => {
            setValue("name", text);
          }}
          errorMessage={errors.name ? formErrors.name : ""}
        />
      </Box>
      <Box backgroundColor="headerBackground">
        <Text variant="header" style={styles.header}>
          Code of Conduct
        </Text>
      </Box>
      <Box style={styles.detailbox}>
        <ThemedInput
          placeholder={community.codeofconduct}
          label="Edit Code of Conduct"
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
