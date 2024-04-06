import React from "react";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers";
import { walletConnectProjectId } from "../../../constants/apiKeys";
import { ethersConfig, mainnet } from "../../../constants/walletConnect";
import { etheruemMethods } from "../../../services/wallets/etheruemMethods";
import { walletConnectConnector } from "../../../constants/connectors/walletConnect";
import { useWalletStore } from "../../../state/stores/walletState";
import { IConnectionInfo } from "../../../state/types/wallet";

export default function WalletConnectConnector() {
  const { setAccount, setChain, setBalance } = useWalletStore((state) => state);

  const handleConnectionSuccess = (res: IConnectionInfo | null) => {
    if (!res) return;
    setChain(res.chain);
    setAccount(res.account);
    setBalance(res.balance);
  };

  const handleConnection = () => {
    walletConnectConnector.connect((connectionInfo) => {
      handleConnectionSuccess(connectionInfo);
      walletConnectConnector.addListeners({
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
    <div>
      <div className="">
        <button
          onClick={handleConnection}
          className="flex items-center gap-3 white-space-pre"
        >
          <img
            width={50}
            src="https://altcoinsbox.com/wp-content/uploads/2023/04/wallet-connect-logo.png"
            alt=""
          />
          <span>WalletConnect Connect</span>
        </button>
      </div>
    </div>
  );
}
