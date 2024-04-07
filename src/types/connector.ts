import { INetwork } from "../constants/networks";
import { IWalletListeners } from "../state/types/listeners";
import { IBalance, IConnectionInfo } from "../state/types/wallet";
import { EthereumProvider } from "@walletconnect/ethereum-provider";

export interface IConnector<Type = any> {
  name: string;
  connect: (onConnected: (connectionInfo: IConnectionInfo) => any) => Promise<IConnectionInfo>;
  getChain?: () => Promise<INetwork>;
  getAccount?: () => Promise<string>;
  getProvider: () => Type;
  addListeners: (listerner: IWalletListeners) => void;
  disconnect?: () => void;
  getBalance?: (account: string, chainId: number) => Promise<IBalance>;
  autoConnect?: boolean;
  switchChain?: (chainId: number) => void;
}
