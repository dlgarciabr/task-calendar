// views/app/ducks.js
import moment from "moment";

import messages from "../../utils/messages";

// action types
export const types = {
  ENQUEUE_SNACKBAR: "views/app/ENQUEUE_SNACKBAR",
  CLOSE_SNACKBAR: "views/app/CLOSE_SNACKBAR",
  REMOVE_SNACKBAR: "views/app/REMOVE_SNACKBAR",
};

// initial state
export const initialState = {
  notifications: [],
  reminders: [
    {
      description: "note",
      datetime: moment().hour(7),
      color: "#DF74DA",
      city: "Rio",
    },
    {
      description: "note aaa",
      datetime: moment().hour(1),
      color: "#74DF8B",
      city: "SP",
    },
    {
      description: "note aaa",
      datetime: moment().dates(1).hour(5),
      color: "#74DF8B",
      city: "SP",
    },
    {
      description: "note bbb",
      datetime: moment().hour(11),
      color: "#714D55",
      city: "MG",
    },
    {
      description: "note dddd",
      datetime: moment().hour(10),
      color: "#DF74DA",
      city: "MG",
    },
  ],
};

// reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case types.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [action.payload],
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
