import { INetwork } from "../../constants/networks";

export interface IBalance {
  value: number | string;
  symbol: string;
  decimals: number;
}

export interface IChian {
  id: number;
  name?: string;
  symbol?: string;
}

export interface WalletState {
  // Account
  account: string;
  setAccount: (newAccount: string) => void;
  // Balance
  balance: IBalance;
  setBalance: (newBalanceInfo: IBalance) => void;
  // Chain
  chain: INetwork | null;
  setChain: (newChain: INetwork) => void;
  // Clear state
  resetInfo: () => void;
}

export interface IConnectionInfo {
  account: string;
  chain: INetwork;
  balance: IBalance;
}
