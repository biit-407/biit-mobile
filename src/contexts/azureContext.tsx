import React from "react";

import { AzureUserInfo, AZURE_CLIENT_ID, AZURE_TENANT_ID } from "../models";
import { BLANK_AZURE_USER_INFO } from "../models/azure";

type AzureState = {
  grantToken: string;
  accessToken: string;
  refreshToken: string;
  userInfo: AzureUserInfo;
};

type ActionType =
  | "set grant token"
  | "set tokens"
  | "set user info"
  | "invalidate";
type Action = {
  type: ActionType;
  grantToken: string;
  accessToken: string;
  refreshToken: string;
  userInfo: AzureUserInfo;
};

export type Dispatch = (action: Action) => void;

type AzureProviderProps = {
  children: React.ReactNode;
};

const AzureStateContext = React.createContext<AzureState | undefined>(
  undefined
);
const AzureDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function azureReducer(state: AzureState, action: Action): AzureState {
  switch (action.type) {
    case "set grant token": {
      return { ...state, grantToken: action.grantToken };
    }
    case "set tokens": {
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    }
    case "set user info": {
      return { ...state, userInfo: action.userInfo };
    }
    case "invalidate": {
      return {
        ...state,
        userInfo: BLANK_AZURE_USER_INFO,
        grantToken: "",
        refreshToken: "",
        accessToken: "",
      };
    }
  }
}

function AzureProvider({ children }: AzureProviderProps) {
  const [state, dispatch] = React.useReducer(azureReducer, {
    grantToken: "",
    accessToken: "",
    refreshToken: "",
    userInfo: BLANK_AZURE_USER_INFO,
  });
  return (
    <AzureStateContext.Provider value={state}>
      <AzureDispatchContext.Provider value={dispatch}>
        {children}
      </AzureDispatchContext.Provider>
    </AzureStateContext.Provider>
  );
}

function useAzureState(): AzureState {
  const context: AzureState | undefined = React.useContext(AzureStateContext);
  if (context === undefined) {
    throw new Error("useAzureState must be used within a AzureProvider");
  }
  return context as AzureState;
}

function useAzureDispatch(): Dispatch {
  const context: Dispatch | undefined = React.useContext(AzureDispatchContext);
  if (context === undefined) {
    throw new Error("useAzureDispatch must be used within a AzureProvider");
  }
  return context as Dispatch;
}

function useAzure(): [AzureState, Dispatch] {
  return [useAzureState(), useAzureDispatch()];
}

class AzureClient {
  public static async requestTokens(
    grantToken: string
  ): Promise<{ refreshToken: string; accessToken: string }> {
    const url = `https://login.microsoftonline.com/${AZURE_TENANT_ID}/oauth2/v2.0/token`;
    const body: { [index: string]: string } = {
      grant_type: "authorization_code", // eslint-disable-line camelcase
      client_id: AZURE_CLIENT_ID, // eslint-disable-line camelcase
      scope: "https://graph.microsoft.com/User.Read",
      code: grantToken,
      redirect_uri: "https://auth.expo.io/@biit/biit-mobile", // eslint-disable-line camelcase
    };
    // console.log(grantToken)
    const formBodyStr = Object.keys(body)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(body[key])
      )
      .join("&");

    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBodyStr,
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        return {
          accessToken: responseJson.access_token,
          refreshToken: responseJson.refresh_token,
        };
      });
  }

  public static async requestUserInfo(
    accessToken: string
  ): Promise<AzureUserInfo> {
    return await fetch("https://graph.microsoft.com/oidc/userinfo", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return {
          name: responseJson.name,
          familyName: responseJson.family_name,
          givenName: responseJson.given_name,
          email: responseJson.email,
          sub: responseJson.sub,
        } as AzureUserInfo;
      });
  }
}

async function requestTokens(dispatch: Dispatch, state: AzureState) {
  try {
    const tokens = await AzureClient.requestTokens(state.grantToken);
    // console.log(tokens)
    dispatch({
      ...state,
      type: "set tokens",
      refreshToken: tokens.refreshToken,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    console.log(error);
    dispatch({ ...state, type: "invalidate" });
  }
}

async function requestUserInfo(dispatch: Dispatch, state: AzureState) {
  try {
    const userInfo = await AzureClient.requestUserInfo(state.accessToken);
    dispatch({ ...state, type: "set user info", userInfo: userInfo });
  } catch (error) {
    dispatch({ ...state, type: "invalidate" });
  }
}

export { useAzure, AzureProvider, requestTokens, requestUserInfo };
