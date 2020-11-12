import React from "react";
import * as FileSystem from "expo-file-system";

import { Account, BLANK_ACCOUNT } from "../models/accounts";
import {
  BLANK_AZURE_USER_INFO,
  BLANK_TOKEN,
  OauthToken,
} from "../models/azure";
import { SERVER_ADDRESS } from "../models/constants";
import {
  AuthenticatedRequestHandler,
  AuthenticatedResponseJsonType,
  Json,
} from "../utils/requestHandler";

import { Dispatch as TokenDispatch } from "./tokenContext";
import { Dispatch as AzureDispatch } from "./azureContext";

type AccountStatus = "logged out" | "logged in" | "updating" | "error";

type AccountState = {
  account: Account;
  status: AccountStatus;
  error: string;
};

type ActionType =
  | "start update"
  | "finish update"
  | "fail update"
  | "invalidate";
type Action = {
  type: ActionType;
  account: Account;
  error: string;
};

type Dispatch = (action: Action) => void;

type AccountProviderProps = {
  children: React.ReactNode;
};

const AccountStateContext = React.createContext<AccountState | undefined>(
  undefined
);
const AccountDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

const PROFILE_PICTURE_LOCATION = (): string => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const hhmmss =
    String(today.getHours()) +
    String(today.getMinutes()) +
    String(today.getSeconds());

  return FileSystem.documentDirectory + mm + dd + hhmmss + "profilepicture.jpg";
};

interface AccountAuthenticatedResponseJson
  extends AuthenticatedResponseJsonType {
  lname: string;
  fname: string;
  email: string;
  birthday?: string;
  agePref?: number[];
  schedule?: string[];
  optIn?: number;
  meetType?: string;
  meetLength?: number;
  meetGroup?: number;
  covid?: string;
}

function mapAccountResponseJson(
  responseJson: AccountAuthenticatedResponseJson
): Account {
  return {
    fname: responseJson.fname,
    lname: responseJson.lname,
    email: responseJson.email,
    birthday: responseJson.birthday,
    agePref: responseJson.agePref,
    schedule: responseJson.schedule,
    optIn: responseJson.optIn,
    meetType: responseJson.meetType,
    meetLength: responseJson.meetLength,
    meetGroup: responseJson.meetGroup,
    covid: responseJson.covid,
  };
}

interface AccountAuthenticatedDataResponseJson
  extends AuthenticatedResponseJsonType {
  data: {
    lname: string;
    fname: string;
    email: string;
    birthday?: string;
    agePref?: number[];
    schedule?: string[];
    optIn?: number;
    meetType?: string;
    meetLength?: number;
    meetGroup?: number;
    covid?: string;
  };
}

function mapAccountDataResponseJson(
  responseJson: AccountAuthenticatedDataResponseJson
): Account {
  return {
    fname: responseJson.data.fname,
    lname: responseJson.data.lname,
    email: responseJson.data.email,
    birthday: responseJson.data.birthday,
    agePref: responseJson.data.agePref,
    schedule: responseJson.data.schedule,
    optIn: responseJson.data.optIn,
    meetType: responseJson.data.meetType,
    meetLength: responseJson.data.meetLength,
    meetGroup: responseJson.data.meetGroup,
    covid: responseJson.data.covid,
  };
}

interface AccountAuthenticatedProfileResponseJson
  extends AuthenticatedResponseJsonType {
  data: string;
}

function mapAccountProfileResponseJson(
  responseJson: AccountAuthenticatedProfileResponseJson
): string {
  return responseJson.data;
}

interface AccountCreateJson extends Json {
  lname: string;
  fname: string;
  email: string;
  token: string;
}

