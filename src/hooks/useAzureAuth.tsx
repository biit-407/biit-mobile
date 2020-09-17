import {
  useAutoDiscovery,
  useAuthRequest,
  makeRedirectUri,
} from "expo-auth-session";

const AZURE_TENANT_ID = "4130bd39-7c53-419c-b1e5-8758d6d63f21";
const AZURE_CLIENT_ID = "c128fe76-dc54-4daa-993c-1a13c1e82080";

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
const useAzureAuth = () => {
  const discovery = useAutoDiscovery(
    `https://login.microsoftonline.com/${AZURE_TENANT_ID}/v2.0`
  );
  // Request
  return useAuthRequest(
    {
      clientId: AZURE_CLIENT_ID,
      scopes: ["openid", "profile", "email", "offline_access"],
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        useProxy: true,
      }),
    },
    discovery
  );
};

export default useAzureAuth;
