import React, { useEffect } from "react";
import { useWalletStore } from "../../../state/stores/walletState";
import { IConnectionInfo } from "../../../state/types/wallet";
import { metamaskConnector } from "../../../constants/connectors/metamask";

export default function MmConnector() {
  const { setAccount, setChain, setBalance } = useWalletStore((state) => state);

  const handleConnectionSuccess = (res: IConnectionInfo | null) => {
    if (!res) return;
    setChain(res.chain);
    setAccount(res.account);
    setBalance(res.balance);
  };

  const hanldeConnection = async () => {
    metamaskConnector.connect((connectionInfo) => {
      handleConnectionSuccess(connectionInfo);
      metamaskConnector.addListeners({
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

  useEffect(() => {
    if (metamaskConnector.autoConnect) hanldeConnection();
  }, []);

  return (
    <div>
      <div className="">
        <button
          className="flex items-center gap-3 white-space-pre"
          onClick={hanldeConnection}
        >
          <img
            width={50}
            src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
            alt=""
          />
          <span>MetaMask </span>
        </button>
      </div>
    </div>
  );
}