function accountReducer(
  accountState: AccountState,
  action: Action
): AccountState {
  switch (action.type) {
    case "start update": {
      // request has been made but not completed
      return {
        account: accountState.account,
        status: "updating",
        error: "Updating account information",
      };
    }
    case "finish update": {
      // 200 response from server
      return {
        account: { ...accountState.account, ...action.account },
        status: "logged in",
        error: "Successfully logged in account",
      };
    }
    case "fail update": {
      // Don't invalidate the account but don't update the account either
      // example usage: 500 response
      return {
        account: accountState.account,
        status: "error",
        error: `Unable to update account: ${action.error}`,
      };
    }
    case "invalidate": {
      // remove the account from memory, force the user to log in again
      return {
        account: BLANK_ACCOUNT,
        status: "logged out",
        error: "No account is logged in",
      };
    }
  }
}

function AccountProvider({ children }: AccountProviderProps) {
  const [state, dispatch] = React.useReducer(accountReducer, {
    account: BLANK_ACCOUNT,
    status: "logged out",
    error: "",
  });
  return (
    <AccountStateContext.Provider value={state}>
      <AccountDispatchContext.Provider value={dispatch}>
        {children}
      </AccountDispatchContext.Provider>
    </AccountStateContext.Provider>
  );
}

function useAccountState(): AccountState {
  const context: AccountState | undefined = React.useContext(
    AccountStateContext
  );
  if (context === undefined) {
    throw new Error("useAccountState must be used within a AccountProvider");
  }
  return context as AccountState;
}

function useAccountDispatch(): Dispatch {
  const context: Dispatch | undefined = React.useContext(
    AccountDispatchContext
  );
  if (context === undefined) {
    throw new Error("useAccountDispatch must be used within a AccountProvider");
  }
  return context as Dispatch;
}

function useAccount(): [AccountState, Dispatch] {
  return [useAccountState(), useAccountDispatch()];
}

class AccountClient {
  public static async create(
    token: string,
    account: Account
  ): Promise<[Account, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/account`;
    return AuthenticatedRequestHandler.post<
      Account,
      AccountAuthenticatedResponseJson,
      AccountCreateJson
    >(endpoint, mapAccountResponseJson, { ...account, token: token });
  }

  public static async get(
    token: string,
    email: string
  ): Promise<[Account, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/account?email=${email}&token=${token}`;
    return AuthenticatedRequestHandler.get<
      Account,
      AccountAuthenticatedDataResponseJson,
      Json
    >(endpoint, mapAccountDataResponseJson);
  }

  public static async update(
    token: string,
    { account, updates }: { account: Account; updates: Account }
  ): Promise<[Account, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/account?email=${
      account.email
    }&token=${token}&updateFields=${JSON.stringify(updates)}`;
    return AuthenticatedRequestHandler.put<
      Account,
      AccountAuthenticatedResponseJson,
      Json
    >(endpoint, mapAccountResponseJson);
  }

  public static async delete(token: string, email: string): Promise<boolean> {
    const endpoint = `${SERVER_ADDRESS}/account?email=${email}&token=${token}`;
    return await fetch(endpoint, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.ok;
    });
    // TODO when server response is fixed go back to this
    // return RequestHandler.delete<boolean, ResponseJsonType, Json>(
    //   endpoint,
    //   (responseJson) => {
    //     return responseJson.status_code === 200
    //   }
    // );
  }

  public static async setProfilePicture(
    token: string,
    { email, filepath }: { email: string; filepath: string }
  ): Promise<[boolean, OauthToken]> {
    const signature = await FileSystem.readAsStringAsync(filepath, {
      encoding: "base64",
    });
    const formData = new FormData();
    formData.append("email", email);
    formData.append("token", token);
    formData.append("file", signature);
    formData.append("filename", `${email}.jpg`);
    return await fetch(`${SERVER_ADDRESS}/profile`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return [
          responseJson.status_code === 200,
          {
            refreshToken: responseJson.refresh_token,
            accessToken: responseJson.access_token,
          },
        ];
      });
  }

  public static async getProfilePicture(
    token: string,
    email: string
  ): Promise<[string | boolean, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/profile?email=${email}&token=${token}&filename=${email}.jpg`;
    return AuthenticatedRequestHandler.get<
      string,
      AccountAuthenticatedProfileResponseJson,
      Json
    >(endpoint, mapAccountProfileResponseJson);
  }
}

