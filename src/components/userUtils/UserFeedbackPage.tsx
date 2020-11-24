import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { SubmitHandler } from "react-hook-form";

import Box from "../themed/Box";
import Text from "../themed/Text";
import ThemedButton from "../themed/ThemedButton";
import theme from "../../theme";
import { useToken } from "../../contexts/tokenContext";
import {
  reportSuggestion,
  useAccountState,
} from "../../contexts/accountContext";
import { SettingsRoutes, StackNavigationProps } from "../../routes";

export const UserFeedbackPageOptions = {
  title: "User Feedback",
  headerTransparent: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  responseBox: {
    width: "100%",
    height: "85%",
    alignItems: "center",
    paddingTop: 10,
  },
  inputLabelBox: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAD092",
    padding: 5,
    width: "95%",
    marginBottom: 10,
  },
  inputLabel: {
    color: "#3D2400",
    fontWeight: "bold",
    fontSize: 16,
  },
  textInputBound: {
    width: "95%",
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsBox: {
    borderColor: "#3D2400",
    borderTopWidth: 2,
    backgroundColor: "#D8AD6D",
    width: "100%",
    height: "15%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textInput: {
    width: "95%",
    height: "100%",
    borderColor: "#3D2400",
    borderWidth: 1,
    padding: 10,
  },
});

type FeedbackFormValues = {
  text: string;
};

export default function UserFeedbackPage({
  navigation,
}: StackNavigationProps<SettingsRoutes, "UserFeedback">) {
  const [feedbackTxt, onChangeText] = React.useState("");

  const [{ refreshToken }, tokenDispatch] = useToken();
  const {
    account: { email },
  } = useAccountState();

  const submitFeedback: SubmitHandler<FeedbackFormValues> = async (
    formData: FeedbackFormValues
  ) => {
    await reportSuggestion(
      tokenDispatch,
      refreshToken,
      email,
      "Feedback from " + email,
      formData.text
    );
    navigation.goBack();
  };

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box style={styles.responseBox}>
        <Box style={styles.inputLabelBox}>
          <Text style={styles.inputLabel}>
            Want to send us feedback? Write your thoughts below and tap
            'Submit'. Let us know what you love, and what we can improve!
          </Text>
        </Box>
        <Box style={styles.textInputBound}>
          <TextInput
            style={styles.textInput}
            textAlignVertical="top"
            multiline
            onChangeText={(text) => onChangeText(text)}
            placeholder="Add feedback..."
            placeholderTextColor={theme.colors.primaryText}
            value={feedbackTxt}
          />
        </Box>
      </Box>
      <Box style={styles.buttonsBox}>
        <ThemedButton
          title="Cancel"
          onPress={() => {
            navigation.goBack();
          }}
          color="red"
        />
        <ThemedButton
          color={theme.colors.buttonSecondaryBackground}
          title="Submit"
          onPress={() => {
            const feedback: FeedbackFormValues = { text: feedbackTxt };
            submitFeedback(feedback);
          }}
        />
      </Box>
    </Box>
  );
}
