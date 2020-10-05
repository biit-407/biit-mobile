import { useState, useEffect } from "react";

import { AzureUserInfo } from "../models";

/**
 * @description hook that uses an access token to get user information from the
 * microsoft azure api
 *
 * @example
 * ```typescript
 * const myToken = "ABC123..."
 *
 * const component = () => {
 *   const [setAccessToken, userInfo] = useAzureUserInfo()
 *
 *   return (
 *     <>
 *       <Button title="get" onClick={e => setAccessToken(myToken)} />
 *       <Text>{userInfo?.name}</Text>
 *     </>
 *   )
 * }
 * ```
 *
 * @returns a function to set the access token and the json blob returned from the
 * UserInfo api. NOTE: the json blob is set to null until a successful call to the
 * api has been made
 */
const useAzureUserInfo = (): [
  React.Dispatch<React.SetStateAction<string | null>>,
  null | AzureUserInfo
] => {
  const [accessToken, setAccessToken] = useState<null | string>(null);
  const [userInfo, setUserInfo] = useState<null | AzureUserInfo>(null);

  useEffect(() => {
    if (accessToken) {
      // build and make request
      fetch("https://graph.microsoft.com/oidc/userinfo", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setUserInfo({
            name: responseJson.name,
            familyName: responseJson.family_name,
            givenName: responseJson.given_name,
            email: responseJson.email,
            sub: responseJson.sub,
          });
        });
    }
  }, [accessToken]);

  return [setAccessToken, userInfo];
};

export default useAzureUserInfo;
