/**
 * @description this is the JSON object returned from
 * calling the following azure endpoint
 * https://graph.microsoft.com/oidc/userinfo
 *
 * for more information on every field see the azure
 * documentation
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/userinfo
 */
export interface AzureUserInfo {
  sub: string;
  name: string;
  familyName: string;
  givenName: string;
  email: string;
}

export const BLANK_AZURE_USER_INFO: AzureUserInfo = {
  sub: "",
  name: "",
  familyName: "",
  givenName: "",
  email: "",
};

export interface OauthToken {
  refreshToken: string;
  accessToken: string;
}

export const BLANK_TOKEN: OauthToken = {
  refreshToken: '',
  accessToken: ''
}
