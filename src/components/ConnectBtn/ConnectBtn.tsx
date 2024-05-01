import React, { useEffect } from "react";
import { useWalletStore } from "../../state/stores/walletState";
import { useModalStore } from "src/state/stores/modalState";
import ConnectWalletModal from "./ConnectWalletModal/ConnectWalletModal";
import { retrieveFromLs } from "src/utils/localstorage";
import { WALLET_CONNECTION_TYPE } from "src/services/wallet/connectionPreservers";
import { connectorsList } from "src/constants/connectors/list";
import useWalletConnection from "src/hooks/useWalletConnection/useWalletConnection";
import ConnectedContent from "../ConnectedContent/ConnectedContent";

const storedConnectioType = retrieveFromLs(WALLET_CONNECTION_TYPE);
const uiConnector = connectorsList.find(
  (con) => con.connector.name === storedConnectioType
);

const defaultConnector = uiConnector ? uiConnector.connector : null;

export default function ConnectBtn() {
  const { account } = useWalletStore();
  const { openModal } = useModalStore();
  const [{ hanldeConnection }] = useWalletConnection();

  const openConnectionModal = () => {
    openModal({ modalContent: <ConnectWalletModal /> });
  };

  useEffect(() => {
    if (!defaultConnector) return;
    hanldeConnection(defaultConnector);
  }, []);

  if (account) return <ConnectedContent />;

  return (
    <div
      onClick={openConnectionModal}
      className="text-white bg-[#6140ef] hover:bg-[#4e33bf] p-2 rounded-[12px] cursor-pointer font-mono text-center w-full md:w-fit"
    >
      Connect Wallet
    </div>
  );
}
