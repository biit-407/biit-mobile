import React from "react";

import { OauthToken } from "../models/azure";
import { Ban, BLANK_COMMUNITY, Community } from "../models/community";
import { SERVER_ADDRESS } from "../models/constants";
import {
  AuthenticatedRequestHandler,
  AuthenticatedResponseJsonType,
} from "../utils/requestHandler";

import { Dispatch as TokenDispatch } from "./tokenContext";

type CommunityStatus = "not loaded" | "loaded" | "updating" | "error";

type CommunityState = {
  communities: Community[];
  status: CommunityStatus;
  error: string;
};
type ActionType =
  | "start update"
  | "fail update"
  | "finish update"
  | "invalidate";
type Action = {
  type: ActionType;
  community: Community;
  error: string;
};
type Dispatch = (action: Action) => void;
type CommunityProviderProps = {
  children: React.ReactNode;
};

interface CommunityAuthenticatedResponseJson
  extends AuthenticatedResponseJsonType {
  data: {
    name: string;
    codeofconduct: string;
    Admins: string[];
    Members: string[];
    bans: Ban[];
    mpm: string;
    meettype: string;
  };
}

function mapCommunityResponseJson(
  responseJson: CommunityAuthenticatedResponseJson
) {
  return {
    name: responseJson.data.name,
    codeofconduct: responseJson.data.codeofconduct,
    Admins: responseJson.data.Admins,
    Members: responseJson.data.Members,
    bans: responseJson.data.bans,
    mpm: responseJson.data.mpm,
    meettype: responseJson.data.meettype,
  };
}

const CommunityStateContext = React.createContext<CommunityState | undefined>(
  undefined
);
const CommunityDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function communityReducer(
  state: CommunityState,
  action: Action
): CommunityState {
  switch (action.type) {
    case "start update": {
      return { ...state, status: "updating", error: action.error };
    }
    case "finish update": {
      let communityList = state.communities;
      communityList = communityList.filter(
        (community, _index, _communityList) => {
          // only keep the commnities that were not updated
          return community.name !== action.community.name;
        }
      );

      // allow for the deletion of communities
      if (action.community !== BLANK_COMMUNITY) {
        communityList = [...communityList, action.community];
      }

      return {
        ...state,
        communities: communityList,
        status: "loaded",
        error: action.error,
      };
    }
    case "fail update": {
      return { ...state, status: "error", error: action.error };
    }
    case "invalidate": {
      return {
        ...state,
        communities: [],
        status: "not loaded",
        error: action.error,
      };
    }
  }
}

function CommunityProvider({ children }: CommunityProviderProps) {
  const [state, dispatch] = React.useReducer(communityReducer, {
    communities: [],
    status: "not loaded",
    error: "",
  });
  return (
    <CommunityStateContext.Provider value={state}>
      <CommunityDispatchContext.Provider value={dispatch}>
        {children}
      </CommunityDispatchContext.Provider>
    </CommunityStateContext.Provider>
  );
}

function useCommunityState(): CommunityState {
  const context: CommunityState | undefined = React.useContext(
    CommunityStateContext
  );
  if (context === undefined) {
    throw new Error(
      "useCommunityState must be used within a CommunityProvider"
    );
  }
  return context as CommunityState;
}

function useCommunityDispatch(): Dispatch {
  const context: Dispatch | undefined = React.useContext(
    CommunityDispatchContext
  );
  if (context === undefined) {
    throw new Error(
      "useCommunityDispatch must be used within a CommunityProvider"
    );
  }
  return context as Dispatch;
}

function useCommunity(): [CommunityState, Dispatch] {
  return [useCommunityState(), useCommunityDispatch()];
}

class CommunityClient {
  public static async create(
    token: string,
    community: Community
  ): Promise<[Community, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/community`;

    return AuthenticatedRequestHandler.post(
      endpoint,
      mapCommunityResponseJson,
      { ...community, token: token }
    );
  }

  public static async load(
    token: string,
    name: string
  ): Promise<[Community, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/community?name=${name}&token=${token}`;

    return AuthenticatedRequestHandler.get(endpoint, mapCommunityResponseJson);
  }

