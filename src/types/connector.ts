import { INetwork } from "../constants/networks";
import { IWalletListeners } from "../state/types/listeners";
import { IBalance, IConnectionInfo } from "../state/types/wallet";

export interface IConnector {
  name: string;
  connect: (onConnected: (connectionInfo: IConnectionInfo) => any) => any;
  getChain?: () => Promise<INetwork>;
  getAccount?: () => Promise<string>;
  getProvider: () => void;
  addListeners: (listerner: IWalletListeners) => void;
  disconnect?: () => void;
  getBalance?: (account: string, chainId: number) => Promise<IBalance>;
  autoConnect?: boolean;
}
