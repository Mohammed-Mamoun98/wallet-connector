import { mainnet as viemMainnet } from "viem/chains";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers";
import { walletConnectProjectId } from "../apiKeys";
import { IConnector } from "../../types/connector";
import { ethereumNetworks } from "../networks";
import {
  createClient,
  createPublicClient,
  createWalletClient,
  custom,
  formatEther,
} from "viem";
import { getChainInfo } from "../../services/wallets/mm";
import { IBalance, IConnectionInfo } from "../../state/types/wallet";
import EthereumProvider from "@walletconnect/ethereum-provider";

export const mainnet = {
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

export const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
});

export const walletConnectConnector: IConnector<Promise<EthereumProvider>> = {
  name: "walletConnect",
  connect: async function (onConnected) {
    // @ts-ignore
    const provider = await this.getProvider();

    const client = createWalletClient({
      chain: viemMainnet,
      transport: custom(provider),
    });

    // skip showing modal in case wallet was previously connected
    if (!provider.accounts?.length) await provider?.connect();

    const [account] = await client.getAddresses();

    // store provider in window for usage
    // @ts-ignore
    window.provider = provider;

    if (!account) throw new Error("wallet connection failed");

    const publicClient = createPublicClient({
      chain: viemMainnet,
      transport: custom(provider!),
    });

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
  },
  disconnect: async function () {
    const provider = await this.getProvider();
    return provider.disconnect();
  },
  getAccount: async () => "",
  getBalance: async () => {
    return { decimals: 18, symbol: "", value: 1 };
  },
  getChain: async () => {
    return ethereumNetworks?.[1];
  },
  getProvider: () =>
    EthereumProvider.init({
      chains: [1],
      projectId: walletConnectProjectId as string,
      showQrModal: true,
    }),

  addListeners: async function (listeners) {
    // @ts-ignore
    const provider = await this.getProvider();
    if (!provider) return;

    provider.on("accountsChanged", async (wallets: string[]) => {
      if (!Array.isArray(wallets)) return;
      const account = wallets[0];
      listeners?.onAccountChanged?.(wallets[0]);
      console.log("new account" + wallets[0]);

      const chain = await this?.getChain?.();
      const newBalance = await this?.getBalance?.(
        account,
        chain?.chainId as number
      );
      if (newBalance) listeners.onBalanceChanged?.(newBalance);
    });

    provider.on("chainChanged", async (chain) => {
      const chainInfo = getChainInfo(+chain);
      console.log("new chain" + chain);

      listeners?.onChainChanged?.(chainInfo);
      const account = (await this.getAccount?.()) || "";

      const newBalance = await this?.getBalance?.(account, +chain);
      if (newBalance) listeners.onBalanceChanged?.(newBalance);
    });
  },
};
