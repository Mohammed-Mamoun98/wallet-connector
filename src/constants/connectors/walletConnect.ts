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
  http,
} from "viem";
import { getChainInfo, getViemChain } from "../../services/wallets/mm";
import { IBalance, IConnectionInfo } from "../../state/types/wallet";
import EthereumProvider from "@walletconnect/ethereum-provider";
import { etheruemMethods } from "../../services/wallets/etheruemMethods";

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
    await provider.enable();

    // const currentChain = await this?.getChain?.();
    const client = createWalletClient({
      chain: getViemChain(1),
      transport: custom(provider),
    });

    // skip showing modal in case wallet was previously connected
    // if (!provider.accounts?.length) await provider?.connect();

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
  getAccount: async function () {
    const provider = await this.getProvider();
    const account = await provider.request({
      method: etheruemMethods.REQUEST_CHAIN_ID as any,
    });
    return account as string;
  },
  getBalance: async function (account, chainId: number) {
    const chainInfo = getChainInfo(chainId);
    const viemChain = getViemChain(chainId);

    const client = createPublicClient({
      transport: http(),
      chain: viemChain,
    });
    const balanceValue = await client.getBalance({
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
  getChain: async function () {
    try {
      const provider = await this.getProvider();
      const chain = await provider.request({
        method: etheruemMethods.REQUEST_CHAIN_ID as any,
      });

      const client = createWalletClient({
        chain: viemMainnet,
        transport: custom(provider!),
      });
      // client.c
      alert("new chain to connect" + +chain!);
      const chainInfo = getChainInfo(+chain! as number);
      return chainInfo;
    } catch (error) {
      console.log({ error });
      return getChainInfo(1);
    }
  },
  getProvider: () =>
    EthereumProvider.init({
      chains: [1],
      // optionalChains: [1, 56],
      projectId: walletConnectProjectId as string,
      showQrModal: true,
    }),

  addListeners: async function (listeners) {
    // @ts-ignore
    const provider = await this.getProvider();
    console.log("listeners added!");

    if (!provider) return;

    provider.on("accountsChanged", async (wallets: string[]) => {
      if (!Array.isArray(wallets)) return;
      const account = wallets[0];
      listeners?.onAccountChanged?.(wallets[0]);
      alert("new account" + wallets[0]);

      const chain = await this?.getChain?.();
      const newBalance = await this?.getBalance?.(account, chain?.id as number);
      if (newBalance) listeners.onBalanceChanged?.(newBalance);
    });

    provider.on("chainChanged", async (chain) => {
      const chainInfo = getChainInfo(+chain);

      listeners?.onChainChanged?.(chainInfo);
      const account = (await this.getAccount?.()) || "";

      const newBalance = await this?.getBalance?.(account, +chainInfo?.id!);
      if (newBalance) listeners.onBalanceChanged?.(newBalance);
    });
  },
};
