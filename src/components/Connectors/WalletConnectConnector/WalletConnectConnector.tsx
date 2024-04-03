import React from "react";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers";
import { walletConnectProjectId } from "../../../constants/apiKeys";
import { ethersConfig, mainnet } from "../../../constants/walletConnect";
import { etheruemMethods } from "../../../services/wallets/etheruemMethods";

// 5. Create a Web3Modal instance
const modal = createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId: walletConnectProjectId as string,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});
// 653e5815deea0be9dc591bdc907af516

export default function WalletConnectConnector() {
  return (
    <div>
      <div className="">
        <button
          onClick={() =>
            modal.open().then(async (res) => {
              const state = modal.getState();
              const provider = modal.getWalletProvider();
              const account = await provider?.request(
                etheruemMethods.REQUEST_ACCOUNTS
              );
            })
          }
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
