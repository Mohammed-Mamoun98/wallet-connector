import { INetwork } from "../../constants/networks";
import { IBalance, IConnectionInfo } from "./wallet";

export type IWalletListeners = {
  onConnected?: (connectionInfo: IConnectionInfo | null) => void;
  onAccountChanged?: (newAccount: string | null) => void;
  onChainChanged?: (newChain: INetwork) => void;
  onBalanceChanged?: (newBalance: IBalance) => void;
};
