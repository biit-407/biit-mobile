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
    family_name: string;
    given_name: string;
    email: string
}