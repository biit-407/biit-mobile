/**
 * @description model used to send data to the Account
 * POST endpoint. for more information see the documentation
 * here https://github.com/biit-407/biit-server/wiki/Endpoints#account
 * 
 * @field fname: the first name of the user on the account
 * @field lname: the last name of the user on the account
 * @field email: the email of the user on the account 
 * @field refresh_token: the active refresh token (used for 
 * account validation on server side)
 * 
 * *NOTE*: Currently all of these fields should be derived from Azure
 */
export interface AccountPOST {
    fname: string;
    lname: string;
    email: string;
    refresh_token: string;
}