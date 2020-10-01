export interface Community {
    name: string;
    codeofconduct: string;
    admins: string[];
    members: string[];
    mpm: number;
    meettype: number; // TODO convert to enum
}

/**
 * @description model used to send data to the communities endpoint
 */
export interface CommunityPOST {
    name: string;
    codeofconduct: string;
    admins: string[];
    members: string[];
    mpm: number;
    meettype: number; // TODO convert to enum
    token: string;
}

/**
 * @description model used to send data to the communities endpoint
 */
export interface CommunityGET {
    name: string;
    token: string;
}

/**
 * @description model used to send data to the communities endpoint
 */
export interface CommunityPUT {
    name: string;
    codeofconduct: string;
    admins: string[];
    members: string[];
    mpm: number;
    meettype: number; // TODO convert to enum
    token: string;
}

/**
 * @description model used to send data to the communities endpoint
 */
export interface CommunityDELETE {
    name: string;
    token: string;
}

/**
 * @description model used to send data to the communities endpoint
 */
export interface CommunityJoinPOST {
    name: string;
    email: string;
    token: string;
}

/**
 * @description model used to send data to the communities endpoint
 */
export interface CommunityLeavePOST {
    name: string;
    email: string;
    token: string;
}