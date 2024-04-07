import { MetaMaskSDK } from "@metamask/sdk";
import { IWalletListeners } from "../../state/types/listeners";
import { IBalance, IChian, IConnectionInfo } from "../../state/types/wallet";
import { fromWeiToEth } from "../../utils/web3";
import { newDisplayFloats } from "../../utils/format";
import {
  CHAINS,
  INetwork,
  INetworkWithIcon,
  ethereumNetworks,
  getChainInfo,
  mapToFitViem,
} from "../../constants/networks";
import { etheruemMethods } from "./etheruemMethods";
import { Chain } from "viem";

const ethereum = window.ethereum;

export const defaultEventListener: IWalletListeners = {
  onAccountChanged: () => null,
  onChainChanged: () => null,
  onConnected: () => null,
};

export const getBalance = async (account: string) => {
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
  if (!ethereum) {
    window.open(
      `https://metamask.app.link/dapp/${process.env.REACT_APP_WALLET_APP_LINK}/`
    );

    return null;
  }

  const accounts = await ethereum?.request(etheruemMethods.REQUEST_ACCOUNTS);

  if (!Array.isArray(accounts)) return null;

  const account = accounts[0];

  const balanceValue = await getBalance(account);

  const chainId =
    (await ethereum?.request(etheruemMethods.REQUEST_CHAIN_ID)) || 0;

  const chainInfo = getChainInfo(chainId as number);

  const connectionInfo: IConnectionInfo = {
    chain: chainInfo,
    account,
    balance: getBalanceInfo(balanceValue, chainInfo),
  };

  if (!ethereum) return null;

  ethereum.on("accountsChanged", (wallet) => {
    if (!Array.isArray(wallet)) return;
    connectionInfo.account = wallet[0];
    listeners?.onConnected?.(connectionInfo);
  });

  ethereum.on("chainChanged", async (chain = 0) => {
    const chainInfo = getChainInfo(chain as number);
    const balanceValue = await getBalance(account);

    connectionInfo.chain = chainInfo;
    connectionInfo.balance = getBalanceInfo(balanceValue, chainInfo);

    listeners?.onConnected?.(connectionInfo);
  });

  listeners?.onConnected?.(connectionInfo);

  return connectionInfo;
};
