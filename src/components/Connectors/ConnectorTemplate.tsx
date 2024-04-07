import React from "react";
import { IUiConnector } from "../../constants/connectors/list";
import useWalletConnection from "../../hooks/useWalletConnection/useWalletConnection";

export default function ConnectorTemplate({ renderedIcon, connector }: IUiConnector) {
  const [walletConnection] = useWalletConnection({
    connector,
  });

  const hanldeConnection = async () => {
    walletConnection.hanldeConnection();
  };

  return (
    <button
      onClick={hanldeConnection}
      className="flex items-center gap-[12px] white-space-pre p-[12px] hover:bg-[#3D3C3C] w-[100%] rounded-[12px]"
    >
      {renderedIcon}
      <span className="text-white">{connector.name}</span>
    </button>
  );
}
