import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Alert, ScrollView, StyleSheet, Switch } from 'react-native';

import { useAccountState } from '../../contexts/accountContext';
import {
    getCommunity, loadCommunity, updateCommunity, useCommunity
} from '../../contexts/communityContext';
import { useToken } from '../../contexts/tokenContext';
import { useConstructor } from '../../hooks';
import { BLANK_COMMUNITY } from '../../models/community';
import { CommunityRoutes, StackNavigationProps } from '../../routes';
import { ThemedIcon } from '../themed';
import Box from '../themed/Box';
import Text from '../themed/Text';
import ThemedButton from '../themed/ThemedButton';
import ThemedInput from '../themed/ThemedInput';

export const CommunityAdministrationPageOptions = {
  title: "Community Administration",
  headerTransparent: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
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
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#D8AD6D",
    padding: "3.5%",
  },
});

type FormValues = {
  codeOfConduct: string;
};

const formErrors = {
  codeOfConduct: "Code of Conduct cannot be empty",
};

function promptDiscardChanges(onConfirm: () => void) {
  Alert.alert(
    "Discard Changes?",
    "Are you sure you want to discard these changes?",
    [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: onConfirm,
      },
    ]
  );
}

export default function CommunityAdministrationPage({
  navigation,
  route,
}: StackNavigationProps<CommunityRoutes, "CommunityAdministration">) {
  // TODO: Refactor using Stephen's hook (Stephen has a hook in the yet to be merged PR)
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

  const [sw1, setSw1] = useState(false);
  const toggleSw1 = () => setSw1((previousState) => !previousState);
  const [sw2, setSw2] = useState(false);
  const toggleSw2 = () => setSw2((previousState) => !previousState);
  const [sw3, setSw3] = useState(false);
  const toggleSw3 = () => setSw3((previousState) => !previousState);
  return (
    <Box style={styles.root} backgroundColor="mainBackground">
      <ScrollView>
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
            placeholder={community.codeofconduct}
            label="Edit Code of Conduct"
            onChangeText={(text) => {
              setValue("codeOfConduct", text);
            }}
            errorMessage={errors.codeOfConduct ? formErrors.codeOfConduct : ""}
            multiline={true}
          />
        </Box>
        <Box
          padding="md"
          backgroundColor="headerBackground"
          flexDirection="row"
          alignItems="center"
        >
          <ThemedIcon type="feather" name="settings" />
          <Text paddingLeft="sm" variant="sectionListHeader">
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
        <Box style={styles.btncontainer} />
      </ScrollView>
      <Box flexDirection="row" justifyContent="space-evenly" m="md">
        <ThemedButton
          title="Cancel"
          color="buttonDanger"
          onPress={() => promptDiscardChanges(navigation.goBack)}
        />

        <ThemedButton title="Submit" onPress={handleSubmit(submitCommunity)} />
      </Box>
    </Box>
  );
}
