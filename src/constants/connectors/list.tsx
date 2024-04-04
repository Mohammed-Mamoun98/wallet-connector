import { IConnector } from "../../types/connector";
import { metamaskConnector } from "./metamask";
import { walletConnectConnector } from "./walletConnect";

export interface IUiConnector {
  img: string;
  connector: IConnector;
}

export const connectorsList: IUiConnector[] = [
  {
    connector: metamaskConnector,
    img: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  },
  {
    connector: walletConnectConnector,
    img: "https://altcoinsbox.com/wp-content/uploads/2023/04/wallet-connect-logo.png",
  },
];
