// views/app/ducks.js

import messages from "../../utils/messages";

// action types
export const types = {
  NETWORK_ERROR_OCCURRED: "views/app/NETWORK_ERROR_OCCURRED",
  ENQUEUE_SNACKBAR: "views/app/ENQUEUE_SNACKBAR",
  CLOSE_SNACKBAR: "views/app/CLOSE_SNACKBAR",
  REMOVE_SNACKBAR: "views/app/REMOVE_SNACKBAR",
  USER_RETRIEVED: "views/app/USER_RETRIEVED",
  RULES_RETRIEVED: "views/app/RULES_RETRIEVED",
};

// initial state
export const initialState = {
  online: true,
  user: null,
  notifications: [],
  allRules: [],
};

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case types.NETWORK_ERROR_OCCURRED:
      return {
        ...state,
        online: false,
      };
    case types.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [action.payload],
      };
    case types.USER_RETRIEVED:
      return {
        ...state,
        user: action.payload,
      };
    case types.RULES_RETRIEVED:
      return {
        ...state,
        allRules: action.payload,
      };
    default:
      return state;
  }
};

// Action Creators
export const getSuccessMessage = () => ({
  type: types.ENQUEUE_SNACKBAR,
  payload: {
    message: messages.OPERATION_SUCCESSFULL,
    variant: "success",
    key: new Date().getTime(),
  },
});

export const getErrorMessage = (message) => ({
  type: types.ENQUEUE_SNACKBAR,
  payload: {
    message: message || messages.OPERATION_ERROR,
    variant: "error",
    key: new Date().getTime(),
  },
});

export const fulfillUser = (user) => ({
  type: types.USER_RETRIEVED,
  payload: user,
});

export const fulfillAllRules = (rules) => ({
  type: types.RULES_RETRIEVED,
  payload: rules,
});

export const networkErrorOccurred = () => ({
  type: types.NETWORK_ERROR_OCCURRED,
});
