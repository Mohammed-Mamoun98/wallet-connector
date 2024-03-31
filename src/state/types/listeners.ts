import { IConnectionInfo } from "./wallet";

export type IWalletListeners = {
  onConnected?: (connectionInfo: IConnectionInfo | null) => void;
  onAccountChanged?: (newAccount: string | null) => void;
  onChainChanged?: (newChain: number) => void;
};
