import React from "react";

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
  RequestHandler,
  ResponseJsonType,
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

interface AccountAuthenticatedResponseJson
  extends AuthenticatedResponseJsonType {
  lname: string;
  fname: string;
  email: string;
}

function mapAccountResponseJson(
  responseJson: AccountAuthenticatedResponseJson
): Account {
  return {
    fname: responseJson.fname,
    lname: responseJson.lname,
    email: responseJson.email,
  };
}

interface AccountAuthenticatedDataResponseJson
  extends AuthenticatedResponseJsonType {
  data: {
    lname: string;
    fname: string;
    email: string;
  };
}

function mapAccountDataResponseJson(
  responseJson: AccountAuthenticatedDataResponseJson
): Account {
  return {
    fname: responseJson.data.fname,
    lname: responseJson.data.lname,
    email: responseJson.data.email,
  };
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

    return RequestHandler.delete<boolean, ResponseJsonType, Json>(
      endpoint,
      (responseJson) => responseJson.status_code === 200
    );
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
    (response) => {
      if (response) {
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
};
