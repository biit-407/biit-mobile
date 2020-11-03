import React from "react";

// import { OauthToken } from "../models/azure";
import { SERVER_ADDRESS } from "../models/constants";
import { Meetup } from "../models/meetups";
import {
  AuthenticatedRequestHandler,
  AuthenticatedResponseJsonType,
} from "../utils/requestHandler";

// import { Dispatch as TokenDispatch } from "./tokenContext";

type MeetupStatus = "not loaded" | "loaded" | "updating" | "error";

type MeetupState = {
  meetups: Meetup[];
  status: MeetupStatus;
  error: string;
};
type ActionType =
  | "start update"
  | "fail update"
  | "finish update"
  | "invalidate";
type Action = {
  type: ActionType;
  community: Meetup;
  error: string;
};
type Dispatch = (action: Action) => void;
type MeetupProviderProps = {
  children: React.ReactNode;
};

interface MeetupAuthenticatedResponseJson
  extends AuthenticatedResponseJsonType {
  data: {
    id: string;
    timestamp: string;
    duration: string;
    location: string;
    meetttype: string;
    user_list: Record<string, number>; // eslint-disable-line camelcase
  };
}

interface MeetupListAuthenticatedResponseJson
  extends AuthenticatedResponseJsonType {
  data: {
    id: string;
    timestamp: string;
    duration: string;
    location: string;
    meetttype: string;
    user_list: Record<string, number>; // eslint-disable-line camelcase
  }[];
}

interface RatingAuthenticatedResponseJson
  extends AuthenticatedResponseJsonType {
  data: {
    meeting_id: string; // eslint-disable-line camelcase
    rating_dict: Record<string, number>; // eslint-disable-line camelcase
  };
}

interface RatingListAuthenticatedResponseJson
  extends AuthenticatedResponseJsonType {
  data: {
    meeting_id: string; // eslint-disable-line camelcase
    rating_dict: Record<string, number>; // eslint-disable-line camelcase
  }[];
}

function mapMeetupResponseJson(responseJson: MeetupAuthenticatedResponseJson) {
  return {
    id: responseJson.data.id,
    timestamp: responseJson.data.timestamp,
    duration: responseJson.data.duration,
    location: responseJson.data.location,
    meeting_type: responseJson.data.meetttype, // eslint-disable-line camelcase
    user_list: responseJson.data.user_list, // eslint-disable-line camelcase
  } as Meetup;
}

function mapMeetupListResponseJson(
  responseJson: MeetupListAuthenticatedResponseJson
) {
  return responseJson.data.map((item) => {
    return {
      id: item.id,
      timestamp: item.timestamp,
      duration: item.duration,
      location: item.location,
      meeting_type: item.meetttype, // eslint-disable-line camelcase
      user_list: item.user_list, // eslint-disable-line camelcase
    } as Meetup;
  });
}

function mapRatingResponseJson(responseJson: RatingAuthenticatedResponseJson) {
  return {
    meetup_id: responseJson.data.meeting_id, // eslint-disable-line camelcase
    rating_dict: responseJson.data.rating_dict, // eslint-disable-line camelcase
  };
}

function mapRatingListResponseJson(
  responseJson: RatingListAuthenticatedResponseJson
) {
  return responseJson.data.map((item) => ({
    meetup_id: item.meeting_id, // eslint-disable-line camelcase
    rating_dict: item.rating_dict, // eslint-disable-line camelcase
  }));
}

const MeetupStateContext = React.createContext<MeetupState | undefined>(
  undefined
);
const MeetupDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function meetupReducer(state: MeetupState, action: Action): MeetupState {
  switch (action.type) {
    case "start update": {
      return { ...state, status: "updating", error: action.error };
    }
    case "finish update": {
      //   let communityList = state.communities;
      //   communityList = communityList.filter(
      //     (community, _index, _communityList) => {
      //       // only keep the commnities that were not updated
      //       return community.name !== action.community.name;
      //     }
      //   );

      //   // allow for the deletion of communities
      //   if (action.community !== BLANK_COMMUNITY) {
      //     communityList = [...communityList, action.community];
      //   }
      //TODO: Add actual updating
      return {
        ...state,
        meetups: state.meetups,
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
        meetups: [],
        status: "not loaded",
        error: action.error,
      };
    }
  }
}

