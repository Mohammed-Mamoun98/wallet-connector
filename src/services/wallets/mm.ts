import { MetaMaskSDK } from "@metamask/sdk";
import { IWalletListeners } from "../../state/types/listeners";
import { IBalance, IChian, IConnectionInfo } from "../../state/types/wallet";
import { fromWeiToEth } from "../../utils/web3";
import { newDisplayFloats } from "../../utils/format";
import { INetwork, ethereumNetworks } from "../../constants/networks";
import detectEthereumProvider from "@metamask/detect-provider";

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "JavaScript example dapp",
    url: window.location.href,
  },
  infuraAPIKey: "d3099dcc710c4909bd4882e850fdf962", //TODO: move to ENV keys
  // Other options
});

// You can also access via window.ethereum

export const defaultEventListener: IWalletListeners = {
  onAccountChanged: () => null,
  onChainChanged: () => null,
  onConnected: () => null,
};

export const getBalance = async (account: string) => {
  const ethereum = MMSDK.getProvider();

  if (!ethereum) return 0;
  const balanceInWei = await ethereum?.request({
    method: "eth_getBalance",
    params: [account],
  });

  if (!+(balanceInWei as string)) return 0;
  let balance = fromWeiToEth(+(balanceInWei || 0));
  balance = newDisplayFloats(+balance, 3).toString();
  return +balance;
};

export const getChainInfo = (chainId: number): INetwork =>
  ethereumNetworks[+chainId];

export const getBalanceInfo = (
  balanceValue: number,
  chainInfo: INetwork
): IBalance => ({
  value: balanceValue,
  symbol: chainInfo.nativeCurrency.symbol,
  decimals: chainInfo.nativeCurrency.decimals,
});

export const connectMetaMask = async (
  listeners = defaultEventListener
): Promise<IConnectionInfo | null> => {
  const ethereum = MMSDK.getProvider();
  const provider = await detectEthereumProvider();
  console.log({ foundProvider: provider });

  if (!ethereum) return null;

  const accounts = await ethereum?.request({
    method: "eth_requestAccounts",
  });

  if (!Array.isArray(accounts)) return null;

  const account = accounts[0];

  const balanceValue = await getBalance(account);

  const chainId = (await ethereum?.request({ method: "eth_chainId" })) || 0;

  const chainInfo: INetwork = getChainInfo(chainId as number);

  const connectionInfo: IConnectionInfo = {
    chain: chainInfo,
    account,
    balance: getBalanceInfo(balanceValue, chainInfo),
  };

  ethereum.on("accountsChanged", (wallet) => {
    if (!Array.isArray(wallet)) return;
    connectionInfo.account = wallet[0];
    listeners?.onConnected?.(connectionInfo);
  });

  ethereum.on("chainChanged", async (chain = 0) => {
    const chainInfo: INetwork = getChainInfo(chain as number);
    const balanceValue = await getBalance(account);

    connectionInfo.chain = chainInfo;
    connectionInfo.balance = getBalanceInfo(balanceValue, chainInfo);

    listeners?.onConnected?.(connectionInfo);
  });

  listeners?.onConnected?.(connectionInfo);

  return connectionInfo;
};
