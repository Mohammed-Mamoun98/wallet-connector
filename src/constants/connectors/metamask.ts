import {
  WalletClient,
  createClient,
  createPublicClient,
  createWalletClient,
  custom,
  formatEther,
  http,
} from "viem";
import { mainnet } from "viem/chains";
import { IConnector } from "../../types/connector";
import { IBalance, IConnectionInfo } from "../../state/types/wallet";
import EthereumProvider from "@walletconnect/ethereum-provider/dist/types/EthereumProvider";
import { SDKProvider } from "@metamask/sdk";
import { etheruemMethods } from "../../services/wallets/etheruemMethods";
import { getChainInfo, getViemChain } from "../networks";

const ethereum = window.ethereum;

export const errorCodeMap: Record<
  number,
  (chainId: number, client: WalletClient) => Promise<any>
> = {
  4902: (chainId: number, client: WalletClient) =>
    client.addChain({ chain: getViemChain(chainId) }),
};

export const metamaskConnector: IConnector<SDKProvider> = {
  name: "MetaMask",
  connect: async function (onConnected) {
    return new Promise((res, rej) => {
      const provider = this.getProvider();

      // @ts-ignore
      window.connector = this;

      // @ts-ignore
      window.provider = provider;

      // handle mobile browsers or devices that don't have metamask installed
      if (!provider) {
        window.open(
          `https://metamask.app.link/dapp/${process.env.REACT_APP_WALLET_APP_LINK}`
        );
        console.warn("please install metamask");
        return null;
      }

      const client = createWalletClient({
        chain: mainnet,
        transport: custom(ethereum!),
      });

      // @ts-ignore
      window.client = client;

      client
        .requestAddresses()
        .then(async (addresses) => {
          const account = addresses?.[0];

          const chainId = await client.getChainId();
          const chainInfo = getChainInfo(chainId);
          const viemChain = getViemChain(chainId);

          if (!viemChain) throw new Error("Unsupported Network");

          const publicClient = createPublicClient({
            chain: viemChain,
            transport: http(),
          });

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
        })
        .catch((err) => {
          rej(err);
        });
    });
  },
  switchChain: async function (chainId: number) {
    const client = (window as any).client as WalletClient;
    try {
      await client.switchChain({ id: chainId });
    } catch (error: any) {
      const code = error.code;
      const errorHandler = errorCodeMap?.[code];

      // handle error then proceed to switch the chain (currently it's unsupported network)
      return errorHandler?.(chainId, client).then(() =>
        this?.switchChain?.(chainId)
      );
    }
  },

  getBalance: async (account, chainId) => {
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

  getProvider: () => window.ethereum as SDKProvider,
  getChain: async function () {
    const client = createWalletClient({
      chain: mainnet,
      transport: custom(ethereum!),
    });
    const chainId = await client.getChainId();
    const chainInfo = getChainInfo(+chainId! as number);

    return chainInfo;
  },

  getAccount: async () => {
    const client = createWalletClient({
      chain: mainnet,
      transport: custom(ethereum!),
    });
    const wallets = await client.getAddresses();
    if (!Array.isArray(wallets)) return "";
    return wallets[0];
  },

  addListeners: function (listeners) {
    if (!ethereum) return;
    ethereum.on("accountsChanged", async (wallets) => {
      if (!Array.isArray(wallets)) return;
      const account = wallets[0];
      listeners?.onAccountChanged?.(wallets[0]);

      const chain = await this?.getChain?.();
      const newBalance = await this?.getBalance?.(account, chain?.id as number);
      if (newBalance) listeners.onBalanceChanged?.(newBalance);
    });

    //@ts-ignore
    ethereum.on("chainChanged", async (chain: string) => {
      const chainInfo = getChainInfo(+chain);
      listeners?.onChainChanged?.(chainInfo);
      const account = (await this.getAccount?.()) || "";
      const newBalance = await this?.getBalance?.(account, +chain);
      if (newBalance) listeners.onBalanceChanged?.(newBalance);
    });
  },
  disconnect: () => ethereum?.removeAllListeners(),
};

export const walletConnectors: IConnector[] = [];
