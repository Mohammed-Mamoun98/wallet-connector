import { MetaMaskSDK } from "@metamask/sdk";

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "JavaScript example dapp",
    url: window.location.href,
  },
  // Other options
});

// You can also access via window.ethereum

export const getAccount = (): Promise<string> => {
  const ethereum = MMSDK.getProvider();
  return new Promise(async (res, rej) => {
    try {
      const accounts = await ethereum?.request({
        method: "eth_requestAccounts",
      });
      res(accounts as string);
    } catch (error: any) {
      return Promise.reject(error.message as string);
    }
  });
};
//@ts-ignore
window.getAccount = getAccount;
