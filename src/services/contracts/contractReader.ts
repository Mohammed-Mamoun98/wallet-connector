import Web3 from "web3";
import { wait } from "../../utils/web3";
import { getValueByMultiProps } from "../../utils/mapper";
import { CHAINS, IChains } from "../../constants/networks";

const config = {
  networkType: "mainnet",
};
interface IAbiObject {
  internalType: string;
  name: string;
  type: string;
}

interface IAbi {
  inputs: IAbiObject[];
  name: string;
  outputs: IAbiObject[];
}
interface IContract {
  abi: IAbi[];
  networks: Record<number, any>;
}
interface IContractReaderParams {
  contractName: string;
  functionName: string;
  params: any[];
  contractAbis: any[];
  contractAddress: string; // could be passed in cases like HPool contract
  sendParams: Record<string, any>; // like from and value that are passed to send function
  chainId: number; // you only have to pass chain id in (pool list page) like cases when there is multible pools from different networks
  rpc: string; // you only have to pass chain id in (pool list page) like cases when there is multible pools from different networks
  callParams: any[]; // you only have to pass chain id in (pool list page) like cases when there is multible pools from different networks
  // otherwise will enforce user to switch
  onTxSending: () => void;
  onUserConfirmTx: (hash: string) => void;
  onTxConfirmed: () => void;
  finallyExecution: () => void;
}

const configJson = {
  apiPath: "",
  networks: [],
};

export const fetchContracts = async () =>
  fetch(`${configJson.apiPath}/config/contracts`).then((res) => res.json());

const loadContracts = async (): Promise<Record<string, IContract>> => {
  if (!(window as any).contracts) {
    await wait(250);
    return loadContracts();
  }
  return (window as any).contracts;
};

export const findInContracts = async (contractName: string) => {
  if (!contractName) throw new Error("no passed contract name");
  const _contracts: Record<string, IContract> = (await loadContracts()) || {};
  const lowerCasedName = contractName?.toLocaleLowerCase?.();
  return _contracts?.[lowerCasedName];
};

export const createContract = async (name: string, address: string) => {
  await loadContracts();
  const contract = (window as any).contracts?.[name] ?? {};
  if (!Object.values(contract).length)
    throw new Error(`Invalid Contract name ${name}`);
  const web3Instance = (window as any)._web3;
  return new web3Instance.eth.Contract(contract.abi, address);
};

export const contractReader = async ({
  contractName,
  functionName = "",
  params = [],
  contractAbis = [],
  contractAddress: passedContractAddress, // could be passed in cases like HPool contract
  sendParams, // like from and value that are passed to send function
  chainId, // you only have to pass chain id in (pool list page) like cases when there is multible pools from different networks,
  rpc: passedRpc, // you only have to pass chain id in (pool list page) like cases when there is multible pools from different networks,
  callParams = [], // you only have to pass chain id in (pool list page) like cases when there is multible pools from different networks,
  // otherwise will enforce user to switch
  onTxSending = () => null,
  onUserConfirmTx = (hash = "") => null,
  onTxConfirmed = () => null,
  finallyExecution = () => null,
}: IContractReaderParams) =>
  new Promise(async (resolve, reject) => {
    await loadContracts();

    const contractObj = await findInContracts(contractName);
    if (!contractObj) return;
    const { abi = [], networks = {} } = contractObj ?? {};
    if (!Array.isArray(abi) || !abi) return;
    if (!abi.length) reject("No contract found");
    const rpcUrl = passedRpc;

    const web3Instance = new Web3(rpcUrl);
    const targetAddress =
      passedContractAddress ||
      getValueByMultiProps(networks[chainId], ["Proxy", "address"]);
    const contractInstance = new web3Instance.eth.Contract(
      abi as any,
      targetAddress
    ); // any new web3 instance would work for reads

    try {
      if (!sendParams) {
        const result = await contractInstance.methods?.[functionName]?.(
          ...params
        ).call(...callParams);
        resolve(result);
      } else {
        const contractInstance = new (window as any)._web3.eth.Contract(
          abi,
          targetAddress
        ); // _web3 version for writes
        contractInstance.methods?.[functionName]?.(...params)
          .send({ ...sendParams })
          .once("sending", () => onTxSending()) // right after tx modal popsup (user did not confirm yet) - metamaks open
          .once("transactionHash", (hash: string) => onUserConfirmTx(hash)) // after user confirm the tx - when user click confirmation in metamask
          .once("confirmation", () => onTxConfirmed()) // right after tx is completed - done in metamask
          .once("receipt", (rec: any) => resolve(rec))
          .on("error", async (err: any) => {
            // let errorMsg = await tenderlyGetTxError(err);
            // if (errorMsg) reject({ message: errorMsg });
            reject(err);
          })
          .then(() => finallyExecution());
      }
    } catch (error: any) {
      reject(error.message);
      finallyExecution();
    }
  });

export type CHIAN = "ETH" | "BSC" | "ARB";
export const getChainByConfig = (chainName: CHIAN): number =>
  (CHAINS as any)?.[chainName]?.[config.networkType]; // based on the network type (testnet or mainnet it returns the desired chain id)

// Example
// use contractReader for write operation such as staking
export const userDepositEth = async (
  account: string,
  ethAmt: number,
  onTxSending: () => void,
  onUserConfirmTx: () => void,
  onTxConfirmed: () => void
) => {
  const userDepositETH = ethAmt;
  const _web3 = (window as any)._web3;

  const latestBlockInfo = (await _web3.eth.getBlock("pending")) ?? {};

  const latestBaseGasFee = latestBlockInfo.baseFeePerGas;
  const maxPriorityFeePerGas = _web3.utils.toWei("1", "gwei");

  const maxFeePerGas = +latestBaseGasFee + +maxPriorityFeePerGas;

  return contractReader({
    contractName: "HordETHStakingManager",
    functionName: "userDepositETH",
    sendParams: {
      from: account,
      value: userDepositETH,
      maxFeePerGas,
      maxPriorityFeePerGas,
    },
    params: [],
    onTxSending,
    onUserConfirmTx,
    onTxConfirmed,
  } as any);
};

export const fromEthToHeth = async (amount: number) => {
  let result = await contractReader({
    contractName: "HordETHStakingManager",
    functionName: "getAmountOfHETHforETH",
    params: [amount, false, 0],
    chainId: getChainByConfig("ETH"), // handle testnet and mainnet network id (goerli on testnet and Ethereum on mainnet)
  } as any);

  return result;
};
