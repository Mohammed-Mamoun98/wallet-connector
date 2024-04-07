import React from "react";
import { useWalletStore } from "../../state/stores/walletState";
import ConnectBtn from "../../components/ConnectBtn/ConnectBtn";
import ChainSelector from "src/components/ChainSelector/ChainSelector";
import ConnectedContent from "src/components/ConnectedContent/ConnectedContent";
import Modal from "src/components/Shared/Modal/Modal";

export default function Header() {
  return (
    <div className="py-4 flex px-2 gap-2 bg-[#2c2c2c] justify-between items-center">
      <ConnectBtn />
      <ConnectedContent />
    </div>
  );
}
