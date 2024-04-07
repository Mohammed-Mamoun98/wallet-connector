import { IConnector } from "../../types/connector";
import { metamaskConnector } from "./metamask";
import { walletConnectConnector } from "./walletConnect";
import { ReactComponent as MetaMaskIcon } from "src/assets/svgs/metamask.svg";
import { ReactComponent as WalletConnectIcon } from "src/assets/svgs/walletConnect.svg";

export interface IUiConnector {
  img?: string;
  connector: IConnector;
  renderedIcon?: JSX.Element;
}

export const connectorsList: IUiConnector[] = [
  {
    connector: metamaskConnector,
    renderedIcon: <MetaMaskIcon />,
    // img: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  },
  {
    connector: walletConnectConnector,
    renderedIcon: <WalletConnectIcon />,
    // img: "https://altcoinsbox.com/wp-content/uploads/2023/04/wallet-connect-logo.png",
  },
];
