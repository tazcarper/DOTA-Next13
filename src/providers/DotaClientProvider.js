"use client";

import React, { createContext, useReducer } from "react";

export const ClientDotaProfileDataProviderContext = createContext({
  state: {},
  dispatch: () => null,
});

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const DotaProfileDataProvider = ({ initialState, children }) => {
  // pass the initial data via props into this client component
  // dispatch will update any future client side updates for new pokemon

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ClientDotaProfileDataProviderContext.Provider value={{ state, dispatch }}>
      {children}
    </ClientDotaProfileDataProviderContext.Provider>
  );
};
