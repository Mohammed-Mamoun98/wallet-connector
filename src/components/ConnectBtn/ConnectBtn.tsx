import React from "react";
import { useWalletStore } from "../../state/stores/walletState";
import ConnectedContent from "../ConnectedContent/ConnectedContent";

export default function ConnectBtn() {
  const { account } = useWalletStore();

  return (
    <div className="flex ml-auto border-gray-300 border-spacing-1 text-white">
      {account ? (
        <ConnectedContent />
      ) : (
        <div className="bg-cyan-400 hover:bg-cyan-300 p-2 rounded-lg cursor-pointer">
          Connect
        </div>
      )}
    </div>
  );
}
