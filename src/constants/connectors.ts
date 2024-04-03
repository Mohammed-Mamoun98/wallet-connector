import { getChainInfo } from "../services/wallets/mm";
import { IConnector } from "../types/connector";
import {
  createPublicClient,
  createWalletClient,
  custom,
  formatEther,
} from "viem";
import { mainnet } from "viem/chains";
import { IBalance, IConnectionInfo } from "../state/types/wallet";

const ethereum = window.ethereum;

const client = createWalletClient({
  chain: mainnet,
  transport: custom(ethereum!),
});

const publicClient = createPublicClient({
  chain: mainnet,
  transport: custom(ethereum!),
});

export const metamaskConnector: IConnector = {
  name: "metamask",
  autoConnect: true,
  connect: (onConnected) => {
    // handle mobile browsers or devices that don't have metamask installed
    if (!ethereum) {
      window.open(
        `https://metamask.app.link/dapp/${process.env.REACT_APP_WALLET_APP_LINK}`
      );
      console.warn("please install metamask");
      return null;
    }

    client.requestAddresses().then(async (addresses) => {
      const account = addresses?.[0];

      const chainId = await client.getChainId();
      const chainInfo = getChainInfo(chainId);

      const balanceValue = await publicClient.getBalance({ address: account });
      const balanceInEth = formatEther(balanceValue);
      const balanceCurrency = chainInfo.nativeCurrency.symbol;

      const balance: IBalance = {
        value: balanceInEth,
        symbol: balanceCurrency,
        decimals: chainInfo.nativeCurrency.decimals,
      };

      const connectionInfo: IConnectionInfo = {
        account,
        balance,
        chain: chainInfo,
      };
      onConnected(connectionInfo);
      return;
    });
  },

  getBalance: async (account, chainId) => {
    const chainInfo = getChainInfo(chainId);
    const balanceValue = await publicClient.getBalance({
      address: account as any,
    });
    const balanceInEth = formatEther(balanceValue);
    const balanceCurrency = chainInfo.nativeCurrency.symbol;

    const balance: IBalance = {
      value: balanceInEth,
      symbol: balanceCurrency,
      decimals: chainInfo.nativeCurrency.decimals,
    };
    return balance;
  },

  getProvider: () => {
    if (!ethereum) {
      window.open(
        "https://metamask.app.link/dapp/wallet-connector-six.vercel.app/"
      );

      return null;
    }
    return ethereum;
  },

  getChain: async () => {
    const chainId = await client.getChainId();
    const chainInfo = getChainInfo(chainId);
    return chainInfo;
  },

  getAccount: async () => {
    const wallets = await client.getAddresses();
    if (!Array.isArray(wallets)) return "";
    return wallets[0];
  },

  addListeners: function (listeners) {
    if (!ethereum) return;
    ethereum.on("accountsChanged", async (wallets) => {
      if (!Array.isArray(wallets)) return;
      debugger;

      const account = wallets[0];
      listeners?.onAccountChanged?.(wallets[0]);

      const chain = await this?.getChain?.();
      const newBalance = await this?.getBalance?.(
        account,
        chain?.chainId as number
      );
      if (newBalance) listeners.onBalanceChanged?.(newBalance);
    });

    ethereum.on("chainChanged", async (chain = 0) => {
      const chainInfo = getChainInfo(chain as number);
      listeners?.onChainChanged?.(chainInfo);
      const account = (await this.getAccount?.()) || "";

      const newBalance = await this?.getBalance?.(account, chain as number);
      if (newBalance) listeners.onBalanceChanged?.(newBalance);
    });
  },
  disconnect: () => ethereum?.removeAllListeners(),
};

export const walletConnectors: IConnector[] = [];
