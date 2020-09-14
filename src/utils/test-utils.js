import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import multi from "redux-multi"; //multiple action from an action creator
import promise from "redux-promise"; //allow async actions
import thunk from "redux-thunk"; //allow async actions
import { SnackbarProvider } from "notistack";

import rootReducer from "./reducers";

import App from "../App";

function render(
  ui,
  {
    store = applyMiddleware(multi, thunk, promise)(createStore)(rootReducer),
    ...renderOptions
  } = {}
) {
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <SnackbarProvider maxSnack={3}>
              <App />
            </SnackbarProvider>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";

export { render };
