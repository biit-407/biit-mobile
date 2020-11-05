import React from "react";

// import { OauthToken } from "../models/azure";
import { SERVER_ADDRESS } from "../models/constants";
import { BLANK_MEETUP, Meetup } from "../models/meetups";
import {
  AuthenticatedRequestHandler,
  AuthenticatedResponseJsonType,
} from "../utils/requestHandler";

import { Dispatch as TokenDispatch } from "./tokenContext";

type MeetupStatus = "not loaded" | "loaded" | "updating" | "error";

export type MeetupState = {
  meetups: Meetup[];
  status: MeetupStatus;
  error: string;
};
type ActionType =
  | "start update"
  | "fail update"
  | "finish update item"
  | "finish update list"
  | "finish update list partial"
  | "invalidate";
type Action = {
  type: ActionType;
  meetup: Meetup[];
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
    meettype: string;
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
    meettype: string;
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
    meeting_type: responseJson.data.meettype, // eslint-disable-line camelcase
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
      meeting_type: item.meettype, // eslint-disable-line camelcase
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
    case "finish update item": {
      let meetupList = state.meetups;

      meetupList = meetupList.filter((item, _index, _meetupList) => {
        return item.id !== action.meetup[0].id;
      });

      if (action.meetup[0] !== BLANK_MEETUP) {
        meetupList = [...meetupList, action.meetup[0]];
      }

      return {
        ...state,
        meetups: meetupList,
        status: "loaded",
        error: action.error,
      };
    }
    case "finish update list": {
      return {
        ...state,
        meetups: action.meetup,
        status: "loaded",
        error: action.error,
      };
    }
    case "finish update list partial": {
      let meetupList = state.meetups;

      meetupList = meetupList.filter((item, _index, _meetupList) => {
        for (let i = 0; i < action.meetup.length; i++) {
          if (item.id === action.meetup[i].id) {
            return false;
          }
        }
        return true;
      });

      for (let i = 0; i < action.meetup.length; i++) {
        if (action.meetup[i] !== BLANK_MEETUP) {
          meetupList.push(action.meetup[i]);
        }
      }

      return {
        ...state,
        meetups: meetupList,
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

async function getMeetupDetails(
  meetupDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  meetupID: string
) {
  const endpoint = `${SERVER_ADDRESS}/meeting?id=${meetupID}&token=${token}`;
  meetupDispatch({
    type: "start update",
    meetup: [BLANK_MEETUP],
    error: "Making meetup request to server",
  });
  try {
    const response = await AuthenticatedRequestHandler.get(
      endpoint,
      mapMeetupResponseJson
    );
    tokenDispatch({ type: "set", ...response[1] });
    meetupDispatch({
      type: "finish update item",
      meetup: [response[0]],
      error: "Successfully loaded meetup from server",
    });
    return response[1];
  } catch (error) {
    meetupDispatch({
      type: "fail update",
      meetup: [BLANK_MEETUP],
      error: "Unable to load meetup from server",
    });
  }
  return BLANK_MEETUP;
}

async function getMeetupList(
  meetupDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  email: string
) {
  const endpoint = `${SERVER_ADDRESS}/meeting/${email}?email=${email}&token=${token}`;
  meetupDispatch({
    type: "start update",
    meetup: [BLANK_MEETUP],
    error: "Making meetup List request to server",
  });
  try {
    const response = await AuthenticatedRequestHandler.get(
      endpoint,
      mapMeetupListResponseJson
    );
    tokenDispatch({ type: "set", ...response[1] });
    meetupDispatch({
      type: "finish update list",
      meetup: response[0],
      error: "Successfully loaded meetups from server",
    });
    return response[0];
  } catch (error) {
    meetupDispatch({
      type: "fail update",
      meetup: [BLANK_MEETUP],
      error: "Unable to load meetups from server",
    });
  }
  return [];
}

async function getPendingMeetupsList(
  meetupDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  email: string
) {
  const endpoint = `${SERVER_ADDRESS}/meeting/pending?email=${email}&token=${token}`;
  meetupDispatch({
    type: "start update",
    meetup: [BLANK_MEETUP],
    error: "Making meetup List request to server",
  });
  try {
    const response = await AuthenticatedRequestHandler.get(
      endpoint,
      mapMeetupListResponseJson
    );
    tokenDispatch({ type: "set", ...response[1] });
    meetupDispatch({
      type: "finish update list partial",
      meetup: response[0],
      error: "Successfully loaded meetups from server",
    });
    return response[0];
  } catch (error) {
    meetupDispatch({
      type: "fail update",
      meetup: [BLANK_MEETUP],
      error: "Unable to load meetups from server",
    });
  }
  return [];
}

async function getUpcomingMeetupsList(
  meetupDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  email: string
) {
  const endpoint = `${SERVER_ADDRESS}/meeting/upcoming?email=${email}&token=${token}`;
  meetupDispatch({
    type: "start update",
    meetup: [BLANK_MEETUP],
    error: "Making meetup List request to server",
  });
  try {
    const response = await AuthenticatedRequestHandler.get(
      endpoint,
      mapMeetupListResponseJson
    );
    tokenDispatch({ type: "set", ...response[1] });
    meetupDispatch({
      type: "finish update list partial",
      meetup: response[0],
      error: "Successfully loaded meetups from server",
    });
    return response[0];
  } catch (error) {
    meetupDispatch({
      type: "fail update",
      meetup: [BLANK_MEETUP],
      error: "Unable to load meetups from server",
    });
  }
  return [];
}

async function getPastMeetupsList(
  meetupDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  email: string
) {
  const endpoint = `${SERVER_ADDRESS}/meeting/past?email=${email}&token=${token}`;
  meetupDispatch({
    type: "start update",
    meetup: [BLANK_MEETUP],
    error: "Making meetup List request to server",
  });
  try {
    const response = await AuthenticatedRequestHandler.get(
      endpoint,
      mapMeetupListResponseJson
    );
    tokenDispatch({ type: "set", ...response[1] });
    meetupDispatch({
      type: "finish update list partial",
      meetup: response[0],
      error: "Successfully loaded meetups from server",
    });
    return response[0];
  } catch (error) {
    meetupDispatch({
      type: "fail update",
      meetup: [BLANK_MEETUP],
      error: "Unable to load meetups from server",
    });
  }
  return [];
}

async function getUnratedMeetupsList(
  meetupDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  meetupState: MeetupState,
  token: string,
  email: string
) {
  const endpoint = `${SERVER_ADDRESS}/rating/pending?email=${email}&token=${token}`;
  meetupDispatch({
    type: "start update",
    meetup: [BLANK_MEETUP],
    error: "Making meetup List request to server",
  });
  try {
    const response = await AuthenticatedRequestHandler.get(
      endpoint,
      mapRatingListResponseJson
    );
    tokenDispatch({ type: "set", ...response[1] });

    // get all unrated meetups
    const meetupList = [];
    for (let j = 0; j < meetupState.meetups.length; j++) {
      const item = meetupState.meetups[j];
      for (let i = 0; i < response[0].length; i++) {
        if (response[0][i].meetup_id === item.id) {
          meetupList.push(item);
          break;
        }
      }
    }

    // update the state
    meetupDispatch({
      type: "finish update list partial",
      meetup: meetupList,
      error: "Successfully loaded meetups from server",
    });
    return meetupList;
  } catch (error) {
    meetupDispatch({
      type: "fail update",
      meetup: [BLANK_MEETUP],
      error: "Unable to load meetups from server",
    });
  }
  return [];
}

async function setMeetupRating(
  meetupDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  meetupState: MeetupState,
  token: string,
  email: string,
  meetupID: string,
  rating: number
) {
  const endpoint = `${SERVER_ADDRESS}/rating`;
  meetupDispatch({
    type: "start update",
    meetup: [BLANK_MEETUP],
    error: "Making meetup request to server",
  });
  try {
    const response = await AuthenticatedRequestHandler.post(
      endpoint,
      mapRatingResponseJson,
      { token, user: email, meeting_id: meetupID, rating } // eslint-disable-line camelcase
    );

    // get meetup that had rating set
    let meetup = BLANK_MEETUP;
    for (let i = 0; i < meetupState.meetups.length; i++) {
      if (meetupState.meetups[i].id === response[0].meetup_id) {
        meetup = meetupState.meetups[i];
        break;
      }
    }

    // update meetup
    meetup.rating_dict = response[0].rating_dict; // eslint-disable-line camelcase

    tokenDispatch({ type: "set", ...response[1] });
    meetupDispatch({
      type: "finish update item",
      meetup: [meetup],
      error: "Successfully loaded meetups from server",
    });
    return meetup;
  } catch (error) {
    meetupDispatch({
      type: "fail update",
      meetup: [BLANK_MEETUP],
      error: "Unable to load meetups from server",
    });
  }
  return BLANK_MEETUP;
}

async function acceptMeetup(
  meetupDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  email: string,
  meetupID: string
) {
  const endpoint = `${SERVER_ADDRESS}/meeting/${meetupID}/accept?email=${email}&token=${token}`;
  meetupDispatch({
    type: "start update",
    meetup: [BLANK_MEETUP],
    error: "Making meetup request to server",
  });
  try {
    const response = await AuthenticatedRequestHandler.put(
      endpoint,
      mapMeetupResponseJson
    );
    tokenDispatch({ type: "set", ...response[1] });
    meetupDispatch({
      type: "finish update item",
      meetup: [response[0]],
      error: "Successfully loaded meetups from server",
    });
    return response[0];
  } catch (error) {
    meetupDispatch({
      type: "fail update",
      meetup: [BLANK_MEETUP],
      error: "Unable to accept meetup from server",
    });
  }
  return BLANK_MEETUP;
}

async function declineMeetup(
  meetupDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  email: string,
  meetupID: string
) {
  const endpoint = `${SERVER_ADDRESS}/meeting/${meetupID}/decline?email=${email}&token=${token}`;
  meetupDispatch({
    type: "start update",
    meetup: [BLANK_MEETUP],
    error: "Making meetup request to server",
  });
  try {
    const response = await AuthenticatedRequestHandler.put(
      endpoint,
      mapMeetupResponseJson
    );
    tokenDispatch({ type: "set", ...response[1] });
    meetupDispatch({
      type: "finish update item",
      meetup: [response[0]],
      error: "Successfully loaded meetups from server",
    });
    return response[0];
  } catch (error) {
    meetupDispatch({
      type: "fail update",
      meetup: [BLANK_MEETUP],
      error: "Unable to decline meetup from server",
    });
  }
  return BLANK_MEETUP;
}

async function setMeetupLocations(
  meetupDispatch: Dispatch,
  tokenDispatch: TokenDispatch,
  token: string,
  email: string,
  meetupID: string,
  venues: string[]
) {
  let venuesAsString = "[";
  for (let index = 0; index < venues.length; index++) {
    venuesAsString += `"${venues[index]}",`;
  }
  venuesAsString = venuesAsString.substring(0, venuesAsString.length - 1);
  venuesAsString += "]";
  const endpoint = `${SERVER_ADDRESS}/meeting/${meetupID}/venue?email=${email}&token=${token}&venues=${venuesAsString}`;
  meetupDispatch({
    type: "start update",
    meetup: [BLANK_MEETUP],
    error: "Making meetup request to server",
  });
  try {
    const response = await AuthenticatedRequestHandler.put(
      endpoint,
      mapMeetupResponseJson
    );
    tokenDispatch({ type: "set", ...response[1] });
    meetupDispatch({
      type: "finish update item",
      meetup: [response[0]],
      error: "Successfully loaded meetups from server",
    });
    return response[0];
  } catch (error) {
    meetupDispatch({
      type: "fail update",
      meetup: [BLANK_MEETUP],
      error: "Unable to decline meetup from server",
    });
  }
  return BLANK_MEETUP;
}

function getLoadedMeetupById(
  meetupState: MeetupState,
  meetupID: string
): Meetup {
  for (let i = 0; i < meetupState.meetups.length; i++) {
    if (meetupState.meetups[i].id === meetupID) {
      return meetupState.meetups[i];
    }
  }
  return BLANK_MEETUP;
}

export {
  MeetupProvider,
  useMeetup,
  useMeetupState,
  useMeetupDispatch,
  acceptMeetup,
  declineMeetup,
  getMeetupDetails,
  getMeetupList,
  getPendingMeetupsList,
  getUpcomingMeetupsList,
  getPastMeetupsList,
  getUnratedMeetupsList,
  setMeetupRating,
  setMeetupLocations,
  getLoadedMeetupById,
};
