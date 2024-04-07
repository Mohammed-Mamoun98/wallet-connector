import React from "react";
import ConnectWalletHeader from "./ConnectWalletHeader/ConnectWalletHeader";
import Connectors from "src/components/Connectors/Connectors";

export default function ConnectWalletModal() {
  return (
    <div>
      <ConnectWalletHeader />
      <Connectors />
    </div>
  );
}
