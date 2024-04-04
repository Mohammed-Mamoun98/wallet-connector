import { retrieveFromLs, storeInLs } from "../../utils/localstorage";

export const WALLET_CONNECTION_TYPE = "WALLET_CONNECTION_TYPE";

export const storeConnectionType = (connectorName: string) =>
  storeInLs(WALLET_CONNECTION_TYPE, connectorName);

export const getStoredConnectionType = () => retrieveFromLs(WALLET_CONNECTION_TYPE);
