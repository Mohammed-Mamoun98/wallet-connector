import { IConnector } from "../../types/connector";
import { metamaskConnector } from "./metamask";
import { walletConnectConnector } from "./walletConnect";

export interface IUiConnector extends IConnector {
  img: string;
}

export const connectorsList: IUiConnector[] = [
  {
    ...metamaskConnector,
    img: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  },
  {
    ...walletConnectConnector,
    img: "https://altcoinsbox.com/wp-content/uploads/2023/04/wallet-connect-logo.png",
  },
];
