import { defaultConfig } from "@web3modal/ethers";

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
