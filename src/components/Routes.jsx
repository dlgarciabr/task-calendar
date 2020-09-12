import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import App from "../App";
import { menuItems } from "./Menu";
import { useWithSecurity } from "../hooks/securityHandler";

const routesFromMenu = menuItems.map((menuItem) => (
  <Route
    path={menuItem.route}
    key={menuItem.code}
    component={menuItem.component}
  />
));

export const routeList = [
  <Route path="/" exact={true} key="HOME">
    Bem vindo ao portal
  </Route>,
  ...routesFromMenu,
];

export default (props) => {
  const withSecurity = useWithSecurity();
  let firstRoute, restingRoutes;
  [firstRoute, ...restingRoutes] = [...routeList];

  const securedRouteList = restingRoutes.map((r) => (
    <Route
      path={r.props.path}
      key={r.key}
      component={withSecurity(r.props.component, r.key)}
    />
  ));

  return (
    <BrowserRouter>
      <Switch>
        <SnackbarProvider maxSnack={3}>
          <App>{[firstRoute, ...securedRouteList]}</App>
        </SnackbarProvider>
      </Switch>
    </BrowserRouter>
  );
};
