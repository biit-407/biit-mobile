import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { Header } from "react-native-elements";
import { Box } from "../themed";

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
}: MeetupReportDialogProps) {
  return (
    <Modal animationType="slide" visible={open} onRequestClose={closeDialog}>
      <Box backgroundColor="cardBackground" style={styles.root}>
        <Header
          placement="left"
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <TouchableHighlight
          onPress={() => {
            closeDialog();
          }}
        >
          <Text>Hello world</Text>
        </TouchableHighlight>
      </Box>
    </Modal>
  );
}
