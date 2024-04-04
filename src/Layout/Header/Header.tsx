import React from "react";
import { useWalletStore } from "../../state/stores/walletState";
import ConnectBtn from "../../components/ConnectBtn/ConnectBtn";

export default function Header() {
  const { account, balance, chain } = useWalletStore((state) => ({
    account: state.account,
    balance: state.balance,
    chain: state.chain,
  }));

  return (
    <div className="py-4 flex px-2 bg-slate-500">
      <ConnectBtn />
    </div>
  );
}
