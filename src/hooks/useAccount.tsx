import { useEffect, useState } from "react";
import SecureStore from "expo-secure-store";

import {
  Account,
  AccountDELETE,
  AccountGET,
  AccountPOST,
  AccountPUT,
} from "../models/accounts";
import { SERVER_ADDRESS } from "../models/constants";

/**
 * @description hook for accessing an account and any relevant
 * functionality designated with it (REST API methods)
 *
 */
const useAccount = (): [
  Account | null,
  (fields: AccountPOST) => Promise<void>,
  (fields: AccountGET) => Promise<void>,
  () => Promise<void>,
  (fields: AccountPUT) => Promise<void>,
  (fields: AccountDELETE) => Promise<void>
] => {
  const [account, setAccount] = useState<Account | null>(null);

  const _cacheAccount = async (cachedAccount: Account | null = null) => {
    await SecureStore.setItemAsync(
      "biit-account",
      JSON.stringify(cachedAccount)
    );
  };

  useEffect(() => {
    // this is an interesting piece of code for running async code within
    // React.useEffect for more information on how this works see
    // https://rb.gy/7pfo3v
    const _loadAccount = async () => {
      const storedAccount = await SecureStore.getItemAsync("biit-account");
      setAccount(storedAccount !== null ? JSON.parse(storedAccount) : null);
    };

    // if the account is null then we attempt to load it from the devices
    // internal storage.
    if (account === null) {
      _loadAccount();
    }

    // we always update the internal storage with the most up to
    // date information we have on the account. this includes an
    // account that is null or logged out
    _cacheAccount(account);
  }, [account]);

  /**
   * @description creates a new account with the given information
   * the account is then saved to this hooks state
   *
   * @param fields the data to send in the request to the server
   */
  async function createAccount(fields: AccountPOST) {
    const endpoint = `${SERVER_ADDRESS}/account`;
    const body = JSON.stringify(fields);
    return await fetch(endpoint, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: body,
    })
      .then((response) => {
        if (response.status !== 200) {
          //! premptive error handling here
        }
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status_code === 200) {
          setAccount({
            fname: responseJson.fname,
            lname: responseJson.lname,
            email: responseJson.email,
            accessToken: responseJson.access_token,
            refreshToken: responseJson.refresh_token,
          });
        }
      })
      .catch((error) => {
        // TODO add proper error handling here (most likely user notification)
        console.log(error);
        setAccount(null);
      });
  }

  /**
   * @description authenticates an account on the server and returns
   * all relevant information related to that account
   *
   * @param fields the data to send in the request to the server
   */
  const loginAccount = async (fields: AccountGET) => {
    const endpoint = `${SERVER_ADDRESS}/account?email=${fields.email}&refresh_token=${fields.token}`;

    return await fetch(endpoint)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code === 200) {
          setAccount({
            fname: responseJson.fname,
            lname: responseJson.lname,
            email: responseJson.email,
            accessToken: responseJson.access_token,
            refreshToken: responseJson.refresh_token,
          });
        }
      })
      .catch((error) => {
        // TODO add proper error handling here (most likely user notification)
        console.log(error);
        setAccount(null);
      });
  };

  /**
   * @description logs out the current account. calling this function
   * will require the user to re authenticate their account
   */
  const logoutAccount = async () => {
    // remove the account from the cache, forcing the user to
    // re-enter their credentials (azure oauth)
    _cacheAccount(null);
  };

  /**
   * @description updates the information associated with this account
   *
   * @param fields the data to send in the request to the server
   */
  const updateAccount = async (fields: AccountPUT) => {
    const endpoint = `${SERVER_ADDRESS}/account?email=${fields.email}&refresh_token=${fields.token}`;

    return await fetch(endpoint, { body: JSON.stringify(fields) })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code === 200) {
          setAccount({
            fname: responseJson.fname,
            lname: responseJson.lname,
            email: responseJson.email,
            accessToken: responseJson.access_token,
            refreshToken: responseJson.refresh_token,
          });
        }
      })
      .catch((error) => {
        // TODO add proper error handling here (most likely user notification)
        console.log(error);
        setAccount(null);
      });
  };

  /**
   * @description deletes this account permanently
   *
   * @param fields the data to send in the request to the server
   */
  const deleteAccount = async (fields: AccountDELETE) => {
    const endpoint = `${SERVER_ADDRESS}/account?email=${fields.email}&refresh_token=${fields.token}`;

    return await fetch(endpoint)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status_code === 200) {
          // TODO notify user

          // specifically remove the account from the cache
          _cacheAccount(null);
        }
      })
      .catch((error) => {
        // TODO add proper error handling here (most likely user notification)
        console.log(error);
        setAccount(null);
      });
  };

  return [
    account,
    createAccount,
    loginAccount,
    logoutAccount,
    updateAccount,
    deleteAccount,
  ];
};

export default useAccount;
