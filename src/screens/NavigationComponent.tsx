import React from "react";
import SnackBar from "react-native-snackbar-component";
import { YellowBox } from "react-native";

import { useAccountState } from "../contexts/accountContext";
import { useSnackbarState } from "../contexts/snackbarContext";

import DrawerScreen from "./DrawerScreen";
import UnauthenticatedStackScreen from "./UnauthenticatedStackScreen";

// I hate having to add this but its the only way to not get spammed by warnings
YellowBox.ignoreWarnings([
  "Animated: `useNativeDriver` was not specified. " +
    "This is a required option and must be explicitly set to`true` or`false`",
]);

const NavigationComponent = () => {
  const account = useAccountState();
  const { snackbarVisible, snackbarMessage } = useSnackbarState();

  return (
    <>
      {account.account.email === "" ? (
        <UnauthenticatedStackScreen />
      ) : (
        <DrawerScreen />
      )}
      <SnackBar
        visible={snackbarVisible}
        textMessage={snackbarMessage}
        actionText={"Dismiss"}
      />
    </>
  );
};

export default NavigationComponent;
