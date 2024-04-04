import React from "react";
import useWalletConnection from "../../hooks/useWalletConnection/useWalletConnection";
import WalletAddress from "../WalletAddress/WalletAddress";
import { newDisplayFloats } from "../../utils/format";

export default function ConnectedContent() {
  const [{ diconnectWallet, account, balance }] = useWalletConnection({});

  return (
    <div className="flex content-center gap-2">
      <span>
        {newDisplayFloats(+balance.value, 4)} {balance.symbol}
      </span>
      <div onClick={diconnectWallet}>
        <WalletAddress address={account} />
      </div>
    </div>
  );
}
