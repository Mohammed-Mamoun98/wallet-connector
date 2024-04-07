import React from "react";
import { useWalletStore } from "../../state/stores/walletState";
import { useModalStore } from "src/state/stores/modalState";
import ConnectWalletModal from "./ConnectWalletModal/ConnectWalletModal";

export default function ConnectBtn() {
  const { account } = useWalletStore();
  const { openModal } = useModalStore();

  const openConnectionModal = () => {
    openModal({ modalContent: <ConnectWalletModal /> });
  };

  if (account) return <></>;

  return (
    <div
      onClick={openConnectionModal}
      className="text-white ml-auto bg-[#17BD3B] hover:bg-[#3CE461] p-2 rounded-[12px] cursor-pointer"
    >
      Connect
    </div>
  );
}
