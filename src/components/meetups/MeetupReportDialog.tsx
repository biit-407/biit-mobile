import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal, StyleSheet } from "react-native";

import { reportUser, useAccountState } from "../../contexts/accountContext";
import { useToken } from "../../contexts/tokenContext";
import { Box, Text, ThemedButton, ThemedIcon, ThemedInput } from "../themed";

type MeetupReportDialogProps = {
  open: boolean;
  closeDialog: () => void;
  meetupID: string;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

type FormValues = {
  report: string;
};

const formErrors = {
  report: "Report cannot be empty",
};

export default function MeetupReportDialog({
  open,
  closeDialog,
  meetupID,
}: MeetupReportDialogProps) {
  const { register, handleSubmit, setValue, errors } = useForm<FormValues>({
    defaultValues: {
      report: "",
    },
  });

  useEffect(() => {
    register("report", { required: true, minLength: 1 });
  }, [register]);

  const [{ refreshToken }, tokenDispatch] = useToken();
  const {
    account: { email },
  } = useAccountState();

  // TODO: Add call to submit the report

  const submitReport: SubmitHandler<FormValues> = async (
    formData: FormValues
  ) => {
    await reportUser(
      tokenDispatch,
      refreshToken,
      email,
      meetupID,
      formData.report
    );
    closeDialog();
  };

  return (
    <Modal animationType="slide" visible={open} onRequestClose={closeDialog}>
      <Box backgroundColor="cardBackground" style={styles.root}>
        <Box flexGrow={1} width="100%" flex={1} alignItems="center">
          <Box
            width="100%"
            mt="lg"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box ml="md">
              <ThemedIcon type="entypo" name="cross" color="transparent" />
            </Box>
            <Text variant="header" textAlign="center">
              Report Meetup
            </Text>
            <Box mr="md">
              <ThemedIcon type="entypo" name="cross" onPress={closeDialog} />
            </Box>
          </Box>
          <Box width="85%">
            <Text variant="subheader" textAlign="center" mb="sm">
              {meetupID}
            </Text>
            <Text variant="body" mb="sm">
              We're sorry your meetup didn't go as planned. Please provide as
              much detail as you can in your report.
            </Text>
          </Box>

          <ThemedInput
            multiline
            containerStyle={{ width: "85%" }}
            placeholder="Details about your report..."
            onChangeText={(text) => {
              setValue("report", text);
            }}
            errorMessage={errors.report ? formErrors.report : ""}
          />
        </Box>
        <Box m="lg">
          <ThemedButton
            title="Submit Report"
            onPress={handleSubmit(submitReport)}
          />
        </Box>
      </Box>
    </Modal>
  );
}