async function _accountHelper<T, R>(
  accountDispatch: Dispatch,
  token: string,
  account: T,
  requestFunc: (token: string, account: T) => Promise<R>,
  handleResponse: (response: R) => void
) {
  accountDispatch({
    type: "start update",
    account: BLANK_ACCOUNT,
    error: "failed to create account",
  });

  try {
    const response: R = await requestFunc(token, account);
    handleResponse(response);
  } catch (error) {
    accountDispatch({
      type: "fail update",
      account: BLANK_ACCOUNT,
      error: "failed to create account",
    });
  }
}

async function createAccount(
  dispatch: Dispatch,
  token: string,
  account: Account,
  tokenDispatch: TokenDispatch
) {
  await _accountHelper<Account, [Account, OauthToken]>(
    dispatch,
    token,
    account,
    AccountClient.create,
    (response) => {
      dispatch({
        type: "finish update",
        account: response[0],
        error: "successfully created account",
      });
      tokenDispatch({
        type: "set",
        refreshToken: response[1].refreshToken,
        accessToken: response[1].accessToken,
      });
    }
  );
}

async function getAccount(
  accountDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  email: string
) {
  await _accountHelper<string, [Account, OauthToken]>(
    accountDispatch,
    token,
    email,
    AccountClient.get,
    (response) => {
      tokenDispatch({ ...response[1], type: "set" });
      accountDispatch({
        type: "finish update",
        account: response[0],
        error: "Successfully got account",
      });
    }
  );
}

async function updateAccount(
  accountDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  account: Account,
  updates: Account
) {
  console.log("before update");
  console.log(updates);
  await _accountHelper<
    { account: Account; updates: Account },
    [Account, OauthToken]
  >(
    accountDispatch,
    token,
    { account, updates },
    AccountClient.update,
    (response) => {
      tokenDispatch({ ...response[1], type: "set" });
      accountDispatch({
        type: "finish update",
        account: response[0],
        error: "Successfully updated account",
      });
    }
  );
}

async function deleteAccount(
  accountDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  azureDispatch: AzureDispatch,
  token: string,
  account: Account
) {
  await _accountHelper<string, boolean>(
    accountDispatch,
    token,
    account.email,
    AccountClient.delete,
    async (response) => {
      if (response) {
        if (account.profileImage) {
          const file = await FileSystem.getInfoAsync(account.profileImage);
          if (file.exists) {
            await FileSystem.deleteAsync(account.profileImage);
          }
        }

        tokenDispatch({ ...BLANK_TOKEN, type: "clear" });
        azureDispatch({
          type: "invalidate",
          ...BLANK_TOKEN,
          grantToken: "",
          userInfo: BLANK_AZURE_USER_INFO,
        });
        accountDispatch({
          type: "invalidate",
          account: BLANK_ACCOUNT,
          error: "successfully deleted account",
        });
      } else {
        accountDispatch({
          type: "fail update",
          account: account,
          error: "failed to delete account",
        });
      }
    }
  );
}

async function logoutAccount(
  accountDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  azureDispatch: AzureDispatch
) {
  tokenDispatch({ ...BLANK_TOKEN, type: "clear" });
  azureDispatch({
    type: "invalidate",
    ...BLANK_TOKEN,
    grantToken: "",
    userInfo: BLANK_AZURE_USER_INFO,
  });
  accountDispatch({
    type: "invalidate",
    account: BLANK_ACCOUNT,
    error: "Failed to logout account",
  });
}

async function setProfilePicture(
  accountDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  account: Account,
  filepath: string
) {
  await _accountHelper<
    { email: string; filepath: string },
    [boolean, OauthToken]
  >(
    accountDispatch,
    token,
    { email: account.email, filepath },
    AccountClient.setProfilePicture,
    async (response) => {
      tokenDispatch({ ...response[1], type: "clear" });
      if (response[0]) {
        const content = await FileSystem.readAsStringAsync(filepath, {
          encoding: "base64",
        });
        const location = PROFILE_PICTURE_LOCATION();
        if (account.profileImage) {
          const file = await FileSystem.getInfoAsync(account.profileImage);
          if (file.exists) {
            await FileSystem.deleteAsync(account.profileImage);
          }
        }
        await FileSystem.writeAsStringAsync(location, content, {
          encoding: "base64",
        });
        accountDispatch({
          type: "finish update",
          account: { ...account, profileImage: location },
          error: "Successfully updated profile image",
        });
      }
    }
  );
}

