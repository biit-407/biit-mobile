import React from "react";
import { Modal, StyleSheet } from "react-native";

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

export default function MeetupReportDialog({
  open,
  closeDialog,
  meetupID,
}: MeetupReportDialogProps) {
  // TODO: Add call to submit the report
  const submitReport = () => {
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
          />
        </Box>
        <Box m="lg">
          <ThemedButton title="Submit Report" onPress={submitReport} />
        </Box>
      </Box>
    </Modal>
  );
}
