import React from "react";
import { useWalletStore } from "../../state/stores/walletState";

export default function Header() {
  const { account, balance, chain } = useWalletStore((state) => ({
    account: state.account,
    balance: state.balance,
    chain: state.chain,
  }));

  return (
    <div className="">
      <div className="">
        <h5>Account: {account}</h5>
        <h5 className="">Chain: {chain?.chainName}</h5>
      </div>
      <div className="">
        <h5>
          Balance: {balance.value} {chain?.nativeCurrency.symbol}
        </h5>
      </div>
    </div>
  );
}
