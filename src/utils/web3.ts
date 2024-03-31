import Web3 from "web3";

export const wait = (time = 300): Promise<any> =>
  new Promise((res, rej) => {
    setTimeout(() => res(null), time);
  });

export const getWeb3Instance = async (): Promise<any> => {
  // @ts-ignore
  if (window.web3) {
    await wait();
    return getWeb3Instance();
  }
  // @ts-ignore
  return window.web3;
};

export const fromWeiToEth = (value: number) => Web3.utils.fromWei(value, "ether");
