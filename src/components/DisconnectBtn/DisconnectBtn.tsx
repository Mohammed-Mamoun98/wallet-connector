import React from "react";
import { useWalletStore } from "../../state/stores/walletState";

export default function DisconnectBtn() {
  const { resetInfo, account } = useWalletStore((state) => ({
    resetInfo: state.resetInfo,
    account: state.account,
  }));

  const hasAccount = !!+account;
  
  if (!hasAccount) return <></>;
  return (
    <div className="flex items-center bg-slate-500 p-4 rounded-md mt-3 hover:bg-slate-300">
      <button onClick={resetInfo}>Discconnect</button>
    </div>
  );
}
