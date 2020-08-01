import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS } from "../context/actions";

// destructuring ACTIONS
const {
  RUNNING,
  STOP_RUNNING,
  SET_SIZE,
  NEXT_GEN,
  RANDOM_BOARD,
  CLEAR,
} = ACTIONS;

// setting up the context for our global store.
const StoreContext = createContext();

const initialState = {
  size: 45,
  speed: 1500,
  generations: 0,
  running: false,
};

const reducer = (state, action, payload) => {
  switch (action.type) {
    case RUNNING:
      return {
        ...state,
        // return the opposite of whatever the current state of running is.
        running: !state.running,
      };

    case STOP_RUNNING:
      return {
        ...state,
        // returns the state of running as false.
        running: false,
      };

    case SET_SIZE:
      return {
        ...state,
        size: payload,
      };

    case NEXT_GEN:
      return {
        ...state,
        generations: state.generations + 1,
      };

    case CLEAR:
      return {
        ...state,
        generations: 0,
      };

    case RANDOM_BOARD:
      return {
        ...state,
        generations: 0,
        running: false,
        // we get a board as a result of calling a function.
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