async function getProfilePicture(
  accountDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  account: Account
) {
  await _accountHelper<string, [string | boolean, OauthToken]>(
    accountDispatch,
    token,
    account.email,
    AccountClient.getProfilePicture,
    async (response) => {
      tokenDispatch({ ...response[1], type: "clear" });
      const location = PROFILE_PICTURE_LOCATION();
      if (account.profileImage) {
        const file = await FileSystem.getInfoAsync(account.profileImage);
        if (file.exists) {
          await FileSystem.deleteAsync(account.profileImage);
        }
      }
      if (typeof response[0] === "string") {
        // picture successfully loaded
        await FileSystem.writeAsStringAsync(location, response[0] as string, {
          encoding: "base64",
        });
        accountDispatch({
          type: "finish update",
          account: { ...account, profileImage: location },
          error: "Successfully updated profile image",
        });
      } else {
        accountDispatch({
          type: "finish update",
          account: { ...account, profileImage: "" },
          error: "Request succeeded, no profile image was found",
        });
      }
    }
  );
}

async function reportUser(
  tokenDispatch: TokenDispatch,
  token: string,
  email: string,
  user: string,
  text: string
) {
  const response: [boolean, OauthToken] = await fetch(
    `${SERVER_ADDRESS}/feedback`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        token: token,
        feedback_type: 2, // eslint-disable-line camelcase
        feedback_status: 1, // eslint-disable-line camelcase
        title: `Reporting ${user} for misconduct`,
        text: text,
      }),
    }
  )
    .then((r) => r.json())
    .then((responseJson) => {
      return [
        responseJson.status_code === 200,
        {
          accessToken: responseJson.access_token,
          refreshToken: responseJson.refresh_token,
        },
      ];
    });

  tokenDispatch({ type: "set", ...response[1] });
  return response[0];
}

async function reportBug(
  tokenDispatch: TokenDispatch,
  token: string,
  email: string,
  title: string,
  text: string
) {
  const response: [boolean, OauthToken] = await fetch(
    `${SERVER_ADDRESS}/feedback`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        token: token,
        feedback_type: 0, // eslint-disable-line camelcase
        feedback_status: 1, // eslint-disable-line camelcase
        title: title,
        text: text,
      }),
    }
  )
    .then((r) => r.json())
    .then((responseJson) => {
      return [
        responseJson.status_code === 200,
        {
          accessToken: responseJson.access_token,
          refreshToken: responseJson.refresh_token,
        },
      ];
    });

  tokenDispatch({ type: "set", ...response[1] });
  return response[0];
}

async function reportSuggestion(
  tokenDispatch: TokenDispatch,
  token: string,
  email: string,
  title: string,
  text: string
) {
  const response: [boolean, OauthToken] = await fetch(
    `${SERVER_ADDRESS}/feedback`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        token: token,
        feedback_type: 1, // eslint-disable-line camelcase
        feedback_status: 1, // eslint-disable-line camelcase
        title: title,
        text: text,
      }),
    }
  )
    .then((r) => r.json())
    .then((responseJson) => {
      return [
        responseJson.status_code === 200,
        {
          accessToken: responseJson.access_token,
          refreshToken: responseJson.refresh_token,
        },
      ];
    });

  tokenDispatch({ type: "set", ...response[1] });
  return response[0];
}

export {
  useAccount,
  AccountProvider,
  createAccount,
  getAccount,
  updateAccount,
  deleteAccount,
  useAccountDispatch,
  useAccountState,
  logoutAccount,
  setProfilePicture,
  getProfilePicture,
  reportUser,
  reportBug,
  reportSuggestion,
};
