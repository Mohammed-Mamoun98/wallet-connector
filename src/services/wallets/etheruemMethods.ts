import { RpcTransactionRequest } from "viem";

type IEtheruemMethod = {
  method: string;
};

export const etheruemMethods: Record<string, IEtheruemMethod> = {
  REQUEST_ACCOUNTS: {
    method: "eth_requestAccounts",
  },
  REQUEST_CHAIN_ID: {
    method: "eth_chainId",
  },
};
