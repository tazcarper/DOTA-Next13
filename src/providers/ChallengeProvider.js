"use client";

import React, { createContext, useReducer } from "react";
const initialState = {
  userChallenges: [],
  pendingChallenges: [],
  activeChallenges: [],
};
export const ChallengeProviderContext = createContext({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_CHALLENGE":
      return {
        ...state,
        activeChallenges: [...state.activeChallenges, action.payload],
      };
    default:
      return state;
  }
};

export const ChallengeProvider = ({ data, children }) => {
  // pass the initial data via props into this client component
  console.log("DATA");
  console.log(data);
  const {
    userChallenges = [],
    pendingChallenges = [],
    activeChallenges = [],
  } = data;
  const [state, dispatch] = useReducer(reducer, {
    userChallenges,
    pendingChallenges,
    activeChallenges,
  });
  return (
    <ChallengeProviderContext.Provider value={{ state, dispatch }}>
      {children}
    </ChallengeProviderContext.Provider>
  );
};
