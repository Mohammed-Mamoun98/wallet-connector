import { create } from "zustand";
import { WalletState } from "../types/wallet";

export const useWalletStore = create<WalletState>((set) => ({
  account: "",
  setAccount: (newAccount) => set({ account: newAccount }),
  balance: {
    value: 0,
    symbol: "ETH",
    decimals: 18,
  },
  setBalance: (newBalance) => set({ balance: newBalance }),
  chain: null,
  setChain: (newChain) => set({ chain: newChain }),
  resetInfo: () =>
    set({
      account: "",
      chain: null,
      balance: { value: 0, symbol: "", decimals: 18 },
    }),
}));