function MeetupProvider({ children }: MeetupProviderProps) {
  const [state, dispatch] = React.useReducer(meetupReducer, {
    meetups: [],
    status: "not loaded",
    error: "",
  });
  return (
    <MeetupStateContext.Provider value={state}>
      <MeetupDispatchContext.Provider value={dispatch}>
        {children}
      </MeetupDispatchContext.Provider>
    </MeetupStateContext.Provider>
  );
}

function useMeetupState(): MeetupState {
  const context: MeetupState | undefined = React.useContext(MeetupStateContext);
  if (context === undefined) {
    throw new Error("useMeetupState must be used within a MeetupProvider");
  }
  return context as MeetupState;
}

function useMeetupDispatch(): Dispatch {
  const context: Dispatch | undefined = React.useContext(MeetupDispatchContext);
  if (context === undefined) {
    throw new Error("useMeetupDispatch must be used within a MeetupProvider");
  }
  return context as Dispatch;
}

function useMeetup(): [MeetupState, Dispatch] {
  return [useMeetupState(), useMeetupDispatch()];
}

async function getMeetupDetails(token: string, meetupID: string) {
  const endpoint = `${SERVER_ADDRESS}/meeting?id=${meetupID}&token=${token}`;
  return await AuthenticatedRequestHandler.get(endpoint, mapMeetupResponseJson);
}

async function getMeetupList(token: string, email: string) {
  const endpoint = `${SERVER_ADDRESS}/meeting/${email}?email=${email}&token=${token}`;
  return await AuthenticatedRequestHandler.get(
    endpoint,
    mapMeetupListResponseJson
  );
}

async function getPendingMeetupsList(token: string, email: string) {
  const endpoint = `${SERVER_ADDRESS}/meeting/pending?email=${email}&token=${token}`;
  return await AuthenticatedRequestHandler.get(
    endpoint,
    mapMeetupListResponseJson
  );
}

async function getUpcomingMeetupsList(token: string, email: string) {
  const endpoint = `${SERVER_ADDRESS}/meeting/upcoming?email=${email}&token=${token}`;
  return await AuthenticatedRequestHandler.get(
    endpoint,
    mapMeetupListResponseJson
  );
}

async function getUnratedMeetupsList(token: string, email: string) {
  const endpoint = `${SERVER_ADDRESS}/rating/pending?email=${email}&token=${token}`;
  return await AuthenticatedRequestHandler.get(
    endpoint,
    mapRatingListResponseJson
  );
}

async function setMeetupRating(
  token: string,
  email: string,
  meetupID: string,
  rating: number
) {
  const endpoint = `${SERVER_ADDRESS}/rating`;
  return await AuthenticatedRequestHandler.post(
    endpoint,
    mapRatingResponseJson,
    { token, user: email, meeting_id: meetupID, rating } // eslint-disable-line camelcase
  );
}

async function acceptMeetup(token: string, email: string, meetupID: string) {
  const endpoint = `${SERVER_ADDRESS}/meeting/${meetupID}/accept?email=${email}&token=${token}`;
  return await AuthenticatedRequestHandler.put(endpoint, mapMeetupResponseJson);
}

async function declineMeetup(token: string, email: string, meetupID: string) {
  const endpoint = `${SERVER_ADDRESS}/meeting/${meetupID}/decline?email=${email}&token=${token}`;
  return await AuthenticatedRequestHandler.put(endpoint, mapMeetupResponseJson);
}

async function setMeetupLocations(
  token: string,
  email: string,
  meetupID: string,
  venues: string[]
) {
  const endpoint = `${SERVER_ADDRESS}/meeting/${meetupID}/venue?email=${email}&token=${token}&venues=${venues}`;
  return await AuthenticatedRequestHandler.put(endpoint, mapMeetupResponseJson);
}

// class MeetupClient {
//   public static async create(
//     token: string,
//     meetup: Meetup
//   ): Promise<[Meetup, OauthToken]> {
//     const endpoint = `${SERVER_ADDRESS}/community`;

//     return AuthenticatedRequestHandler.post(endpoint, mapMeetupResponseJson, {
//       ...meetup,
//       token: token,
//     });
//   }

//   public static async load(
//     token: string,
//     name: string
//   ): Promise<[Community, OauthToken]> {
//     const endpoint = `${SERVER_ADDRESS}/community?name=${name}&token=${token}`;

