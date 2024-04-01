import React, { useEffect } from "react";
import { useWalletStore } from "../../../state/stores/walletState";
import { connectMetaMask, getBalance } from "../../../services/wallets/mm";
import { IConnectionInfo } from "../../../state/types/wallet";

export default function MmConnector() {
  const { setAccount, setChain, setBalance } = useWalletStore((state) => state);

  const handleConnectionSuccess = (res: IConnectionInfo | null) => {
    if (!res) return;
    setChain(res.chain);
    setAccount(res.account);
    setBalance(res.balance);
  };

  const hanldeConnection = async () => {
    const connectionInfo = await connectMetaMask({
      onConnected: handleConnectionSuccess,
    });
  };

  // const connect = async () => {
  //   try {
  //     sdk?.connect().then(handleConnectionSuccess);
  //   } catch (err) {
  //     console.warn(`failed to connect..`, err);
  //   }
  // };

  // useEffect(() => {
  //   handleConnectionSuccess();
  // }, [chainId, balance, account]);

  // useEffect(() => {
  //   if (!account) return;
  // }, [account]);

  return (
    <div>
      <div className="">
        <button
          className="d-flex flex-center gap-3 white-space-pre"
          onClick={hanldeConnection}
        >
          <img
            width={50}
            src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
            alt=""
          />
          <span>MetaMask </span>
          <span>{JSON.stringify({ aa: window.ethereum?.isMetaMask })}</span>
        </button>
      </div>
    </div>
  );
}
