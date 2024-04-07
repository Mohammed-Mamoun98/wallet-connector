import React from "react";
import useWalletConnection from "../../hooks/useWalletConnection/useWalletConnection";
import WalletAddress from "../WalletAddress/WalletAddress";
import { newDisplayFloats } from "../../utils/format";
import ChainSelector from "../ChainSelector/ChainSelector";

export default function ConnectedContent() {
  const [{ diconnectWallet, account, balance }] = useWalletConnection({});

  if (!account) return <></>;

  return (
    <div className=" ml-auto flex content-center gap-2 text-white items-center">
      <span>
        {newDisplayFloats(+balance.value, 4)} {balance.symbol}
      </span>
      <div onClick={diconnectWallet}>
        <WalletAddress address={account} />
      </div>
      <ChainSelector />
    </div>
  );
}
