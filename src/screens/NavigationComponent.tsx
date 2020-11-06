import React from "react";

import { useAccountState } from "../contexts/accountContext";

import DrawerScreen from "./DrawerScreen";
import UnauthenticatedStackScreen from "./UnauthenticatedStackScreen";

const NavigationComponent = () => {
  const account = useAccountState();
  console.log(account);
  return (
    <>
      {account.account.email === "" ? (
        <UnauthenticatedStackScreen />
      ) : (
        <DrawerScreen />
      )}
    </>
  );
};

export default NavigationComponent;
