import React, { useEffect } from "react";
import { IConnector } from "../../types/connector";
import { IUiConnector } from "../../constants/connectors/list";
import { useWalletStore } from "../../state/stores/walletState";
import { IConnectionInfo } from "../../state/types/wallet";
import { storeConnectionType } from "../../services/wallet/connectionPreservers";

export default function ConnectorTemplate({ img, ...connector }: IUiConnector) {
  const { setAccount, setChain, setBalance } = useWalletStore((state) => state);

  const handleConnectionSuccess = (res: IConnectionInfo | null) => {
    if (!res) return;
    setChain(res.chain);
    setAccount(res.account);
    setBalance(res.balance);
  };

  const hanldeConnection = async () => {
    connector.connect((connectionInfo) => {
      storeConnectionType(connector.name);

      handleConnectionSuccess(connectionInfo);
      connector.addListeners({
        onAccountChanged: (newAccount) => {
          setAccount(newAccount as string);
        },
        onBalanceChanged: (newBalance) => {
          setBalance(newBalance);
        },
        onChainChanged: (newChain) => {
          setChain(newChain);
        },
      });
    });
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
