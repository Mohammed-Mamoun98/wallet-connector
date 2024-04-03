import { retrieveFromLs, storeInLs } from "../../utils/localstorage";

export const CONNECTION_TYPE = "CONNECTION_TYPE";

export const storeConnectionType = (connectorName: string) =>
  storeInLs(CONNECTION_TYPE, connectorName);

export const getStoredConnectionType = () => retrieveFromLs(CONNECTION_TYPE);
