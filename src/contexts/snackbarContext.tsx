import React from "react";

import { NOTIFICATION_LENGTH } from "../models/constants";

type SnackbarType = "default" | "error" | "success";

type SnackbarState = {
  snackbarVisible: boolean;
  snackbarMessage: string;
  snackbarType: SnackbarType;
  queue: SnackbarState[];
};

type ActionType = "push" | "pop";

type Action = {
  type: ActionType;
  state: SnackbarState;
  dispatch: Dispatch;
};

type Dispatch = (action: Action) => void;

type SnackbarProviderProps = {
  children: React.ReactNode;
};

const SnackbarStateContext = React.createContext<SnackbarState | undefined>(
  undefined
);
const SnackbarDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function snackbarReducer(
  snackbarState: SnackbarState,
  action: Action
): SnackbarState {
  switch (action.type) {
    case "push": {
      const newState = {
        snackbarVisible: snackbarState.snackbarVisible,
        snackbarMessage: snackbarState.snackbarMessage,
        snackbarType: snackbarState.snackbarType,
        queue: [action.state, ...snackbarState.queue],
      };

      if (newState.snackbarVisible === false && newState.queue.length > 0) {
        const next = newState.queue.pop() as SnackbarState;
        newState.snackbarVisible = next.snackbarVisible;
        newState.snackbarMessage = next.snackbarMessage;
        newState.snackbarType = next.snackbarType;
        setTimeout(() => {
          action.dispatch({
            type: "pop",
            state: newState,
            dispatch: action.dispatch,
          });
        }, NOTIFICATION_LENGTH);
      }

      return newState;
    }
    case "pop": {
      const newState: SnackbarState = {
        snackbarVisible: false,
        snackbarMessage: "",
        snackbarType: snackbarState.snackbarType,
        queue: snackbarState.queue,
      };
      if (newState.queue.length > 0) {
        const next = newState.queue.pop() as SnackbarState;
        newState.snackbarVisible = true;
        newState.snackbarMessage = next.snackbarMessage;
        newState.snackbarType = next.snackbarType;

        setTimeout(() => {
          action.dispatch({
            type: "pop",
            state: newState,
            dispatch: action.dispatch,
          });
        }, NOTIFICATION_LENGTH);
      }
      return newState;
    }
  }
}

function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [state, dispatch] = React.useReducer(snackbarReducer, {
    snackbarVisible: false,
    snackbarMessage: "",
    snackbarType: "default",
    queue: [],
  });
  return (
    <SnackbarStateContext.Provider value={state}>
      <SnackbarDispatchContext.Provider value={dispatch}>
        {children}
      </SnackbarDispatchContext.Provider>
    </SnackbarStateContext.Provider>
  );
}

function useSnackbarState(): SnackbarState {
  const context: SnackbarState | undefined = React.useContext(
    SnackbarStateContext
  );
  if (context === undefined) {
    throw new Error("useAccountState must be used within a AccountProvider");
  }
  return context as SnackbarState;
}

function useSnackbarDispatch(): Dispatch {
  const context: Dispatch | undefined = React.useContext(
    SnackbarDispatchContext
  );
  if (context === undefined) {
    throw new Error("useAccountDispatch must be used within a AccountProvider");
  }
  return context as Dispatch;
}

function useSnackbar(): [SnackbarState, Dispatch] {
  return [useSnackbarState(), useSnackbarDispatch()];
}

function getSnackbarStyle(snackbarType: SnackbarType) {
  switch (snackbarType) {
    case "default":
      return { backgroundColor: "#484848", messageColor: "#FFFFFF" };
    case "error":
      return { backgroundColor: "#ab2115", messageColor: "#FFFFFF" };
    case "success":
      return { backgroundColor: "#1e6928", messageColor: "#FFFFFF" };
  }
}

export {
  SnackbarProvider,
  useSnackbarState,
  useSnackbarDispatch,
  useSnackbar,
  getSnackbarStyle,
};