  public static async update(
    token: string,
    {
      email,
      name,
      community,
    }: {
      email: string;
      name: string;
      community: Community;
    }
  ): Promise<[Community, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/community?updateFields=${JSON.stringify(
      community
    )}&name=${name}&token=${token}&email=${email}`;

    return AuthenticatedRequestHandler.put(endpoint, mapCommunityResponseJson);
  }

  public static async delete(
    token: string,
    name: string
  ): Promise<[boolean, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/community?name=${name}&token=${token}`;
    return AuthenticatedRequestHandler.delete(
      endpoint,
      (responseJson) => responseJson.status_code === 200
    );
  }

  public static async banUser(
    token: string,
    banner: string,
    bannee: string,
    community: string
  ): Promise<[boolean, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/ban`;

    return AuthenticatedRequestHandler.post(
      endpoint,
      (responseJson) => responseJson.status_code === 200,
      {
        token: token,
        banner: banner,
        bannee: bannee,
        community: community,
      }
    );
  }

  public static async unbanUser(
    token: string,
    banner: string,
    bannee: string,
    community: string
  ): Promise<[boolean, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/ban?banner=${banner}&bannee=${bannee}&token=${token}&community=${community}`;

    return AuthenticatedRequestHandler.put(
      endpoint,
      (responseJson) => responseJson.status_code === 200
    );
  }

  public static async join(
    token: string,
    {
      email,
      community,
    }: {
      email: string;
      community: string;
    }
  ): Promise<[Community, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/community/${community}/join`;

    return AuthenticatedRequestHandler.post(
      endpoint,
      mapCommunityResponseJson,
      { email: email, token: token }
    );
  }

  public static async leave(
    token: string,
    {
      email,
      community,
    }: {
      email: string;
      community: string;
    }
  ): Promise<[Community, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/community/${community}/leave`;
    return AuthenticatedRequestHandler.post(
      endpoint,
      mapCommunityResponseJson,
      { email: email, token: token }
    );
  }
}

function _defaultUpdateHelper(
  tokenDispatch: TokenDispatch,
  communityDispatch: Dispatch,
  response: [Community, OauthToken]
): void {
  tokenDispatch({
    ...response[1],
    type: "set",
  });
  communityDispatch({
    type: "finish update",
    community: response[0],
    error: "Successfully created new community",
  });
}

async function _communityHelper<T, R>(
  communityDispatch: Dispatch,
  token: string,
  data: T,
  requestFunc: (token: string, data: T) => Promise<R>,
  handleResponse: (response: R) => void
) {
  communityDispatch({
    type: "start update",
    community: BLANK_COMMUNITY,
    error: "Failed to update community",
  });

  try {
    const response: R = await requestFunc(token, data);
    handleResponse(response);
  } catch (error) {
    communityDispatch({
      type: "fail update",
      community: BLANK_COMMUNITY,
      error: "Failed to update community",
    });
  }
}

async function createCommunity(
  communityDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  community: Community
) {
  await _communityHelper(
    communityDispatch,
    token,
    community,
    CommunityClient.create,
    (response) => {
      _defaultUpdateHelper(tokenDispatch, communityDispatch, response);
    }
  );
}

async function loadCommunity(
  communityDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  name: string
) {
  await _communityHelper(
    communityDispatch,
    token,
    name,
    CommunityClient.load,
    (response) => {
      _defaultUpdateHelper(tokenDispatch, communityDispatch, response);
    }
  );
}

async function updateCommunity(
  communityDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  email: string,
  name: string,
  community: Community
) {
  await _communityHelper(
    communityDispatch,
    token,
    { email: email, name: name, community: community },
    CommunityClient.update,
    (response) => {
      _defaultUpdateHelper(tokenDispatch, communityDispatch, response);
    }
  );
}

