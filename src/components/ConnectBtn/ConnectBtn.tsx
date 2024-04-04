import React from "react";
import { useWalletStore } from "../../state/stores/walletState";
import WalletAddress from "../WalletAddress/WalletAddress";
import useWalletConnection from "../../hooks/useWalletConnection/useWalletConnection";

export default function ConnectBtn() {
  const { account, resetInfo } = useWalletStore();
  const [{ diconnectWallet, hanldeConnection }] = useWalletConnection({});

  return (
    <div className="flex ml-auto border-gray-300 border-spacing-1 text-white">
      {account ? (
        <div onClick={diconnectWallet}>
          <WalletAddress address={account} />
        </div>
      ) : (
        <div className="bg-cyan-400 hover:bg-cyan-300 p-2 rounded-lg cursor-pointer">
          Connect
        </div>
      )}
    </div>
  );
}
