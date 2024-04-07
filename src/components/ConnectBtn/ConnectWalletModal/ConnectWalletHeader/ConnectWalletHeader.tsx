import React from "react";
import { ReactComponent as ExitIcon } from "src/assets/svgs/exit-icon.svg";
import { useModalStore } from "src/state/stores/modalState";

export default function ConnectWalletHeader() {
  const { closeModal } = useModalStore();
  return (
    <div className="flex justify-between items-center">
      <span className="text-base text-white opacity-70" >Select your wallet</span>
      <ExitIcon className="cursor-pointer" width={11} onClick={closeModal} />
    </div>
  );
}
