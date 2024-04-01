import React, { useEffect } from "react";
import { useWalletStore } from "../../../state/stores/walletState";
// import { useSDK } from "@metamask/sdk-react";
import Web3 from "web3";
import { ethereumNetworks } from "../../../constants/networks";
import { fromWeiToEth } from "../../../utils/web3";
import { MetaMaskSDK } from "@metamask/sdk";
import { getAccount } from "./walletMethods";
import { usePromise } from "../../../hooks/usePromise/usePromise";
import { connectMetaMask, getBalance } from "../../../services/wallets/mm";
import { IConnectionInfo } from "../../../state/types/wallet";

export default function MmConnector() {
  const MMSDK = new MetaMaskSDK({
    dappMetadata: {
      name: "JavaScript example dapp",
      url: window.location.href,
    },
    infuraAPIKey: process.env.INFURA_API_KEY,
    // Other options
  });

  useEffect(() => {}, []);

  // You can also access via window.ethereum
  const ethereum = MMSDK.getProvider();
  // const { sdk, connected, connecting, provider, chainId, account, balance } =
  //   useSDK();
  const { setAccount, setChain, setBalance } = useWalletStore((state) => state);
  //@ts-ignore

  const handleChainChange = (chain: number) => {
    if (!chain) return;
    const chainInfo = ethereumNetworks[+chain];
    const chainSymbol = chainInfo.nativeCurrency.symbol;
    setChain(chainInfo);
  };

  const handleConnectionSuccess = (res: IConnectionInfo | null) => {
    if (!res) return;
    setChain(res.chain);
    setAccount(res.account);
    setBalance(res.balance);

    // if (!chainId) return;
    // const chainInfo = ethereumNetworks[+chainId];
    // const chainSymbol = chainInfo.nativeCurrency.symbol;
    // setChain(chainInfo);
    // if (account) setAccount(account);
    // const parsedBalance = +fromWeiToEth(+(balance || 0));
    // setBalance({ value: parsedBalance, symbol: chainSymbol });
  };

  const hanldeConnection = async () => {
    const connectionInfo = await connectMetaMask({
      onConnected: handleConnectionSuccess,
    });

    // .then(handleConnectionSuccess);
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
        </button>
      </div>
    </div>
  );
}
