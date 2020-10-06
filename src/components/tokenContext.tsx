import React from "react";

type TokenState = {
  accessToken: string;
  refreshToken: string;
};
type ActionType = "set" | "clear";
type Action = {
  type: ActionType;
  accessToken: string;
  refreshToken: string;
};
type Dispatch = (action: Action) => void;
type TokenProviderProps = {
  children: React.ReactNode;
};
const TokenStateContext = React.createContext<TokenState | undefined>(
  undefined
);
const TokenDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function tokenReducer(_state: TokenState, action: Action): TokenState {
  switch (action.type) {
    case "set": {
      return {
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    }
    case "clear": {
      return { accessToken: "", refreshToken: "" };
    }
  }
}

function TokenProvider({ children }: TokenProviderProps) {
  const [state, dispatch] = React.useReducer(tokenReducer, {
    accessToken: "",
    refreshToken: "",
  });
  return (
    <TokenStateContext.Provider value={state}>
      <TokenDispatchContext.Provider value={dispatch}>
        {children}
      </TokenDispatchContext.Provider>
    </TokenStateContext.Provider>
  );
}

function useTokenState() {
  const context = React.useContext(TokenStateContext);
  if (context === undefined) {
    throw new Error("useTokenState must be used within a TokenProvider");
  }
  return context;
}

function useTokenDispatch() {
  const context = React.useContext(TokenDispatchContext);
  if (context === undefined) {
    throw new Error("useTokenDispatch must be used within a TokenProvider");
  }
  return context;
}

function useToken(): [TokenState, Dispatch] {
  return [useTokenState(), useTokenDispatch()];
}

export { TokenProvider, useToken, useTokenDispatch, useTokenState };
