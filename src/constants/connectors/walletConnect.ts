import { mainnet as viemMainnet } from "viem/chains";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers";
import { walletConnectProjectId } from "../apiKeys";
import { IConnector } from "../../types/connector";
import { ethereumNetworks, getChainInfo, getViemChain } from "../networks";
import {
  WalletClient,
  createClient,
  createPublicClient,
  createWalletClient,
  custom,
  formatEther,
  http,
} from "viem";
import { IBalance, IConnectionInfo } from "../../state/types/wallet";
import EthereumProvider from "@walletconnect/ethereum-provider";
import { etheruemMethods } from "../../services/wallets/etheruemMethods";
import { errorCodeMap } from "./metamask";

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
  name: "WalletConnect",
  connect: async function (onConnected) {
    return new Promise(async (res, rej) => {
      try {
        // @ts-ignore
        const provider = await this.getProvider();
        await provider.enable();

        // @ts-ignore
        window.connector = this;
        // @ts-ignore
        this.onConnected = onConnected;

        // const currentChain = await this?.getChain?.();
        const client = createWalletClient({
          chain: getViemChain(1),
          transport: custom(provider),
        });

        // skip showing modal in case wallet was previously connected
        // if (!provider.accounts?.length) await provider?.connect();

        const [account] = await client.getAddresses();
        provider.removeListener("accountsChanged", () => {});
        provider.removeListener("chainChanged", () => {});

        // store provider in window for usage
        // @ts-ignore
        window.provider = provider;
        // @ts-ignore
        window.client = client;

        if (!account) throw new Error("wallet connection failed");

        const publicClient = createPublicClient({
          chain: viemMainnet,
          transport: custom(provider!),
        });

        const chainId = await client.getChainId();
        const chainInfo = getChainInfo(chainId);

        const balanceValue = await publicClient.getBalance({
          address: account,
        });
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
        res(connectionInfo);
      } catch (err) {
        rej(err);
      }
    });
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
  switchChain: async function (chainId: number) {
    const client = (window as any).client as WalletClient;
    try {
      await client.switchChain({ id: chainId });
      // @ts-ignore
      this.connect(this.onConnected);
    } catch (error: any) {
      const code = error.code;
      const errorHandler = errorCodeMap?.[code];
      return errorHandler?.(chainId, client).then(() =>
        this?.switchChain?.(chainId)
      );
    }
  },
  getChain: async function () {
    try {
      const provider = await this.getProvider();
      const client = createWalletClient({
        chain: viemMainnet,
        transport: custom(provider!),
      });
      const chain = await client.getChainId();
      const chainInfo = getChainInfo(+chain! as number);
      return chainInfo;
    } catch (error) {
      console.log({ error });
      return getChainInfo(1);
    }
  },
  getProvider: () =>
    EthereumProvider.init({
      optionalChains: [1, 56],
      projectId: walletConnectProjectId as string,
      showQrModal: true,
    }),

  addListeners: async function (listeners) {
    const provider = await this.getProvider();
    console.log("listeners added!");

    if (!provider) return;

    provider.on("accountsChanged", async (wallets: string[]) => {
      if (!Array.isArray(wallets)) return;
      const account = wallets[0];
      listeners?.onAccountChanged?.(wallets[0]);

      const chain = await this?.getChain?.();
      const newBalance = await this?.getBalance?.(account, chain?.id as number);
      if (newBalance) listeners.onBalanceChanged?.(newBalance);
    });

    provider.on("chainChanged", async (chain) => {
      this.switchChain?.(+chain); // let viem handle state updates like it's an app switch chain order
      // const chainInfo = getChainInfo(+chain);

      // listeners?.onChainChanged?.(chainInfo);
      // const account = (await this.getAccount?.()) || "";

      // const newBalance = await this?.getBalance?.(account, +chainInfo?.id!);
      // if (newBalance) listeners.onBalanceChanged?.(newBalance);
    });
  },
};
