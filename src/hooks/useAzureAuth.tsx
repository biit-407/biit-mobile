import {
  useAutoDiscovery,
  useAuthRequest,
  makeRedirectUri,
  AuthRequest,
  AuthRequestPromptOptions,
  AuthError,
  AuthSessionResult,
} from "expo-auth-session";

import { AZURE_TENANT_ID, AZURE_CLIENT_ID } from "../models";
type CompletedAzureAuthResponse = {
  type: "error" | "success";
  errorCode: string | null;
  error?: AuthError | null | undefined;
  params: { [key: string]: string };
  url: string;
};
type UseAzureAuthReturnType = [
  AuthRequest | null,
  { type: "cancel" | "dismiss" | "locked" } | CompletedAzureAuthResponse | null,
  (options?: AuthRequestPromptOptions | undefined) => Promise<AuthSessionResult>
];

/**
 * @description hook that creates request, response and function to get a Grant Token
 * from the microsoft azure server
 *
 * NOTE: this is the grant token not the access token
 *
 * @example
 * ```typescript
 * const component = () => {
 *
 *  const [request, response, promptAsync] = useAzureAuth()
 *
 *  return (
 *      <Button
 *          disabled={!request}
            title="Login"
            onPress={() => {
                promptAsync({useProxy: true});
            }}
 *      />
 *  )
 * }
 * ```
 *
 * @returns request used to create the Grant token, response from the oauth server,
 * function to send the request and populate the response. NOTE: response object will
 * be null until populated by the function that makes the request (aka the function
 * returned by this hook)
 */
const useAzureAuth = (): UseAzureAuthReturnType => {
  const discovery = useAutoDiscovery(
    `https://login.microsoftonline.com/${AZURE_TENANT_ID}/v2.0`
  );
  // Request
  return useAuthRequest(
    {
      clientId: AZURE_CLIENT_ID,
      scopes: [
        "openid",
        "profile",
        "email",
        "offline_access",
        "https://graph.microsoft.com/User.Read",
      ],
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        useProxy: true,
      }),
      usePKCE: false,
    },
    discovery
  );
};

export default useAzureAuth;
export { UseAzureAuthReturnType, CompletedAzureAuthResponse }; //eslint-disable-line no-undef
