import { lazy } from "react";

const LandingPage = lazy(() => import("src/pages/Landing/Landing"));
const WalletConnectorPage = lazy(() => import("src/pages/WalletConnector/WalletConnector"));
const NotFoundPage = lazy(() => import("src/pages/NotFound/NotFound"));

export { LandingPage, WalletConnectorPage, NotFoundPage };
