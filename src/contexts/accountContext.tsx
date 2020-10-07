import React from "react";

import { Account, BLANK_ACCOUNT } from "../models/accounts";
import {
  BLANK_AZURE_USER_INFO,
  BLANK_TOKEN,
  OauthToken,
} from "../models/azure";
import { SERVER_ADDRESS } from "../models/constants";

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
    return await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...account, token: token }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return [
          {
            lname: responseJson.lname,
            fname: responseJson.fname,
            email: responseJson.email,
          } as Account,
          {
            refreshToken: responseJson.refresh_token,
            accessToken: responseJson.access_token,
          },
        ];
      });
  }

  public static async get(
    token: string,
    email: string
  ): Promise<[Account, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/account?email=${email}&token=${token}`;

    return await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return [
          {
            fname: responseJson.data.fname,
            lname: responseJson.data.lname,
            email: responseJson.data.email,
          } as Account,
          {
            refreshToken: responseJson.refresh_token,
            accessToken: responseJson.access_token,
          },
        ];
      });
  }

  public static async update(
    token: string,
    account: Account,
    updates: Account
  ): Promise<[Account, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/account?email=${
      account.email
    }&token=${token}&updateFields=${JSON.stringify(updates)}`;

    return await fetch(endpoint, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => [
        {
          lname: responseJson.lname,
          fname: responseJson.fname,
          email: responseJson.email,
        } as Account,
        {
          refreshToken: responseJson.refresh_token,
          accessToken: responseJson.access_token,
        },
      ]);
  }

  public static async delete(token: string, email: string): Promise<boolean> {
    const endpoint = `${SERVER_ADDRESS}/account?email=${email}&token=${token}`;

    return await fetch(endpoint, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.ok);
  }
}

async function createAccount(
  dispatch: Dispatch,
  token: string,
  account: Account,
  tokenDispatch: TokenDispatch
) {
  dispatch({
    type: "start update",
    account: account,
    error: "failed to create account",
  });

  try {
    const [createdAccount, newTokens]: [
      Account,
      { refreshToken: string; accessToken: string }
    ] = await AccountClient.create(token, account);
    dispatch({
      type: "finish update",
      account: createdAccount,
      error: "successfully created account",
    });
    tokenDispatch({
      type: "set",
      refreshToken: newTokens.refreshToken,
      accessToken: newTokens.accessToken,
    });
  } catch (error) {
    dispatch({
      type: "fail update",
      account: account,
      error: "failed to create account",
    });
  }
}

async function getAccount(
  accountDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  email: string
) {
  accountDispatch({
    type: "start update",
    account: BLANK_ACCOUNT,
    error: "failed to create account",
  });

  try {
    const [account, newToken] = await AccountClient.get(token, email);
    tokenDispatch({ ...newToken, type: "set" });
    accountDispatch({
      type: "finish update",
      account: account,
      error: "Successfully got account",
    });
  } catch (error) {
    accountDispatch({
      type: "fail update",
      account: BLANK_ACCOUNT,
      error: "Failed to get account",
    });
  }
}

async function updateAccount(
  accountDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  account: Account,
  updates: Account
) {
  accountDispatch({
    type: "start update",
    account: account,
    error: "failed to update account",
  });

  try {
    const [updatedAccount, newToken] = await AccountClient.update(
      token,
      account,
      updates
    );
    tokenDispatch({ ...newToken, type: "set" });
    accountDispatch({
      type: "finish update",
      account: updatedAccount,
      error: "successfully updated account",
    });
  } catch (error) {
    accountDispatch({
      type: "fail update",
      account: account,
      error: "failed to update account",
    });
  }
}

async function deleteAccount(
  accountDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  azureDispatch: AzureDispatch,
  token: string,
  account: Account
) {
  accountDispatch({
    type: "start update",
    account: account,
    error: "failed to delete account",
  });
  try {
    const success = await AccountClient.delete(token, account.email);
    if (success) {
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
  } catch (error) {
    accountDispatch({
      type: "fail update",
      account: account,
      error: "failed to delete account",
    });
  }
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
