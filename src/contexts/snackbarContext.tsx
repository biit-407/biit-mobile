import React from "react";

type SnackbarState = {
  snackbarVisible: boolean;
  snackbarMessage: string;
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
        queue: [action.state, ...snackbarState.queue],
      };

      if (newState.snackbarVisible === false && newState.queue.length > 0) {
        const next = newState.queue.pop() as SnackbarState;
        newState.snackbarVisible = next.snackbarVisible;
        newState.snackbarMessage = next.snackbarMessage;
        setTimeout(() => {
          action.dispatch({
            type: "pop",
            state: newState,
            dispatch: action.dispatch,
          });
        }, 2000);
      }

      return newState;
    }
    case "pop": {
      const newState = {
        snackbarVisible: false,
        snackbarMessage: "",
        queue: snackbarState.queue,
      };
      if (newState.queue.length > 0) {
        const next = newState.queue.pop() as SnackbarState;
        newState.snackbarVisible = true;
        newState.snackbarMessage = next.snackbarMessage;

        setTimeout(() => {
          action.dispatch({
            type: "pop",
            state: newState,
            dispatch: action.dispatch,
          });
        }, 2000);
      }
      return newState;
    }
  }
}

function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [state, dispatch] = React.useReducer(snackbarReducer, {
    snackbarVisible: false,
    snackbarMessage: "",
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

export { SnackbarProvider, useSnackbarState, useSnackbarDispatch, useSnackbar };
