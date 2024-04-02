import React from "react";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers";
import { walletConnectProjectId } from "../../../constants/apiKeys";

const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // url must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
});

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
            modal.open().then((res) => {
              const state = modal.getState();
              const provider = modal.getWalletProvider();
            })
          }
          className="d-flex flex-center gap-3 white-space-pre"
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
