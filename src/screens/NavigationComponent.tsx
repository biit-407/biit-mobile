import React from "react";
import { useAccountState } from "../contexts/accountContext";
import { useTokenState } from "../contexts/tokenContext";
import DrawerScreen from "./DrawerScreen";
import UnauthenticatedStackScreen from "./UnauthenticatedStackScreen";

interface NavigationComponentProps { }

const NavigationComponent = ({ }: NavigationComponentProps) => {
    const account = useAccountState();
    return (
        <>
            {account.account.email === '' ?
                <UnauthenticatedStackScreen />
                :
                <DrawerScreen />
            }
        </>
    );
};

export default NavigationComponent