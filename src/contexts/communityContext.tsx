import React from "react";

import { OauthToken } from "../models/azure";
import { BLANK_COMMUNITY, Community } from "../models/community";
import { SERVER_ADDRESS } from "../models/constants";

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
      communityList.filter((community, _index, _communityList) => {
        // only keep the commnities that were not updated
        return community.name !== action.community.name;
      });

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

    return await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...community, token: token }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return [
          {
            name: responseJson.data.name,
            codeOfConduct: responseJson.data.codeOfConduct,
            admins: responseJson.data.admins,
            members: responseJson.data.members,
            mpm: responseJson.data.mpm,
            meetType: responseJson.data.meetType,
          } as Community,
          {
            refreshToken: responseJson.refresh_token,
            accessToken: responseJson.access_token,
          },
        ];
      });
  }

  public static async load(
    token: string,
    name: string
  ): Promise<[Community, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/community?name=${name}&token=${token}`;

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
            name: responseJson.data.name,
            codeOfConduct: responseJson.data.codeOfConduct,
            admins: responseJson.data.admins,
            members: responseJson.data.members,
            mpm: responseJson.data.mpm,
            meetType: responseJson.data.meetType,
          } as Community,
          {
            refreshToken: responseJson.refresh_token,
            accessToken: responseJson.access_token,
          },
        ];
      });
  }

  public static async update(
    token: string,
    community: Community
  ): Promise<[Community, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/community`;

    return await fetch(endpoint, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...community,
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return [
          {
            name: responseJson.data.name,
            codeOfConduct: responseJson.data.codeOfConduct,
            admins: responseJson.data.admins,
            members: responseJson.data.members,
            mpm: responseJson.data.mpm,
            meetType: responseJson.data.meetType,
          } as Community,
          {
            refreshToken: responseJson.refresh_token,
            accessToken: responseJson.access_token,
          },
        ];
      });
  }

  public static async delete(
    token: string,
    name: string
  ): Promise<[boolean, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/community?name=${name}&token=${token}`;

    return await fetch(endpoint, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return [
          responseJson.status === 200,
          {
            refreshToken: responseJson.refresh_token,
            accessToken: responseJson.access_token,
          },
        ];
      });
  }

  public static async banUser(
    token: string,
    banner: string,
    bannee: string,
    community: string
  ): Promise<[boolean, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/ban`;
    return await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        banner: banner,
        bannee: bannee,
        community: community,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return [
          responseJson.status === 200,
          {
            refreshToken: responseJson.refresh_token,
            accessToken: responseJson.access_token,
          },
        ];
      });
  }

  public static async unbanUser(
    token: string,
    banner: string,
    bannee: string,
    community: string
  ): Promise<[boolean, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/ban?banner=${banner}&bannee=${bannee}&token=${token}&community=${community}`;
    return await fetch(endpoint, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return [
          responseJson.status === 200,
          {
            refreshToken: responseJson.refresh_token,
            accessToken: responseJson.access_token,
          },
        ];
      });
  }

  public static async join(
    email: string,
    token: string,
    community: string
  ): Promise<[Community, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/community/${community}/join`;
    return await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return [
          {
            name: responseJson.data.name,
            codeOfConduct: responseJson.data.codeOfConduct,
            admins: responseJson.data.admins,
            members: responseJson.data.members,
            mpm: responseJson.data.mpm,
            meetType: responseJson.data.meetType,
          } as Community,
          {
            refreshToken: responseJson.refresh_token,
            accessToken: responseJson.access_token,
          },
        ];
      });
  }

  public static async leave(
    email: string,
    token: string,
    community: string
  ): Promise<[Community, OauthToken]> {
    const endpoint = `${SERVER_ADDRESS}/community/${community}/leave`;
    return await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return [
          {
            name: responseJson.data.name,
            codeOfConduct: responseJson.data.codeOfConduct,
            admins: responseJson.data.admins,
            members: responseJson.data.members,
            mpm: responseJson.data.mpm,
            meetType: responseJson.data.meetType,
          } as Community,
          {
            refreshToken: responseJson.refresh_token,
            accessToken: responseJson.access_token,
          },
        ];
      });
  }
}

