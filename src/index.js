import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import multi from "redux-multi"; //call multiple action from an action creator
import promise from "redux-promise"; //allow call async action creators
import thunk from "redux-thunk"; //allow async async action creators
import axios from "axios";

import "./index.css";
import rootReducer from "./utils/reducers";
import Routes from "./components/Routes";

axios.defaults.withCredentials = true;

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = applyMiddleware(multi, thunk, promise)(createStore)(
  rootReducer,
  devTools
);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
