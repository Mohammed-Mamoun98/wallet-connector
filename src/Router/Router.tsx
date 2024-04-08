import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { LandingPage, WalletConnectorPage, NotFoundPage } from "./routes";

export default function AppRouter() {
  return (
    <Suspense fallback={<></>}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route
            path="/wallet-connector"
            exact
            component={WalletConnectorPage}
          />
          <Route path="*" exact component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
