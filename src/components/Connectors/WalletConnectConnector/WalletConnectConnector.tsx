import React from "react";
import { WalletConnectModal } from "@walletconnect/modal";
// import { walletConnectProjectId } from "../../constants/apiKeys";
// import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function WalletConnectConnector() {
  // const { open, close } = useWeb3Modal();

  return (
    <div>
      <div className="">
        <button className="d-flex flex-center gap-3 white-space-pre">
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