//     return AuthenticatedRequestHandler.get(endpoint, mapCommunityResponseJson);
//   }

//   public static async update(
//     token: string,
//     {
//       email,
//       name,
//       community,
//     }: {
//       email: string;
//       name: string;
//       community: Community;
//     }
//   ): Promise<[Community, OauthToken]> {
//     const endpoint = `${SERVER_ADDRESS}/community?updateFields=${JSON.stringify(
//       community
//     )}&name=${name}&token=${token}&email=${email}`;

//     return AuthenticatedRequestHandler.put(endpoint, mapCommunityResponseJson);
//   }

//   public static async delete(
//     token: string,
//     name: string
//   ): Promise<[boolean, OauthToken]> {
//     const endpoint = `${SERVER_ADDRESS}/community?name=${name}&token=${token}`;
//     return AuthenticatedRequestHandler.delete(
//       endpoint,
//       (responseJson) => responseJson.status_code === 200
//     );
//   }

//   public static async banUser(
//     token: string,
//     banner: string,
//     bannee: string,
//     community: string
//   ): Promise<[boolean, OauthToken]> {
//     const endpoint = `${SERVER_ADDRESS}/ban`;

//     return AuthenticatedRequestHandler.post(
//       endpoint,
//       (responseJson) => responseJson.status_code === 200,
//       {
//         token: token,
//         banner: banner,
//         bannee: bannee,
//         community: community,
//       }
//     );
//   }

//   public static async unbanUser(
//     token: string,
//     banner: string,
//     bannee: string,
//     community: string
//   ): Promise<[boolean, OauthToken]> {
//     const endpoint = `${SERVER_ADDRESS}/ban?banner=${banner}&bannee=${bannee}&token=${token}&community=${community}`;

//     return AuthenticatedRequestHandler.put(
//       endpoint,
//       (responseJson) => responseJson.status_code === 200
//     );
//   }

//   public static async join(
//     token: string,
//     {
//       email,
//       community,
//     }: {
//       email: string;
//       community: string;
//     }
//   ): Promise<[Community, OauthToken]> {
//     const endpoint = `${SERVER_ADDRESS}/community/${community}/join`;

//     return AuthenticatedRequestHandler.post(
//       endpoint,
//       mapCommunityResponseJson,
//       { email: email, token: token }
//     );
//   }

//   public static async leave(
//     token: string,
//     {
//       email,
//       community,
//     }: {
//       email: string;
//       community: string;
//     }
//   ): Promise<[Community, OauthToken]> {
//     const endpoint = `${SERVER_ADDRESS}/community/${community}/leave`;
//     return AuthenticatedRequestHandler.post(
//       endpoint,
//       mapCommunityResponseJson,
//       { email: email, token: token }
//     );
//   }
// }

// function _defaultUpdateHelper(
//   tokenDispatch: TokenDispatch,
//   communityDispatch: Dispatch,
//   response: [Community, OauthToken]
// ): void {
//   tokenDispatch({
//     ...response[1],
//     type: "set",
//   });
//   communityDispatch({
//     type: "finish update",
//     community: response[0],
//     error: "Successfully created new community",
//   });
// }

// async function _communityHelper<T, R>(
//   communityDispatch: Dispatch,
//   token: string,
//   data: T,
//   requestFunc: (token: string, data: T) => Promise<R>,
//   handleResponse: (response: R) => void
// ) {
//   communityDispatch({
//     type: "start update",
//     community: BLANK_COMMUNITY,
//     error: "Failed to update community",
//   });

//   try {
//     const response: R = await requestFunc(token, data);
//     handleResponse(response);
//   } catch (error) {
//     communityDispatch({
//       type: "fail update",
//       community: BLANK_COMMUNITY,
//       error: "Failed to update community",
//     });
//   }
// }

// async function createCommunity(
//   communityDispatch: Dispatch,
//   tokenDispatch: TokenDispatch,
//   token: string,
//   community: Community
// ) {
//   await _communityHelper(
//     communityDispatch,
//     token,
//     community,
//     CommunityClient.create,
//     (response) => {
//       _defaultUpdateHelper(tokenDispatch, communityDispatch, response);
//     }
//   );
// }

// async function loadCommunity(
//   communityDispatch: Dispatch,
//   tokenDispatch: TokenDispatch,
//   token: string,
//   name: string
// ) {
//   await _communityHelper(
//     communityDispatch,
//     token,
//     name,
//     CommunityClient.load,
//     (response) => {
//       _defaultUpdateHelper(tokenDispatch, communityDispatch, response);
//     }
//   );
// }