async function createCommunity(
  communityDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  community: Community
) {
  communityDispatch({
    type: "start update",
    community: community,
    error: "Sent create community request to the server",
  });

  try {
    const [createdCommunity, newToken] = await CommunityClient.create(
      token,
      community
    );
    tokenDispatch({
      type: "set",
      refreshToken: newToken.refreshToken,
      accessToken: newToken.accessToken,
    });
    communityDispatch({
      type: "finish update",
      community: createdCommunity,
      error: "Successfully created new community",
    });
  } catch (error) {
    communityDispatch({
      type: "fail update",
      community: community,
      error: "Failed to create community",
    });
  }
}

async function loadCommunity(
  communityDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  name: string
) {
  communityDispatch({
    type: "start update",
    community: BLANK_COMMUNITY,
    error: "Sent get community request to the server",
  });

  try {
    const [loadedCommunity, newToken] = await CommunityClient.load(token, name);
    tokenDispatch({ ...newToken, type: "set" });
    communityDispatch({
      type: "finish update",
      community: loadedCommunity,
      error: "Successfully loaded community",
    });
  } catch (error) {
    communityDispatch({
      type: "fail update",
      community: BLANK_COMMUNITY,
      error: "Failed to load community",
    });
  }
}

async function updateCommunity(
  communityDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  community: Community
) {
  communityDispatch({
    type: "start update",
    community: community,
    error: "Sent update community request to the server",
  });

  try {
    const [updatedCommunity, newToken] = await CommunityClient.update(
      token,
      community
    );
    tokenDispatch({ ...newToken, type: "set" });
    communityDispatch({
      type: "finish update",
      community: updatedCommunity,
      error: "Successfully updated community",
    });
  } catch (error) {
    communityDispatch({
      type: "fail update",
      community: community,
      error: "Failed to update community",
    });
  }
}

async function deleteCommunity(
  communityDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  name: string
) {
  communityDispatch({
    type: "start update",
    community: BLANK_COMMUNITY,
    error: "Sent delete community request to the server",
  });

  try {
    const [success, newToken] = await CommunityClient.delete(token, name);
    tokenDispatch({ ...newToken, type: "set" });
    if (success) {
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
  } catch (error) {
    communityDispatch({
      type: "fail update",
      community: BLANK_COMMUNITY,
      error: "Failed to delete community",
    });
  }
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
  communityDispatch({
    type: "start update",
    community: BLANK_COMMUNITY,
    error: "Sent join community request to the server",
  });

  try {
    const [updatedCommunity, newToken] = await CommunityClient.join(
      email,
      token,
      community
    );
    tokenDispatch({ ...newToken, type: "set" });
    communityDispatch({
      type: "finish update",
      community: updatedCommunity,
      error: "Successfully joined community",
    });
  } catch (error) {
    communityDispatch({
      type: "fail update",
      community: BLANK_COMMUNITY,
      error: "Failed to join community",
    });
  }
}

async function leaveCommunity(
  communityDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  email: string,
  community: string
) {
  communityDispatch({
    type: "start update",
    community: BLANK_COMMUNITY,
    error: "Sent leave community request to the server",
  });

  try {
    const [updatedCommunity, newToken] = await CommunityClient.leave(
      email,
      token,
      community
    );
    tokenDispatch({ ...newToken, type: "set" });
    communityDispatch({
      type: "finish update",
      community: updatedCommunity,
      error: "Successfully left community",
    });
  } catch (error) {
    communityDispatch({
      type: "fail update",
      community: BLANK_COMMUNITY,
      error: "Failed to leave community",
    });
  }
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
};