async function deleteCommunity(
  communityDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  name: string
) {
  await _communityHelper(
    communityDispatch,
    token,
    name,
    CommunityClient.delete,
    (response) => {
      tokenDispatch({ ...response[1], type: "set" });
      if (response[0]) {
        communityDispatch({
          type: "finish update",
          community: BLANK_COMMUNITY,
          error: "Successfully deleted community",
        });
      } else {
        communityDispatch({
          type: "fail update",
          community: BLANK_COMMUNITY,
          error: "Failed to delete community",
        });
      }
    }
  );
}

async function banUserFromCommunity(
  tokenDispatch: TokenDispatch,
  token: string,
  banner: string,
  bannee: string,
  community: string
) {
  try {
    const [, newToken] = await CommunityClient.banUser(
      token,
      banner,
      bannee,
      community
    );
    tokenDispatch({ ...newToken, type: "set" });
  } catch (error) {
    //! no error handling here yet
  }
}

async function unbanUserFromCommunity(
  tokenDispatch: TokenDispatch,
  token: string,
  banner: string,
  bannee: string,
  community: string
) {
  try {
    const [, newToken] = await CommunityClient.unbanUser(
      token,
      banner,
      bannee,
      community
    );
    tokenDispatch({ ...newToken, type: "set" });
  } catch (error) {
    //! no error handling here yet
  }
}

async function joinCommunity(
  communityDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  email: string,
  community: string
) {
  await _communityHelper(
    communityDispatch,
    token,
    { email: email, community: community },
    CommunityClient.join,
    (response) => {
      _defaultUpdateHelper(tokenDispatch, communityDispatch, response);
    }
  );
}

async function leaveCommunity(
  communityDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  email: string,
  community: string
) {
  await _communityHelper(
    communityDispatch,
    token,
    { email: email, community: community },
    CommunityClient.leave,
    (response) => {
      _defaultUpdateHelper(tokenDispatch, communityDispatch, response);
    }
  );
}

async function startMatching(
  tokenDispatch: TokenDispatch,
  token: string,
  email: string,
  communityID: string
) {
  try {
    const response: [boolean, OauthToken] = await fetch(
      `${SERVER_ADDRESS}/matchup?email=${email}&token=${token}&community=${communityID}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((r) => r.json())
      .then((responseJson) => {
        return [
          responseJson.status_code === 200,
          {
            accessToken: responseJson.accessToken,
            refreshToken: responseJson.refreshToken,
          },
        ];
      });
    tokenDispatch({ type: "set", ...response[1] });
    return response[0];
  } catch (error) {
    return false;
  }
}

async function getCommunityStats(
  tokenDispatch: TokenDispatch,
  token: string,
  communityID: string
) {
  try {
    const response: [boolean, OauthToken] = await fetch(
      `${SERVER_ADDRESS}/community/${communityID}/stats?&token=${token}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((r) => r.json())
      .then((responseJson) => {
        return [
          responseJson.data,
          {
            accessToken: responseJson.accessToken,
            refreshToken: responseJson.refreshToken,
          },
        ];
      });
    tokenDispatch({ type: "set", ...response[1] });
    return response[0];
  } catch (error) {
    return null;
  }
}

function getCommunity(communityState: CommunityState, name: string) {
  for (let i = 0; i < communityState.communities.length; i++) {
    const element = communityState.communities[i];
    if (element.name.toLowerCase() === name.toLowerCase()) {
      return element;
    }
  }

  return BLANK_COMMUNITY;
}

function isCommunityLoaded(communityState: CommunityState, name: string) {
  for (let i = 0; i < communityState.communities.length; i++) {
    const element = communityState.communities[i];
    if (element.name.toLowerCase() === name.toLowerCase()) {
      return true;
    }
  }

  return false;
}

export {
  CommunityProvider,
  useCommunity,
  useCommunityState,
  useCommunityDispatch,
  createCommunity,
  loadCommunity,
  updateCommunity,
  deleteCommunity,
  banUserFromCommunity,
  unbanUserFromCommunity,
  joinCommunity,
  leaveCommunity,
  startMatching,
  getCommunityStats,
  getCommunity,
  isCommunityLoaded,
};
