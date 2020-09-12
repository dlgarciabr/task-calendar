import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import multi from "redux-multi"; //call multiple action from an action creator
import promise from "redux-promise"; //allow call async action creators
import thunk from "redux-thunk"; //allow async async action creators
import { SnackbarProvider } from "notistack";

import "./index.css";
import App from './App';
import rootReducer from "./utils/reducers";

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = applyMiddleware(multi, thunk, promise)(createStore)(
  rootReducer,
  devTools
);

ReactDOM.render(
  <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <App/>
        </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);
