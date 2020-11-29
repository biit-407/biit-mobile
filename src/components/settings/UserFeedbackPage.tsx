import React from "react";
import { StyleSheet } from "react-native";
import { SubmitHandler } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";

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
import { ThemedInput } from "../themed";

export const UserFeedbackPageOptions = {
  title: "User Feedback",
  headerTransparent: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
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
      <ScrollView style={{ flexGrow: 1 }}>
        <Text variant="subheader" textAlign="center" mt="md">
          Want to send us feedback?
        </Text>
        <Text variant="body" textAlign="center" mt="md">
          Write your thoughts below and tap 'Submit'. Let us know what you love,
          and what we can improve!
        </Text>
        <Box m="md">
          <ThemedInput
            multiline
            onChangeText={(text) => onChangeText(text)}
            placeholder="Add feedback..."
            placeholderTextColor={theme.colors.primaryText}
            value={feedbackTxt}
          />
        </Box>
      </ScrollView>
      <ThemedButton
        title="Submit Feedback"
        onPress={() => {
          const feedback: FeedbackFormValues = { text: feedbackTxt };
          submitFeedback(feedback);
        }}
      />
    </Box>
  );
}