// async function updateCommunity(
//   communityDispatch: Dispatch,
//   tokenDispatch: TokenDispatch,
//   token: string,
//   email: string,
//   name: string,
//   community: Community
// ) {
//   await _communityHelper(
//     communityDispatch,
//     token,
//     { email: email, name: name, community: community },
//     CommunityClient.update,
//     (response) => {
//       _defaultUpdateHelper(tokenDispatch, communityDispatch, response);
//     }
//   );
// }

// async function deleteCommunity(
//   communityDispatch: Dispatch,
//   tokenDispatch: TokenDispatch,
//   token: string,
//   name: string
// ) {
//   await _communityHelper(
//     communityDispatch,
//     token,
//     name,
//     CommunityClient.delete,
//     (response) => {
//       tokenDispatch({ ...response[1], type: "set" });
//       if (response[0]) {
//         communityDispatch({
//           type: "finish update",
//           community: BLANK_COMMUNITY,
//           error: "Successfully deleted community",
//         });
//       } else {
//         communityDispatch({
//           type: "fail update",
//           community: BLANK_COMMUNITY,
//           error: "Failed to delete community",
//         });
//       }
//     }
//   );
// }

// async function banUserFromCommunity(
//   tokenDispatch: TokenDispatch,
//   token: string,
//   banner: string,
//   bannee: string,
//   community: string
// ) {
//   try {
//     const [, newToken] = await CommunityClient.banUser(
//       token,
//       banner,
//       bannee,
//       community
//     );
//     tokenDispatch({ ...newToken, type: "set" });
//   } catch (error) {
//     //! no error handling here yet
//   }
// }

// async function unbanUserFromCommunity(
//   tokenDispatch: TokenDispatch,
//   token: string,
//   banner: string,
//   bannee: string,
//   community: string
// ) {
//   try {
//     const [, newToken] = await CommunityClient.unbanUser(
//       token,
//       banner,
//       bannee,
//       community
//     );
//     tokenDispatch({ ...newToken, type: "set" });
//   } catch (error) {
//     //! no error handling here yet
//   }
// }

// async function joinCommunity(
//   communityDispatch: Dispatch,
//   tokenDispatch: TokenDispatch,
//   token: string,
//   email: string,
//   community: string
// ) {
//   await _communityHelper(
//     communityDispatch,
//     token,
//     { email: email, community: community },
//     CommunityClient.join,
//     (response) => {
//       _defaultUpdateHelper(tokenDispatch, communityDispatch, response);
//     }
//   );
// }

// async function leaveCommunity(
//   communityDispatch: Dispatch,
//   tokenDispatch: TokenDispatch,
//   token: string,
//   email: string,
//   community: string
// ) {
//   await _communityHelper(
//     communityDispatch,
//     token,
//     { email: email, community: community },
//     CommunityClient.leave,
//     (response) => {
//       _defaultUpdateHelper(tokenDispatch, communityDispatch, response);
//     }
//   );
// }

// function getCommunity(communityState: CommunityState, name: string) {
//   for (let i = 0; i < communityState.communities.length; i++) {
//     const element = communityState.communities[i];
//     if (element.name.toLowerCase() === name.toLowerCase()) {
//       return element;
//     }
//   }

//   return BLANK_COMMUNITY;
// }

// function isCommunityLoaded(communityState: CommunityState, name: string) {
//   for (let i = 0; i < communityState.communities.length; i++) {
//     const element = communityState.communities[i];
//     if (element.name.toLowerCase() === name.toLowerCase()) {
//       return true;
//     }
//   }

//   return false;
// }

export {
  MeetupProvider,
  useMeetup,
  useMeetupState,
  useMeetupDispatch,
  // createCommunity,
  // loadCommunity,
  // updateCommunity,
  // deleteCommunity,
  // banUserFromCommunity,
  // unbanUserFromCommunity,
  // joinCommunity,
  // leaveCommunity,
  // getCommunity,
  acceptMeetup,
  declineMeetup,
  getMeetupDetails,
  getMeetupList,
  getPendingMeetupsList,
  getUpcomingMeetupsList,
  getUnratedMeetupsList,
  setMeetupRating,
  setMeetupLocations,
};
