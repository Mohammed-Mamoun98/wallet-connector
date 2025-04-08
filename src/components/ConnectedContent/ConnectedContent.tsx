import React from "react";
import { ReactComponent as DisconnectIcon } from "src/assets/svgs/disconnect.svg";
import useWalletConnection from "../../hooks/useWalletConnection/useWalletConnection";
import WalletAddress from "../WalletAddress/WalletAddress";
import { newDisplayFloats } from "../../utils/format";
import ChainSelector from "../ChainSelector/ChainSelector";

export default function ConnectedContent() {
  const [{ diconnectWallet, account, balance }] = useWalletConnection({});

  if (!account) return <></>;

  return (
    <div className="flex content-center gap-2 text-white items-center">
      <div className="flex h-full items-center px-2 border rounded-xl border-[#38383A]  gap-2">
        <span className="whitespace-pre">
          {newDisplayFloats(+balance.value, 4)} {balance.symbol}
        </span>
        <div className="cursor-pointer">
          <WalletAddress address={account} />
        </div>
        <DisconnectIcon
          onClick={diconnectWallet}
          width={20}
          className="opacity-40 cursor-pointer hover:opacity-30"
        />
      </div>
    </div>
  );
}
