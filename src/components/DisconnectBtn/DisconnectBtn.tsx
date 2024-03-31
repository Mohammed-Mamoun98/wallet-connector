import React from "react";
import { useWalletStore } from "../../state/stores/walletState";

export default function DisconnectBtn() {
  const { resetInfo, account } = useWalletStore((state) => ({
    resetInfo: state.resetInfo,
    account: state.account,
  }));

  const hasAccount = !!+account;
  console.log({account});
  
  if (!hasAccount) return <></>;
  return (
    <div className="d-flex flex-center">
      <button onClick={resetInfo}>Discconnect</button>
    </div>
  );
}
