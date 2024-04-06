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
  resetInfo: function () {
    set({
      account: "",
      chain: null,
      balance: { value: 0, symbol: this?.chain?.chainName || "", decimals: 18 },
    });
  },
}));
