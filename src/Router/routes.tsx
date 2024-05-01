import { lazy } from "react";

const LandingPage = lazy(() => import("src/pages/Landing/Landing"  /* webpackChunkName: "LandingPage" */));
const WalletConnectorPage = lazy(() => import("src/pages/WalletConnector/WalletConnector"  /* webpackChunkName: "WalletConnector" */));
const NotFoundPage = lazy(() => import("src/pages/NotFound/NotFound" /* webpackChunkName: "NotFoundPage" */));

export { LandingPage, WalletConnectorPage, NotFoundPage };
