import { combineReducers } from "redux";

import AppReducer from "../views/app/ducks";

const appReducer = combineReducers({
  app: AppReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "CLEAR_STORE") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
