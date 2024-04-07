import React from "react";
import { IUiConnector } from "../../constants/connectors/list";
import useWalletConnection from "../../hooks/useWalletConnection/useWalletConnection";

export default function ConnectorTemplate({ img, connector }: IUiConnector) {
  const [walletConnection] = useWalletConnection({
    connector,
  });

  const hanldeConnection = async () => {
    walletConnection.hanldeConnection();
  };

  return (
    <button
      onClick={hanldeConnection}
      className="flex items-center gap-3 white-space-pre"
    >
      <img width={50} src={img} alt="" />
      <span>{connector.name}</span>
    </button>
  );
}
