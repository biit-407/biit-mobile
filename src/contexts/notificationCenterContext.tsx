import React from 'react';

type NotificationCenterState = {
    visible: boolean;
}

type ActionType = "show" | "hide";

type Action = {
    type: ActionType;
}

type Dispatch = (action: Action) => void;

type NotificationCenterProviderProps = {
    children: React.ReactNode;
}

const NotificationCenterStateContext = React.createContext<NotificationCenterState | undefined>(
    undefined
);
const NotificationCenterDispatchContext = React.createContext<Dispatch | undefined>(
    undefined
);


function notificationCenterReducer(
    notificationCenterState: NotificationCenterState,
    action: Action
  ): NotificationCenterState {
      switch(action.type) {
          case "show": {
              return({
                visible: true,
              });
          }
          case "hide": {
            return({
              visible: false,
            });
        }
      }
  }

  function NotificationCenterProvider({ children }: NotificationCenterProviderProps) {
    const [state, dispatch] = React.useReducer(notificationCenterReducer, {
      visible: false
    });
    return (
      <NotificationCenterStateContext.Provider value={state}>
        <NotificationCenterDispatchContext.Provider value={dispatch}>
          {children}
        </NotificationCenterDispatchContext.Provider>
      </NotificationCenterStateContext.Provider>
    );
  }

  function useNotificationCenterState(): NotificationCenterState {
    const context: NotificationCenterState | undefined = React.useContext(
        NotificationCenterStateContext
    );
    if (context === undefined) {
      throw new Error("useAccountState must be used within a AccountProvider");
    }
    return context as NotificationCenterState;
  }
  
  function useNotificationCenterDispatch(): Dispatch {
    const context: Dispatch | undefined = React.useContext(
      NotificationCenterDispatchContext
    );
    if (context === undefined) {
      throw new Error("useAccountDispatch must be used within a AccountProvider");
    }
    return context as Dispatch;
  }
  
  function useNotificationCenter(): [NotificationCenterState, Dispatch] {
    return [useNotificationCenterState(), useNotificationCenterDispatch()];
  }

export {
    NotificationCenterProvider,
    useNotificationCenterDispatch,
    useNotificationCenterState,
    useNotificationCenter,
}