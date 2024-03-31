import React from "react";
import "./Connectors.scss";
import MmConnector from "./MmConnector/MmConnector";
import WalletConnectConnector from "./WalletConnectConnector/WalletConnectConnector";

export default function Connectors() {
  return (
    <div className="mt-5">
      <div className="mt-5">
        <MmConnector />
        <WalletConnectConnector />
      </div>
    </div>
  );
}
