import { CHIAN } from "../services/contracts/contractReader";
import { Chain as ViemChain } from "viem";

export interface INetwork {
  id: string | number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 4 | 9 | 11 | 18 | number;
  };
  rpcUrls: Array<string>;
  blockExplorerUrls: Array<string>;
  scanName?: string;
  iconUrl?: string;
}
export interface INetworkWithIcon extends INetwork {
  icon?: JSX.Element;
}

export interface Chain {
  id: string | number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 4 | 9 | 11 | 18 | number;
  };
  rpcUrls: { http: { default: string[] } };
  blockExplorerUrls: Array<string>;
  scanName?: string;
}

export interface INetworks {
  [Network: string]: INetwork;
}
export interface IChainInfo {
  mainnet: number;
  testnet: number;
  id?: number;
  themeColor: string;
  iconUrl: string;
  name: string;
  symbol: string;
}

export interface ISupportedNetworks {
  [BlockchainType: string]: INetworks;
}

export type IChains = Record<string, IChainInfo>;

export const CHAINS: IChains = {
  ETH: {
    mainnet: 1, // eth mainnet
    testnet: 5, // eth goerli testnet
    themeColor: "#454A75",
    name: "Ethereum",
    symbol: "ETH",
    iconUrl: "https://hpool-nfts-production.s3.amazonaws.com/Ethereum_32.svg",
  },
  BNB: {
    mainnet: 56, // bsc mainnet
    testnet: 97, // bsc testnet
    name: "Binance",
    symbol: "BSC",
    themeColor: "#AE882C",
    iconUrl:
      "https://hpool-nfts-develop.s3.amazonaws.com/champion/367/e7c7b2a965411bfe0fecc5964f668699-1672932298",
  },
  ARB: {
    mainnet: 42161, // bsc mainnet // TODO: get the chain id from networks.json
    testnet: 421613, // bsc testnet
    name: "Arbitrum",
    symbol: "ARB",
    themeColor: "#AE882C",
    iconUrl: "https://hord-prod-users.s3.amazonaws.com/arbitrum_18_18.png",
  },
};

export const mapToFitViem = (network: INetwork | null): ViemChain  => {
  if(!network) throw new Error("Unsupported Network")
  return {
    ...network,
    id: +network?.id,
    name: network?.chainName,
    rpcUrls: {
      default: {
        http: [...network?.rpcUrls],
      },
    },
  };
};

const addIconUrl = (chain: INetwork): INetworkWithIcon => {
  const chainIconUrl = CHAINS?.[chain.nativeCurrency.symbol]?.iconUrl;
  console.log({ __: chain, chainIconUrl, aa: chain.nativeCurrency.symbol });
  return { ...chain, iconUrl: chainIconUrl };
};

export const getChainInfo = (chainId: number): INetwork =>
  ethereumNetworks[+chainId];

export const getViemChain = (chainId: number) =>
  mapToFitViem(ethereumNetworks[+chainId]);

export const ethereumNetworks: INetworks = {
  1: {
    id: "0x1",
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [
      "https://eth.llamarpc.com",
      `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_API_KEY}`,
      "https://api.mycryptoapi.com/eth",
      "https://cloudflare-eth.com",
    ],
    blockExplorerUrls: ["https://etherscan.io"],
    iconUrl:
      "https://cryptologos.cc/logos/versions/ethereum-eth-logo-diamond-purple.svg?v=029",
  },
  2: {
    id: "0x2",
    chainName: "Expanse Network",
    nativeCurrency: {
      name: "Expanse Network Ether",
      symbol: "EXP",
      decimals: 18,
    },
    rpcUrls: ["https://node.expanse.tech"],
    blockExplorerUrls: [],
    iconUrl:
      "https://cryptologos.cc/logos/versions/ethereum-eth-logo-diamond-purple.svg?v=029",
  },
  3: {
    id: "0x3",
    chainName: "Ethereum Testnet Ropsten",
    nativeCurrency: {
      name: "Ropsten Ether",
      symbol: "ROP",
      decimals: 18,
    },
    rpcUrls: [
      `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      `wss://ropsten.infura.io/ws/v3/${process.env.INFURA_API_KEY}`,
    ],
    iconUrl:
      "https://cryptologos.cc/logos/versions/ethereum-eth-logo-diamond-purple.svg?v=029",
    blockExplorerUrls: ["https://ropsten.etherscan.io"],
  },
  4: {
    id: "0x4",
    chainName: "Ethereum Testnet Rinkeby",
    nativeCurrency: {
      name: "Rinkeby Ether",
      symbol: "RIN",
      decimals: 18,
    },
    rpcUrls: [
      `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      `wss://rinkeby.infura.io/ws/v3/${process.env.INFURA_API_KEY}`,
    ],
    blockExplorerUrls: ["https://rinkeby.etherscan.io"],
    iconUrl:
      "https://cryptologos.cc/logos/versions/ethereum-eth-logo-diamond-purple.svg?v=029",
  },
  5: {
    id: "0x5",
    chainName: "Ethereum Testnet Görli",
    nativeCurrency: {
      name: "Görli Ether",
      symbol: "GOR",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc.goerli.mudit.blog/",
      "https://rpc.slock.it/goerli ",
      "https://goerli.prylabs.net/",
    ],
    blockExplorerUrls: ["https://goerli.etherscan.io/"],
    iconUrl:
      "https://cryptologos.cc/logos/versions/ethereum-eth-logo-diamond-purple.svg?v=029",
  },
  6: {
    id: "0x6",
    chainName: "Ethereum Classic Testnet Kotti",
    nativeCurrency: {
      name: "Kotti Ether",
      symbol: "KOT",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  7: {
    id: "0x7",
    chainName: "ThaiChain",
    nativeCurrency: {
      name: "ThaiChain Ether",
      symbol: "TCH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.dome.cloud"],
    blockExplorerUrls: [],
  },
  8: {
    id: "0x8",
    chainName: "Ubiq",
    nativeCurrency: {
      name: "Ubiq Ether",
      symbol: "UBQ",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.octano.dev", "https://pyrus2.ubiqscan.io"],
    blockExplorerUrls: ["https://ubiqscan.io"],
  },
  9: {
    id: "0x9",
    chainName: "Ubiq Network Testnet",
    nativeCurrency: {
      name: "Ubiq Testnet Ether",
      symbol: "TUBQ",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  10: {
    id: "0xa",
    chainName: "Optimism",
    nativeCurrency: {
      name: "Ether",
      symbol: "OETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.optimism.io/"],
    blockExplorerUrls: ["https://optimistic.etherscan.io"],
    iconUrl: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=029",
  },
  11: {
    id: "0xb",
    chainName: "Metadium Mainnet",
    nativeCurrency: {
      name: "Metadium Mainnet Ether",
      symbol: "META",
      decimals: 18,
    },
    rpcUrls: ["https://api.metadium.com/prod"],
    blockExplorerUrls: [],
  },
  12: {
    id: "0xc",
    chainName: "Metadium Testnet",
    nativeCurrency: {
      name: "Metadium Testnet Ether",
      symbol: "KAL",
      decimals: 18,
    },
    rpcUrls: ["https://api.metadium.com/dev"],
    blockExplorerUrls: [],
  },
  13: {
    id: "0xd",
    chainName: "Diode Testnet Staging",
    nativeCurrency: {
      name: "Staging Diodes",
      symbol: "sDIODE",
      decimals: 18,
    },
    rpcUrls: [
      "https://staging.diode.io:8443/",
      "wss://staging.diode.io:8443/ws",
    ],
    blockExplorerUrls: [],
  },
  14: {
    id: "0xe",
    chainName: "Flare Mainnet",
    nativeCurrency: {
      name: "Spark",
      symbol: "FLR",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  15: {
    id: "0xf",
    chainName: "Diode Prenet",
    nativeCurrency: {
      name: "Diodes",
      symbol: "DIODE",
      decimals: 18,
    },
    rpcUrls: ["https://prenet.diode.io:8443/", "wss://prenet.diode.io:8443/ws"],
    blockExplorerUrls: [],
  },
  16: {
    id: "0x10",
    chainName: "Flare Testnet Coston",
    nativeCurrency: {
      name: "Coston Spark",
      symbol: "CFLR",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  17: {
    id: "0x11",
    chainName: "ThaiChain 2.0 ThaiFi",
    nativeCurrency: {
      name: "Thaifi Ether",
      symbol: "TFI",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.thaifi.com"],
    blockExplorerUrls: [],
  },
  18: {
    id: "0x12",
    chainName: "ThunderCore Testnet",
    nativeCurrency: {
      name: "ThunderCore Testnet Ether",
      symbol: "TST",
      decimals: 18,
    },
    rpcUrls: ["https://testnet-rpc.thundercore.com"],
    blockExplorerUrls: [],
  },
  19: {
    id: "0x13",
    chainName: "Songbird Canary-Network",
    nativeCurrency: {
      name: "Songbird",
      symbol: "SGB",
      decimals: 18,
    },
    rpcUrls: ["https://songbird.towolabs.com/rpc"],
    blockExplorerUrls: ["https://songbird-explorer.flare.network"],
  },
  20: {
    id: "0x14",
    chainName: "ELA-ETH-Sidechain Mainnet",
    nativeCurrency: {
      name: "Elastos",
      symbol: "ELA",
      decimals: 18,
    },
    rpcUrls: ["https://mainrpc.elaeth.io"],
    blockExplorerUrls: [],
  },
  21: {
    id: "0x15",
    chainName: "ELA-ETH-Sidechain Testnet",
    nativeCurrency: {
      name: "Elastos",
      symbol: "tELA",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.elaeth.io"],
    blockExplorerUrls: [],
  },
  22: {
    id: "0x16",
    chainName: "ELA-DID-Sidechain Mainnet",
    nativeCurrency: {
      name: "Elastos",
      symbol: "ELA",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  23: {
    id: "0x17",
    chainName: "ELA-DID-Sidechain Testnet",
    nativeCurrency: {
      name: "Elastos",
      symbol: "tELA",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  30: {
    id: "0x1e",
    chainName: "RSK Mainnet",
    nativeCurrency: {
      name: "RSK Mainnet Ether",
      symbol: "RBTC",
      decimals: 18,
    },
    rpcUrls: ["https://public-node.rsk.co", "https://mycrypto.rsk.co"],
    blockExplorerUrls: ["https://explorer.rsk.co"],
  },
  31: {
    id: "0x1f",
    chainName: "RSK Testnet",
    nativeCurrency: {
      name: "RSK Testnet Ether",
      symbol: "tRBTC",
      decimals: 18,
    },
    rpcUrls: [
      "https://public-node.testnet.rsk.co",
      "https://mycrypto.testnet.rsk.co",
    ],
    blockExplorerUrls: [],
  },
  32: {
    id: "0x20",
    chainName: "GoodData Testnet",
    nativeCurrency: {
      name: "GoodData Testnet Ether",
      symbol: "GooD",
      decimals: 18,
    },
    rpcUrls: ["https://test2.goodata.io"],
    blockExplorerUrls: [],
  },
  33: {
    id: "0x21",
    chainName: "GoodData Mainnet",
    nativeCurrency: {
      name: "GoodData Mainnet Ether",
      symbol: "GooD",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.goodata.io"],
    blockExplorerUrls: [],
  },
  35: {
    id: "0x23",
    chainName: "TBWG Chain",
    nativeCurrency: {
      name: "TBWG Ether",
      symbol: "TBG",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.tbwg.io"],
    blockExplorerUrls: [],
  },
  38: {
    id: "0x26",
    chainName: "Valorbit",
    nativeCurrency: {
      name: "Valorbit",
      symbol: "VAL",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.valorbit.com/v2"],
    blockExplorerUrls: [],
  },
  40: {
    id: "0x28",
    chainName: "Telos",
    nativeCurrency: {
      name: "Telos",
      symbol: "TLOS",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.telos.net/evm"],
    blockExplorerUrls: ["https://www.teloscan.io"],
  },
  41: {
    id: "0x29",
    chainName: "Telos",
    nativeCurrency: {
      name: "Telos",
      symbol: "TLOS",
      decimals: 18,
    },
    rpcUrls: ["https://testnet.telos.net/evm"],
    blockExplorerUrls: ["https://testnet.teloscan.io/"],
  },
  42: {
    id: "0x2a",
    chainName: "Ethereum Testnet Kovan",
    nativeCurrency: {
      name: "Kovan Ether",
      symbol: "KOV",
      decimals: 18,
    },
    rpcUrls: [
      "https://kovan.poa.network",
      "http://kovan.poa.network:8545",
      `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      `wss://kovan.infura.io/ws/v3/${process.env.INFURA_API_KEY}`,
      "ws://kovan.poa.network:8546",
    ],
    blockExplorerUrls: [],
  },
  43: {
    id: "0x2b",
    chainName: "Darwinia Pangolin Testnet",
    nativeCurrency: {
      name: "Pangolin RING",
      symbol: "PRING",
      decimals: 9,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  44: {
    id: "0x2c",
    chainName: "Darwinia Crab Network",
    nativeCurrency: {
      name: "Crab Token",
      symbol: "CRING",
      decimals: 9,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  50: {
    id: "0x32",
    chainName: "XinFin Network Mainnet",
    nativeCurrency: {
      name: "XinFin",
      symbol: "XDC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.xinfin.network"],
    blockExplorerUrls: [],
  },
  51: {
    id: "0x33",
    chainName: "XinFin Apothem Testnet",
    nativeCurrency: {
      name: "XinFinTest",
      symbol: "TXDC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.apothem.network"],
    blockExplorerUrls: [],
  },
  52: {
    id: "0x34",
    chainName: "CoinEx Smart Chain Mainnet",
    nativeCurrency: {
      name: "CoinEx Chain Native Token",
      symbol: "cet",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mainnet.coinex.net"],
    blockExplorerUrls: [],
  },
  53: {
    id: "0x35",
    chainName: "CoinEx Smart Chain Testnet",
    nativeCurrency: {
      name: "CoinEx Chain Test Native Token",
      symbol: "cett",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-testnet.coinex.net"],
    blockExplorerUrls: [],
  },
  56: {
    id: "0x38",
    chainName: "BNB Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: [
      "https://bsc-dataseed.binance.org",
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "wss://bsc-ws-node.nariox.org",
    ],
    blockExplorerUrls: ["https://bscscan.com"],
    iconUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=001",
  },
  58: {
    id: "0x3a",
    chainName: "Ontology Mainnet",
    nativeCurrency: {
      name: "ONG",
      symbol: "ONG",
      decimals: 9,
    },
    rpcUrls: [
      "https://dappnode1.ont.io:20339",
      "https://dappnode2.ont.io:20339",
      "https://dappnode3.ont.io:20339",
      "https://dappnode4.ont.io:20339",
    ],
    blockExplorerUrls: ["https://explorer.ont.io/"],
  },
  59: {
    id: "0x3b",
    chainName: "EOS Mainnet",
    nativeCurrency: {
      name: "EOS",
      symbol: "EOS",
      decimals: 18,
    },
    rpcUrls: ["https://api.eosargentina.io"],
    blockExplorerUrls: ["https://bloks.eosargentina.io"],
  },
  60: {
    id: "0x3c",
    chainName: "GoChain",
    nativeCurrency: {
      name: "GoChain Ether",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.gochain.io"],
    blockExplorerUrls: ["https://explorer.gochain.io"],
  },
  61: {
    id: "0x3d",
    chainName: "Ethereum Classic Mainnet",
    nativeCurrency: {
      name: "Ethereum Classic Ether",
      symbol: "ETC",
      decimals: 18,
    },
    rpcUrls: ["https://ethereumclassic.network"],
    blockExplorerUrls: ["https://blockscout.com/etc/mainnet"],
  },
  62: {
    id: "0x3e",
    chainName: "Ethereum Classic Testnet Morden",
    nativeCurrency: {
      name: "Ethereum Classic Testnet Ether",
      symbol: "TETC",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  63: {
    id: "0x3f",
    chainName: "Ethereum Classic Testnet Mordor",
    nativeCurrency: {
      name: "Mordor Classic Testnet Ether",
      symbol: "METC",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  64: {
    id: "0x40",
    chainName: "Ellaism",
    nativeCurrency: {
      name: "Ellaism Ether",
      symbol: "ELLA",
      decimals: 18,
    },
    rpcUrls: ["https://jsonrpc.ellaism.org"],
    blockExplorerUrls: [],
  },
  65: {
    id: "0x41",
    chainName: "OKExChain Testnet",
    nativeCurrency: {
      name: "OKExChain Global Utility Token in testnet",
      symbol: "OKT",
      decimals: 18,
    },
    rpcUrls: ["https://exchaintestrpc.okex.org"],
    blockExplorerUrls: ["https://www.oklink.com/okexchain-test"],
  },
  66: {
    id: "0x42",
    chainName: "OKExChain Mainnet",
    nativeCurrency: {
      name: "OKExChain Global Utility Token",
      symbol: "OKT",
      decimals: 18,
    },
    rpcUrls: ["https://exchainrpc.okex.org"],
    blockExplorerUrls: ["https://www.oklink.com/okexchain"],
  },
  67: {
    id: "0x43",
    chainName: "DBChain Testnet",
    nativeCurrency: {
      name: "DBChain Testnet",
      symbol: "DBM",
      decimals: 18,
    },
    rpcUrls: ["http://test-rpc.dbmbp.com"],
    blockExplorerUrls: [],
  },
  68: {
    id: "0x44",
    chainName: "SoterOne Mainnet",
    nativeCurrency: {
      name: "SoterOne Mainnet Ether",
      symbol: "SOTER",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.soter.one"],
    blockExplorerUrls: [],
  },
  69: {
    id: "0x45",
    chainName: "Optimism",
    nativeCurrency: {
      name: "Kovan Ether",
      symbol: "KOR",
      decimals: 18,
    },
    rpcUrls: ["https://kovan.optimism.io/"],
    blockExplorerUrls: [],
  },
  71: {
    id: "0x47",
    chainName: "Conflux eSpace Testnet",
    nativeCurrency: {
      name: "CFX",
      symbol: "CFX",
      decimals: 18,
    },
    rpcUrls: ["https://evmtestnet.confluxrpc.com"],
    blockExplorerUrls: ["https://evmtestnet.confluxscan.net"],
  },
  76: {
    id: "0x4c",
    chainName: "Mix",
    nativeCurrency: {
      name: "Mix Ether",
      symbol: "MIX",
      decimals: 18,
    },
    rpcUrls: ["https://rpc2.mix-blockchain.org:8647"],
    blockExplorerUrls: [],
  },
  77: {
    id: "0x4d",
    chainName: "POA Network Sokol",
    nativeCurrency: {
      name: "POA Sokol Ether",
      symbol: "POA",
      decimals: 18,
    },
    rpcUrls: [
      "https://sokol.poa.network",
      "wss://sokol.poa.network/wss",
      "ws://sokol.poa.network:8546",
    ],
    blockExplorerUrls: ["https://blockscout.com/poa/sokol"],
  },
  78: {
    id: "0x4e",
    chainName: "PrimusChain Mainnet",
    nativeCurrency: {
      name: "Primus Ether",
      symbol: "PETH",
      decimals: 18,
    },
    rpcUrls: ["https://ethnode.primusmoney.com/mainnet"],
    blockExplorerUrls: [],
  },
  80: {
    id: "0x50",
    chainName: "GeneChain",
    nativeCurrency: {
      name: "RNA",
      symbol: "RNA",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.genechain.io"],
    blockExplorerUrls: ["https://scan.genechain.io"],
  },
  82: {
    id: "0x52",
    chainName: "Meter Mainnet",
    nativeCurrency: {
      name: "Meter",
      symbol: "MTR",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.meter.io"],
    blockExplorerUrls: [],
  },
  85: {
    id: "0x55",
    chainName: "GateChain Testnet",
    nativeCurrency: {
      name: "GateToken",
      symbol: "GT",
      decimals: 18,
    },
    rpcUrls: ["https://testnet.gatenode.cc"],
    blockExplorerUrls: ["https://www.gatescan.org/testnet"],
  },
  86: {
    id: "0x56",
    chainName: "GateChain Mainnet",
    nativeCurrency: {
      name: "GateToken",
      symbol: "GT",
      decimals: 18,
    },
    rpcUrls: ["https://evm.gatenode.cc"],
    blockExplorerUrls: ["https://www.gatescan.org"],
  },
  88: {
    id: "0x58",
    chainName: "TomoChain",
    nativeCurrency: {
      name: "TomoChain Ether",
      symbol: "TOMO",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.tomochain.com"],
    blockExplorerUrls: [],
  },
  95: {
    id: "0x5f",
    chainName: "CryptoKylin Testnet",
    nativeCurrency: {
      name: "EOS",
      symbol: "EOS",
      decimals: 18,
    },
    rpcUrls: ["https://kylin.eosargentina.io"],
    blockExplorerUrls: ["https://kylin.eosargentina.io"],
  },
  97: {
    id: "0x61",
    chainName: "BNB Chain Testnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "tBNB",
      decimals: 18,
    },
    rpcUrls: [
      "https://data-seed-prebsc-1-s1.binance.org:8545",
      "https://data-seed-prebsc-2-s1.binance.org:8545",
      "https://data-seed-prebsc-1-s2.binance.org:8545",
      "https://data-seed-prebsc-2-s2.binance.org:8545",
      "https://data-seed-prebsc-1-s3.binance.org:8545",
      "https://data-seed-prebsc-2-s3.binance.org:8545",
    ],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
    iconUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=001",
  },
  99: {
    id: "0x63",
    chainName: "POA Network Core",
    nativeCurrency: {
      name: "POA Network Core Ether",
      symbol: "SKL",
      decimals: 18,
    },
    rpcUrls: [
      "https://core.poanetwork.dev",
      "http://core.poanetwork.dev:8545",
      "https://core.poa.network",
      "ws://core.poanetwork.dev:8546",
    ],
    blockExplorerUrls: ["https://blockscout.com/poa/core"],
  },
  100: {
    id: "0x64",
    chainName: "xDAI Chain",
    nativeCurrency: {
      name: "xDAI",
      symbol: "xDAI",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc.xdaichain.com",
      "https://xdai.poanetwork.dev",
      "wss://rpc.xdaichain.com/wss",
      "wss://xdai.poanetwork.dev/wss",
      "http://xdai.poanetwork.dev",
      "https://dai.poa.network",
      "ws://xdai.poanetwork.dev:8546",
    ],
    blockExplorerUrls: ["https://blockscout.com/poa/xdai"],
  },
  101: {
    id: "0x65",
    chainName: "EtherInc",
    nativeCurrency: {
      name: "EtherInc Ether",
      symbol: "ETI",
      decimals: 18,
    },
    rpcUrls: ["https://api.einc.io/jsonrpc/mainnet"],
    blockExplorerUrls: [],
  },
  102: {
    id: "0x66",
    chainName: "Web3Games Testnet",
    nativeCurrency: {
      name: "Web3Games",
      symbol: "W3G",
      decimals: 18,
    },
    rpcUrls: ["https://substrate.org.cn"],
    blockExplorerUrls: [],
  },
  108: {
    id: "0x6c",
    chainName: "ThunderCore Mainnet",
    nativeCurrency: {
      name: "ThunderCore Mainnet Ether",
      symbol: "TT",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet-rpc.thundercore.com"],
    blockExplorerUrls: [],
  },
  110: {
    id: "0x6e",
    chainName: "Proton Testnet",
    nativeCurrency: {
      name: "Proton",
      symbol: "XPR",
      decimals: 4,
    },
    rpcUrls: ["https://protontestnet.greymass.com/"],
    blockExplorerUrls: [],
  },
  111: {
    id: "0x6f",
    chainName: "EtherLite Chain",
    nativeCurrency: {
      name: "EtherLite",
      symbol: "ETL",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.etherlite.org"],
    blockExplorerUrls: [],
  },
  122: {
    id: "0x7a",
    chainName: "Fuse Mainnet",
    nativeCurrency: {
      name: "Fuse",
      symbol: "FUSE",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.fuse.io"],
    blockExplorerUrls: ["https://explorer.fuse.io/"],
  },
  123: {
    id: "0x7b",
    chainName: "Fuse Testnet",
    nativeCurrency: {
      name: "Fuse",
      symbol: "FUSE",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.fusespark.io/"],
    blockExplorerUrls: ["https://explorer.fusespark.io/"],
  },
  124: {
    id: "0x7c",
    chainName: "Decentralized Web Mainnet",
    nativeCurrency: {
      name: "Decentralized Web Utility",
      symbol: "DWU",
      decimals: 18,
    },
    rpcUrls: ["https://decentralized-web.tech/dw_rpc.php"],
    blockExplorerUrls: [],
  },
  127: {
    id: "0x7f",
    chainName: "Factory 127 Mainnet",
    nativeCurrency: {
      name: "Factory 127 Token",
      symbol: "FETH",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  128: {
    id: "0x80",
    chainName: "Huobi ECO Chain Mainnet",
    nativeCurrency: {
      name: "Huobi ECO Chain Native Token",
      symbol: "HT",
      decimals: 18,
    },
    rpcUrls: [
      "https://http-mainnet.hecochain.com",
      "wss://ws-mainnet.hecochain.com",
    ],
    blockExplorerUrls: ["https://hecoinfo.com"],
  },
  1030: {
    id: "0x406",
    chainName: "Conflux eSpace",
    nativeCurrency: {
      name: "CFX",
      symbol: "CFX",
      decimals: 18,
    },
    rpcUrls: ["https://evm.confluxrpc.com"],
    blockExplorerUrls: [" https://evm.confluxscan.net"],
  },

  137: {
    id: "0x89",
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [
      "https://polygon-rpc.com",
      "https://polygon.llamarpc.com",
      "https://rpc-mainnet.matic.network",
      "wss://ws-mainnet.matic.network",
      "https://rpc-mainnet.matic.quiknode.pro",
      "https://matic-mainnet.chainstacklabs.com",
    ],
    blockExplorerUrls: ["https://polygonscan.com"],
    iconUrl: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029",
  },
  142: {
    id: "0x8e",
    chainName: "DAX CHAIN",
    nativeCurrency: {
      name: "Prodax",
      symbol: "DAX",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.prodax.io"],
    blockExplorerUrls: [],
  },
  162: {
    id: "0xa2",
    chainName: "Lightstreams Testnet",
    nativeCurrency: {
      name: "Lightstreams PHT",
      symbol: "PHT",
      decimals: 18,
    },
    rpcUrls: ["https://node.sirius.lightstreams.io"],
    blockExplorerUrls: [],
  },
  163: {
    id: "0xa3",
    chainName: "Lightstreams Mainnet",
    nativeCurrency: {
      name: "Lightstreams PHT",
      symbol: "PHT",
      decimals: 18,
    },
    rpcUrls: ["https://node.mainnet.lightstreams.io"],
    blockExplorerUrls: [],
  },
  170: {
    id: "0xaa",
    chainName: "HOO Smart Chain Testnet",
    nativeCurrency: {
      name: "HOO",
      symbol: "HOO",
      decimals: 18,
    },
    rpcUrls: ["https://http-testnet.hoosmartchain.com"],
    blockExplorerUrls: [],
  },
  172: {
    id: "0xac",
    chainName: "Latam-Blockchain Resil Testnet",
    nativeCurrency: {
      name: "Latam-Blockchain Resil Test Native Token",
      symbol: "usd",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc.latam-blockchain.com",
      "wss://ws.latam-blockchain.com",
    ],
    blockExplorerUrls: [],
  },
  200: {
    id: "0xc8",
    chainName: "Arbitrum on xDai",
    nativeCurrency: {
      name: "xDAI",
      symbol: "xDAI",
      decimals: 18,
    },
    rpcUrls: ["https://arbitrum.xdaichain.com/"],
    blockExplorerUrls: ["https://blockscout.com/xdai/arbitrum"],
    iconUrl: "https://hord-prod-users.s3.amazonaws.com/arbitrum_18_18.png",
  },
  211: {
    id: "0xd3",
    chainName: "Freight Trust Network",
    nativeCurrency: {
      name: "Freight Trust Native",
      symbol: "0xF",
      decimals: 18,
    },
    rpcUrls: [
      "http://13.57.207.168:3435",
      `https://app.freighttrust.net/ftn/${process.env.FREIGHT_API_KEY}`,
    ],
    blockExplorerUrls: [],
  },
  246: {
    id: "0xf6",
    chainName: "Energy Web Chain",
    nativeCurrency: {
      name: "Energy Web Token",
      symbol: "EWT",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.energyweb.org", "wss://rpc.energyweb.org/ws"],
    blockExplorerUrls: ["https://explorer.energyweb.org"],
  },
  250: {
    id: "0xfa",
    chainName: "Fantom",
    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ftm.tools"],
    blockExplorerUrls: ["https://ftmscan.com"],
    iconUrl: "https://cryptologos.cc/logos/fantom-ftm-logo.png?v=029",
  },
  256: {
    id: "0x100",
    chainName: "Huobi ECO Chain Testnet",
    nativeCurrency: {
      name: "Huobi ECO Chain Test Native Token",
      symbol: "htt",
      decimals: 18,
    },
    rpcUrls: [
      "https://http-testnet.hecochain.com",
      "wss://ws-testnet.hecochain.com",
    ],
    blockExplorerUrls: [],
  },
  262: {
    id: "0x106",
    chainName: "SUR Blockchain Network",
    nativeCurrency: {
      name: "Suren",
      symbol: "SRN",
      decimals: 18,
    },
    rpcUrls: ["https://sur.nilin.org"],
    blockExplorerUrls: ["https://explorer.surnet.org/"],
  },
  269: {
    id: "0x10d",
    chainName: "High Performance Blockchain",
    nativeCurrency: {
      name: "High Performance Blockchain Ether",
      symbol: "HPB",
      decimals: 18,
    },
    rpcUrls: ["https://hpbnode.com", "wss://ws.hpbnode.com"],
    blockExplorerUrls: ["https://hpbscan.org/"],
  },
  321: {
    id: "0x141",
    chainName: "KCC Mainnet",
    nativeCurrency: {
      name: "KuCoin Token",
      symbol: "KCS",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc-mainnet.kcc.network",
      "wss://rpc-ws-mainnet.kcc.network",
    ],
    blockExplorerUrls: ["https://explorer.kcc.io/en"],
  },
  322: {
    id: "0x142",
    chainName: "KCC Testnet",
    nativeCurrency: {
      name: "KuCoin Testnet Token",
      symbol: "tKCS",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc-testnet.kcc.network",
      "wss://rpc-ws-testnet.kcc.network",
    ],
    blockExplorerUrls: ["https://scan-testnet.kcc.network"],
  },
  336: {
    id: "0x150",
    chainName: "Shiden",
    nativeCurrency: {
      name: "Shiden",
      symbol: "SDN",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc.shiden.astar.network:8545",
      "wss://shiden.api.onfinality.io/public-ws",
    ],
    blockExplorerUrls: ["https://shiden.subscan.io"],
  },
  361: {
    id: "0x169",
    chainName: "Theta Mainnet",
    nativeCurrency: {
      name: "Theta Fuel",
      symbol: "TFUEL",
      decimals: 18,
    },
    rpcUrls: ["https://eth-rpc-api.thetatoken.org/rpc"],
    blockExplorerUrls: ["https://explorer.thetatoken.org"],
  },
  363: {
    id: "0x16b",
    chainName: "Theta Sapphire Testnet",
    nativeCurrency: {
      name: "Theta Fuel",
      symbol: "TFUEL",
      decimals: 18,
    },
    rpcUrls: ["https://eth-rpc-api-sapphire.thetatoken.org/rpc"],
    blockExplorerUrls: [
      "https://guardian-testnet-sapphire-explorer.thetatoken.org",
    ],
  },
  364: {
    id: "0x16c",
    chainName: "Theta Amber Testnet",
    nativeCurrency: {
      name: "Theta Fuel",
      symbol: "TFUEL",
      decimals: 18,
    },
    rpcUrls: ["https://eth-rpc-api-amber.thetatoken.org/rpc"],
    blockExplorerUrls: [
      "https://guardian-testnet-amber-explorer.thetatoken.org",
    ],
  },
  365: {
    id: "0x16d",
    chainName: "Theta Testnet",
    nativeCurrency: {
      name: "Theta Fuel",
      symbol: "TFUEL",
      decimals: 18,
    },
    rpcUrls: ["https://eth-rpc-api-testnet.thetatoken.org/rpc"],
    blockExplorerUrls: ["https://testnet-explorer.thetatoken.org"],
  },
  369: {
    id: "0x171",
    chainName: "PulseChain Mainnet",
    nativeCurrency: {
      name: "Pulse",
      symbol: "PLS",
      decimals: 18,
    },
    rpcUrls: [
      `https://rpc.mainnet.pulsechain.com/v1/${process.env.PULSECHAIN_API_KEY}`,
      `wss://rpc.mainnet.pulsechain.com/ws/v1/${process.env.PULSECHAIN_API_KEY}`,
    ],
    blockExplorerUrls: [],
  },
  385: {
    id: "0x181",
    chainName: "Lisinski",
    nativeCurrency: {
      name: "Lisinski Ether",
      symbol: "LISINSKI",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-bitfalls1.lisinski.online"],
    blockExplorerUrls: [],
  },
  420: {
    id: "0x1a4",
    chainName: "Optimism",
    nativeCurrency: {
      name: "Görli Ether",
      symbol: "GOR",
      decimals: 18,
    },
    rpcUrls: ["https://goerli.optimism.io/"],
    blockExplorerUrls: ["https://goerli-optimism.etherscan.io/"],
    iconUrl: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg?v=029",
  },
  499: {
    id: "0x1f3",
    chainName: "Rupaya",
    nativeCurrency: {
      name: "Rupaya",
      symbol: "RUPX",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  558: {
    id: "0x22e",
    chainName: "Tao Network",
    nativeCurrency: {
      name: "Tao",
      symbol: "TAO",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc.testnet.tao.network",
      "http://rpc.testnet.tao.network:8545",
      "https://rpc.tao.network",
      "wss://rpc.tao.network",
    ],
    blockExplorerUrls: [],
  },
  568: {
    id: "0x238",
    chainName: "Dogechain Testnet",
    nativeCurrency: {
      name: "Dogecoin",
      symbol: "wDOGE",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-testnet.dogechain.dog"],
    blockExplorerUrls: ["https://explorer-testnet.dogechain.dog"],
  },
  595: {
    id: "0x253",
    chainName: "Acala Mandala Testnet",
    nativeCurrency: {
      name: "Acala Mandala Token",
      symbol: "mACA",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  686: {
    id: "0x2ae",
    chainName: "Karura Network",
    nativeCurrency: {
      name: "Karura Token",
      symbol: "KAR",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  721: {
    id: "0x2d1",
    chainName: "Factory 127 Testnet",
    nativeCurrency: {
      name: "Factory 127 Token",
      symbol: "FETH",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  777: {
    id: "0x309",
    chainName: "cheapETH",
    nativeCurrency: {
      name: "cTH",
      symbol: "cTH",
      decimals: 18,
    },
    rpcUrls: ["https://node.cheapeth.org/rpc"],
    blockExplorerUrls: [],
  },
  787: {
    id: "0x313",
    chainName: "Acala Network",
    nativeCurrency: {
      name: "Acala Token",
      symbol: "ACA",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  803: {
    id: "0x323",
    chainName: "Haic",
    nativeCurrency: {
      name: "Haicoin",
      symbol: "HAIC",
      decimals: 18,
    },
    rpcUrls: ["https://orig.haichain.io/"],
    blockExplorerUrls: [],
  },
  820: {
    id: "0x334",
    chainName: "Callisto Mainnet",
    nativeCurrency: {
      name: "Callisto Mainnet Ether",
      symbol: "CLO",
      decimals: 18,
    },
    rpcUrls: ["https://clo-geth.0xinfra.com"],
    blockExplorerUrls: [],
  },
  821: {
    id: "0x335",
    chainName: "Callisto Testnet",
    nativeCurrency: {
      name: "Callisto Testnet Ether",
      symbol: "TCLO",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  888: {
    id: "0x378",
    chainName: "Wanchain",
    nativeCurrency: {
      name: "Wancoin",
      symbol: "WAN",
      decimals: 18,
    },
    rpcUrls: ["https://gwan-ssl.wandevs.org:56891/"],
    blockExplorerUrls: [],
  },
  940: {
    id: "0x3ac",
    chainName: "PulseChain Testnet",
    nativeCurrency: {
      name: "Test Pulse",
      symbol: "tPLS",
      decimals: 18,
    },
    rpcUrls: [
      `https://rpc.testnet.pulsechain.com/v1/${process.env.PULSECHAIN_API_KEY}`,
      `wss://rpc.testnet.pulsechain.com/ws/v1/${process.env.PULSECHAIN_API_KEY}`,
    ],
    blockExplorerUrls: [],
  },
  977: {
    id: "0x3d1",
    chainName: "Nepal Blockchain Network",
    nativeCurrency: {
      name: "Nepal Blockchain Network Ether",
      symbol: "YETI",
      decimals: 18,
    },
    rpcUrls: [
      "https://api.nepalblockchain.dev",
      "https://api.nepalblockchain.network",
    ],
    blockExplorerUrls: [],
  },
  999: {
    id: "0x3e7",
    chainName: "Wanchain Testnet",
    nativeCurrency: {
      name: "Wancoin",
      symbol: "WAN",
      decimals: 18,
    },
    rpcUrls: ["https://gwan-ssl.wandevs.org:46891/"],
    blockExplorerUrls: [],
  },
  1001: {
    id: "0x3e9",
    chainName: "Klaytn Testnet Baobab",
    nativeCurrency: {
      name: "KLAY",
      symbol: "KLAY",
      decimals: 18,
    },
    rpcUrls: ["https://node-api.klaytnapi.com/v1/klaytn"],
    blockExplorerUrls: [],
  },
  1007: {
    id: "0x3ef",
    chainName: "Newton Testnet",
    nativeCurrency: {
      name: "Newton",
      symbol: "NEW",
      decimals: 18,
    },
    rpcUrls: ["https://rpc1.newchain.newtonproject.org"],
    blockExplorerUrls: [],
  },
  1010: {
    id: "0x3f2",
    chainName: "Evrice Network",
    nativeCurrency: {
      name: "Evrice",
      symbol: "EVC",
      decimals: 18,
    },
    rpcUrls: ["https://meta.evrice.com"],
    blockExplorerUrls: [],
  },
  1012: {
    id: "0x3f4",
    chainName: "Newton",
    nativeCurrency: {
      name: "Newton",
      symbol: "NEW",
      decimals: 18,
    },
    rpcUrls: ["https://global.rpc.mainnet.newtonproject.org"],
    blockExplorerUrls: [],
  },
  1022: {
    id: "0x3fe",
    chainName: "Sakura",
    nativeCurrency: {
      name: "Sakura",
      symbol: "SKU",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  1023: {
    id: "0x3ff",
    chainName: "Clover Testnet",
    nativeCurrency: {
      name: "Clover",
      symbol: "CLV",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  1024: {
    id: "0x400",
    chainName: "Clover Mainnet",
    nativeCurrency: {
      name: "Clover",
      symbol: "CLV",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc-ivy.clover.finance",
      "https://rpc-ivy-2.clover.finance",
      "https://rpc-ivy-3.clover.finance",
    ],
    blockExplorerUrls: [],
  },
  1139: {
    id: "0x473",
    chainName: "MathChain",
    nativeCurrency: {
      name: "MathChain",
      symbol: "MATH",
      decimals: 18,
    },
    rpcUrls: [
      "https://mathchain-asia.maiziqianbao.net/rpc",
      "https://mathchain-us.maiziqianbao.net/rpc",
    ],
    blockExplorerUrls: [],
  },
  1140: {
    id: "0x474",
    chainName: "MathChain Testnet",
    nativeCurrency: {
      name: "MathChain",
      symbol: "MATH",
      decimals: 18,
    },
    rpcUrls: ["https://galois-hk.maiziqianbao.net/rpc"],
    blockExplorerUrls: [],
  },
  1284: {
    id: "0x504",
    chainName: "Moonbeam",
    nativeCurrency: {
      name: "Glimmer",
      symbol: "GLMR",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  1285: {
    id: "0x505",
    chainName: "Moonriver",
    nativeCurrency: {
      name: "Moonriver",
      symbol: "MOVR",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc.moonriver.moonbeam.network",
      "wss://wss.moonriver.moonbeam.network",
    ],
    blockExplorerUrls: ["https://blockscout.moonriver.moonbeam.network"],
  },
  1286: {
    id: "0x506",
    chainName: "Moonrock",
    nativeCurrency: {
      name: "Rocs",
      symbol: "ROC",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  1287: {
    id: "0x507",
    chainName: "Moonbase Alpha",
    nativeCurrency: {
      name: "Dev",
      symbol: "DEV",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc.testnet.moonbeam.network",
      "wss://wss.testnet.moonbeam.network",
    ],
    blockExplorerUrls: ["https://moonbase.moonscan.io"],
  },
  1288: {
    id: "0x508",
    chainName: "Moonshadow",
    nativeCurrency: {
      name: "Moonshadow",
      symbol: "MSHD",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  1618: {
    id: "0x652",
    chainName: "Catecoin Chain Mainnet",
    nativeCurrency: {
      name: "Catecoin",
      symbol: "CATE",
      decimals: 18,
    },
    rpcUrls: ["https://send.catechain.com"],
    blockExplorerUrls: [],
  },
  1620: {
    id: "0x654",
    chainName: "Atheios",
    nativeCurrency: {
      name: "Atheios Ether",
      symbol: "ATH",
      decimals: 18,
    },
    rpcUrls: ["https://wallet.atheios.com:8797"],
    blockExplorerUrls: [],
  },
  1657: {
    id: "0x679",
    chainName: "Btachain",
    nativeCurrency: {
      name: "Bitcoin Asset",
      symbol: "BTA",
      decimals: 18,
    },
    rpcUrls: ["https://dataseed1.btachain.com/"],
    blockExplorerUrls: [],
  },
  1856: {
    id: "0x740",
    chainName: "Teslafunds",
    nativeCurrency: {
      name: "Teslafunds Ether",
      symbol: "TSF",
      decimals: 18,
    },
    rpcUrls: ["https://tsfapi.europool.me"],
    blockExplorerUrls: [],
  },
  1987: {
    id: "0x7c3",
    chainName: "EtherGem",
    nativeCurrency: {
      name: "EtherGem Ether",
      symbol: "EGEM",
      decimals: 18,
    },
    rpcUrls: ["https://jsonrpc.egem.io/custom"],
    blockExplorerUrls: [],
  },
  2000: {
    id: "0x7d0",
    chainName: "Dogechain Mainnet",
    nativeCurrency: {
      name: "Dogecoin",
      symbol: "wDOGE",
      decimals: 18,
    },
    rpcUrls: [
      "https://rpc-sg.dogechain.dog",
      "https://rpc-us.dogechain.dog",
      "https://rpc.dogechain.dog",
      "https://rpc01-sg.dogechain.dog",
      "https://rpc02-sg.dogechain.dog",
      "https://rpc03-sg.dogechain.dog",
    ],
    blockExplorerUrls: ["https://explorer.dogechain.dog"],
  },
  2001: {
    id: "0x7d1",
    chainName: "Milkomeda C1",
    nativeCurrency: {
      name: "milkADA",
      symbol: "mADA",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mainnet-cardano-evm.c1.milkomeda.com"],
    blockExplorerUrls: [
      "https://explorer-mainnet-cardano-evm.c1.milkomeda.com",
    ],
  },
  2020: {
    id: "0x7e4",
    chainName: "420coin",
    nativeCurrency: {
      name: "Fourtwenty",
      symbol: "420",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  2021: {
    id: "0x7e5",
    chainName: "Edgeware Mainnet",
    nativeCurrency: {
      name: "Edge",
      symbol: "EDG",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet1.edgewa.re"],
    blockExplorerUrls: [],
  },
  2022: {
    id: "0x7e6",
    chainName: "Beresheet Testnet",
    nativeCurrency: {
      name: "Testnet Edge",
      symbol: "tEDG",
      decimals: 18,
    },
    rpcUrls: ["https://beresheet1.edgewa.re"],
    blockExplorerUrls: [],
  },
  2559: {
    id: "0x9ff",
    chainName: "Kortho Mainnet",
    nativeCurrency: {
      name: "KorthoChain",
      symbol: "KTO",
      decimals: 11,
    },
    rpcUrls: ["https://www.kortho-chain.com"],
    blockExplorerUrls: [],
  },
  4002: {
    id: "0xfa2",
    chainName: "Fantom Testnet",
    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.testnet.fantom.network"],
    blockExplorerUrls: ["https://testnet.ftmscan.com/"],
    iconUrl: "https://cryptologos.cc/logos/fantom-ftm-logo.svg?v=029",
  },
  4689: {
    id: "0x1251",
    chainName: "IoTeX Network Mainnet",
    nativeCurrency: {
      name: "IoTeX",
      symbol: "IOTX",
      decimals: 18,
    },
    rpcUrls: ["https://babel-api.mainnet.iotex.io"],
    blockExplorerUrls: ["https://iotexscan.io"],
  },
  4690: {
    id: "0x1252",
    chainName: "IoTeX Network Testnet",
    nativeCurrency: {
      name: "IoTeX",
      symbol: "IOTX",
      decimals: 18,
    },
    rpcUrls: ["https://babel-api.testnet.iotex.io"],
    blockExplorerUrls: ["https://testnet.iotexscan.io"],
  },
  5197: {
    id: "0x144d",
    chainName: "EraSwap Mainnet",
    nativeCurrency: {
      name: "EraSwap",
      symbol: "ES",
      decimals: 18,
    },
    rpcUrls: [
      "https://mainnet.eraswap.network",
      "https://rpc-mumbai.mainnet.eraswap.network",
    ],
    blockExplorerUrls: [],
  },
  5611: {
    id: "0x15eb",
    chainName: "OpBNB Testnet",
    nativeCurrency: {
      name: "OpBNB",
      symbol: "OpBNB",
      decimals: 18,
    },
    rpcUrls: ["https://opbnb-testnet-rpc.bnbchain.org"],
    blockExplorerUrls: ["https://opbnbscan.com/"],
  },
  5700: {
    id: "0x1644",
    chainName: "Syscoin Tanenbaum Testnet",
    nativeCurrency: {
      name: "Testnet Syscoin",
      symbol: "tSYS",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.tanenbaum.io", "wss://rpc.tanenbaum.io/wss"],
    blockExplorerUrls: ["https://tanenbaum.io"],
  },
  5851: {
    id: "0x16db",
    chainName: "Ontology Testnet",
    nativeCurrency: {
      name: "ONG",
      symbol: "ONG",
      decimals: 9,
    },
    rpcUrls: [
      "https://polaris1.ont.io:20339",
      "https://polaris2.ont.io:20339",
      "https://polaris3.ont.io:20339",
      "https://polaris4.ont.io:20339",
    ],
    blockExplorerUrls: ["https://explorer.ont.io/testnet"],
  },
  5869: {
    id: "0x16ed",
    chainName: "Wegochain Rubidium Mainnet",
    nativeCurrency: {
      name: "Rubid",
      symbol: "RBD",
      decimals: 18,
    },
    rpcUrls: ["https://proxy.wegochain.io", "http://wallet.wegochain.io:7764"],
    blockExplorerUrls: [],
  },
  8029: {
    id: "0x1f5d",
    chainName: "MDGL Testnet",
    nativeCurrency: {
      name: "MDGL Token",
      symbol: "MDGLT",
      decimals: 18,
    },
    rpcUrls: ["https://testnet.mdgl.io"],
    blockExplorerUrls: [],
  },
  8080: {
    id: "0x1f90",
    chainName: "GeneChain Adenine Testnet",
    nativeCurrency: {
      name: "Testnet RNA",
      symbol: "tRNA",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-testnet.genechain.io"],
    blockExplorerUrls: ["https://scan-testnet.genechain.io"],
  },
  8217: {
    id: "0x2019",
    chainName: "Klaytn Mainnet Cypress",
    nativeCurrency: {
      name: "KLAY",
      symbol: "KLAY",
      decimals: 18,
    },
    rpcUrls: ["https://node-api.klaytnapi.com/v1/klaytn"],
    blockExplorerUrls: [],
  },
  8285: {
    id: "0x205d",
    chainName: "KorthoTest",
    nativeCurrency: {
      name: "Kortho Test",
      symbol: "KTO",
      decimals: 11,
    },
    rpcUrls: ["https://www.krotho-test.net"],
    blockExplorerUrls: [],
  },
  8723: {
    id: "0x2213",
    chainName: "TOOL Global Mainnet",
    nativeCurrency: {
      name: "TOOL Global",
      symbol: "OLO",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet-web3.wolot.io"],
    blockExplorerUrls: ["https://www.olo.network"],
  },
  8724: {
    id: "0x2214",
    chainName: "TOOL Global Testnet",
    nativeCurrency: {
      name: "TOOL Global",
      symbol: "OLO",
      decimals: 18,
    },
    rpcUrls: ["https://testnet-web3.wolot.io"],
    blockExplorerUrls: [],
  },
  8995: {
    id: "0x2323",
    chainName: "bloxberg",
    nativeCurrency: {
      name: "BERG",
      symbol: "U+25B3",
      decimals: 18,
    },
    rpcUrls: ["https://core.bloxberg.org"],
    blockExplorerUrls: [],
  },
  9000: {
    id: "0x2328",
    chainName: "Evmos Testnet",
    nativeCurrency: {
      name: "Photon",
      symbol: "PHOTON",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: ["https://evm.evmos.org", "https://explorer.evmos.org"],
  },
  10000: {
    id: "0x2710",
    chainName: "Smart Bitcoin Cash",
    nativeCurrency: {
      name: "Bitcoin Cash",
      symbol: "BCH",
      decimals: 18,
    },
    rpcUrls: [
      "https://smartbch.greyh.at",
      "https://rpc-mainnet.smartbch.org",
      "https://smartbch.fountainhead.cash/mainnet",
    ],
    blockExplorerUrls: [],
  },
  10001: {
    id: "0x2711",
    chainName: "Smart Bitcoin Cash Testnet",
    nativeCurrency: {
      name: "Bitcoin Cash Test Token",
      symbol: "BCHT",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-testnet.smartbch.org"],
    blockExplorerUrls: [],
  },
  10101: {
    id: "0x2775",
    chainName: "Blockchain Genesis Mainnet",
    nativeCurrency: {
      name: "GEN",
      symbol: "GEN",
      decimals: 18,
    },
    rpcUrls: [
      "https://eu.mainnet.xixoio.com",
      "https://us.mainnet.xixoio.com",
      "https://asia.mainnet.xixoio.com",
    ],
    blockExplorerUrls: [],
  },
  15557: {
    id: "0x3cc5",
    chainName: "EOS EVM Network Testnet",
    nativeCurrency: {
      name: "EOS",
      symbol: "EOS",
      decimals: 18,
    },
    rpcUrls: ["https://api.testnet.evm.eosnetwork.com/"],
    blockExplorerUrls: ["https://explorer.testnet.evm.eosnetwork.com/"],
  },

  16000: {
    id: "0x3e80",
    chainName: "MetaDot Mainnet",
    nativeCurrency: {
      name: "MetaDot Token",
      symbol: "MTT",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.metadot.network"],
    blockExplorerUrls: [],
  },
  16001: {
    id: "0x3e81",
    chainName: "MetaDot Testnet",
    nativeCurrency: {
      name: "MetaDot Token Testnet",
      symbol: "MTT-test",
      decimals: 18,
    },
    rpcUrls: ["https://testnet.metadot.network"],
    blockExplorerUrls: [],
  },
  17777: {
    id: "0x4571",
    chainName: "EOS EVM",
    nativeCurrency: {
      name: "EOS",
      symbol: "EOS",
      decimals: 18,
    },
    rpcUrls: ["https://api.evm.eosnetwork.com/"],
    blockExplorerUrls: ["https://explorer.evm.eosnetwork.com/"],
  },
  24484: {
    id: "0x5fa4",
    chainName: "Webchain",
    nativeCurrency: {
      name: "Webchain Ether",
      symbol: "WEB",
      decimals: 18,
    },
    rpcUrls: ["https://node1.webchain.network"],
    blockExplorerUrls: [],
  },
  24734: {
    id: "0x609e",
    chainName: "MintMe.com Coin",
    nativeCurrency: {
      name: "MintMe.com Coin",
      symbol: "MINTME",
      decimals: 18,
    },
    rpcUrls: ["https://node1.mintme.com"],
    blockExplorerUrls: [],
  },
  31102: {
    id: "0x797e",
    chainName: "Ethersocial Network",
    nativeCurrency: {
      name: "Ethersocial Network Ether",
      symbol: "ESN",
      decimals: 18,
    },
    rpcUrls: ["https://api.esn.gonspool.com"],
    blockExplorerUrls: [],
  },
  31337: {
    id: "0x7a69",
    chainName: "GoChain Testnet",
    nativeCurrency: {
      name: "GoChain Coin",
      symbol: "GO",
      decimals: 18,
    },
    rpcUrls: ["https://testnet-rpc.gochain.io"],
    blockExplorerUrls: ["https://testnet-explorer.gochain.io"],
  },
  32659: {
    id: "0x7f93",
    chainName: "Fusion Mainnet",
    nativeCurrency: {
      name: "Fusion",
      symbol: "FSN",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.anyswap.exchange", "https://fsn.dev/api"],
    blockExplorerUrls: [],
  },
  39797: {
    id: "0x9b75",
    chainName: "Energi Mainnet",
    nativeCurrency: {
      name: "Energi",
      symbol: "NRG",
      decimals: 18,
    },
    rpcUrls: ["https://nodeapi.gen3.energi.network"],
    blockExplorerUrls: [],
  },
  42069: {
    id: "0xa455",
    chainName: "pegglecoin",
    nativeCurrency: {
      name: "pegglecoin",
      symbol: "peggle",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  42161: {
    id: "0xa4b1",
    chainName: "Arbitrum",
    nativeCurrency: {
      name: "Ether",
      symbol: "AETH",
      decimals: 18,
    },
    rpcUrls: [
      `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      "https://arb1.arbitrum.io/rpc",
      "wss://arb1.arbitrum.io/ws",
    ],
    blockExplorerUrls: ["https://arbiscan.io", "https://explorer.arbitrum.io"],
    iconUrl: "https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=029",
  },
  42220: {
    id: "0xa4ec",
    chainName: "Celo Mainnet",
    nativeCurrency: {
      name: "CELO",
      symbol: "CELO",
      decimals: 18,
    },
    rpcUrls: ["https://forno.celo.org", "wss://forno.celo.org/ws"],
    blockExplorerUrls: ["https://explorer.celo.org"],
  },
  43110: {
    id: "0xa866",
    chainName: "Athereum",
    nativeCurrency: {
      name: "Athereum Ether",
      symbol: "ATH",
      decimals: 18,
    },
    rpcUrls: ["https://ava.network:21015/ext/evm/rpc"],
    blockExplorerUrls: [],
  },
  43113: {
    id: "0xa869",
    chainName: "Avalanche Fuji Testnet",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://testnet.snowtrace.io/"],
    iconUrl: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=029",
  },
  43114: {
    id: "0xa86a",
    chainName: "Avalanche Mainnet",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://cchain.explorer.avax.network"],
    iconUrl: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=029",
  },
  44787: {
    id: "0xaef3",
    chainName: "Celo Alfajores Testnet",
    nativeCurrency: {
      name: "CELO",
      symbol: "CELO",
      decimals: 18,
    },
    rpcUrls: [
      "https://alfajores-forno.celo-testnet.org",
      "wss://alfajores-forno.celo-testnet.org/ws",
    ],
    blockExplorerUrls: [],
  },
  49797: {
    id: "0xc285",
    chainName: "Energi Testnet",
    nativeCurrency: {
      name: "Energi",
      symbol: "tNRG",
      decimals: 18,
    },
    rpcUrls: ["https://nodeapi.test3.energi.network"],
    blockExplorerUrls: [],
  },
  62320: {
    id: "0xf370",
    chainName: "Celo Baklava Testnet",
    nativeCurrency: {
      name: "CELO",
      symbol: "CELO",
      decimals: 18,
    },
    rpcUrls: ["https://baklava-forno.celo-testnet.org"],
    blockExplorerUrls: [],
  },
  71393: {
    id: "0x116e1",
    chainName: "Polyjuice Testnet",
    nativeCurrency: {
      name: "CKB",
      symbol: "CKB",
      decimals: 8,
    },
    rpcUrls: [
      "https://godwoken-testnet-web3-rpc.ckbapp.dev",
      "ws://godwoken-testnet-web3-rpc.ckbapp.dev/ws",
    ],
    blockExplorerUrls: [],
  },
  73799: {
    id: "0x12047",
    chainName: "Energy Web Volta Testnet",
    nativeCurrency: {
      name: "Volta Token",
      symbol: "VT",
      decimals: 18,
    },
    rpcUrls: [
      "https://volta-rpc.energyweb.org",
      "wss://volta-rpc.energyweb.org/ws",
    ],
    blockExplorerUrls: [],
  },
  78110: {
    id: "0x1311e",
    chainName: "Firenze test network",
    nativeCurrency: {
      name: "Firenze Ether",
      symbol: "FIN",
      decimals: 18,
    },
    rpcUrls: ["https://ethnode.primusmoney.com/firenze"],
    blockExplorerUrls: [],
  },
  80001: {
    id: "0x13881",
    chainName: "Polygon Testnet Mumbai",
    nativeCurrency: {
      name: "Matic",
      symbol: "tMATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.matic.today", "wss://ws-mumbai.matic.today"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  84531: {
    id: "0x14A33",
    chainName: "BASE",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://goerli.base.org"],
    blockExplorerUrls: ["https://goerli.basescan.org/"],
  },

  100000: {
    id: "0x186a0",
    chainName: "QuarkChain Mainnet Root",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://jrpc.mainnet.quarkchain.io:38391/"],
    blockExplorerUrls: [],
  },
  100001: {
    id: "0x186a1",
    chainName: "QuarkChain Mainnet Shard 0",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://eth-jrpc.mainnet.quarkchain.io:39000/"],
    blockExplorerUrls: ["https://mainnet.quarkchain.io/0"],
  },
  100002: {
    id: "0x186a2",
    chainName: "QuarkChain Mainnet Shard 1",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://eth-jrpc.mainnet.quarkchain.io:39001/"],
    blockExplorerUrls: ["https://mainnet.quarkchain.io/1"],
  },
  100003: {
    id: "0x186a3",
    chainName: "QuarkChain Mainnet Shard 2",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://eth-jrpc.mainnet.quarkchain.io:39002/"],
    blockExplorerUrls: ["https://mainnet.quarkchain.io/2"],
  },
  100004: {
    id: "0x186a4",
    chainName: "QuarkChain Mainnet Shard 3",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://eth-jrpc.mainnet.quarkchain.io:39003/"],
    blockExplorerUrls: ["https://mainnet.quarkchain.io/3"],
  },
  100005: {
    id: "0x186a5",
    chainName: "QuarkChain Mainnet Shard 4",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://eth-jrpc.mainnet.quarkchain.io:39004/"],
    blockExplorerUrls: ["https://mainnet.quarkchain.io/4"],
  },
  100006: {
    id: "0x186a6",
    chainName: "QuarkChain Mainnet Shard 5",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://eth-jrpc.mainnet.quarkchain.io:39005/"],
    blockExplorerUrls: ["https://mainnet.quarkchain.io/5"],
  },
  100007: {
    id: "0x186a7",
    chainName: "QuarkChain Mainnet Shard 6",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://eth-jrpc.mainnet.quarkchain.io:39006/"],
    blockExplorerUrls: ["https://mainnet.quarkchain.io/6"],
  },
  100008: {
    id: "0x186a8",
    chainName: "QuarkChain Mainnet Shard 7",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://eth-jrpc.mainnet.quarkchain.io:39007/"],
    blockExplorerUrls: ["https://mainnet.quarkchain.io/7"],
  },
  110000: {
    id: "0x1adb0",
    chainName: "QuarkChain Devnet Root",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://jrpc.devnet.quarkchain.io:38391/"],
    blockExplorerUrls: [],
  },
  110001: {
    id: "0x1adb1",
    chainName: "QuarkChain Devnet Shard 0",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://eth-jrpc.devnet.quarkchain.io:39900/"],
    blockExplorerUrls: ["https://devnet.quarkchain.io/0"],
  },
  110002: {
    id: "0x1adb2",
    chainName: "QuarkChain Devnet Shard 1",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://eth-jrpc.devnet.quarkchain.io:39901/"],
    blockExplorerUrls: ["https://devnet.quarkchain.io/1"],
  },
  110003: {
    id: "0x1adb3",
    chainName: "QuarkChain Devnet Shard 2",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://eth-jrpc.devnet.quarkchain.io:39902/"],
    blockExplorerUrls: ["https://devnet.quarkchain.io/2"],
  },
  110004: {
    id: "0x1adb4",
    chainName: "QuarkChain Devnet Shard 3",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://eth-jrpc.devnet.quarkchain.io:39903/"],
    blockExplorerUrls: ["https://devnet.quarkchain.io/3"],
  },
  110005: {
    id: "0x1adb5",
    chainName: "QuarkChain Devnet Shard 4",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://eth-jrpc.devnet.quarkchain.io:39904/"],
    blockExplorerUrls: ["https://devnet.quarkchain.io/4"],
  },
  110006: {
    id: "0x1adb6",
    chainName: "QuarkChain Devnet Shard 5",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://eth-jrpc.devnet.quarkchain.io:39905/"],
    blockExplorerUrls: ["https://devnet.quarkchain.io/5"],
  },
  110007: {
    id: "0x1adb7",
    chainName: "QuarkChain Devnet Shard 6",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://eth-jrpc.devnet.quarkchain.io:39906/"],
    blockExplorerUrls: ["https://devnet.quarkchain.io/6"],
  },
  110008: {
    id: "0x1adb8",
    chainName: "QuarkChain Devnet Shard 7",
    nativeCurrency: {
      name: "QKC",
      symbol: "QKC",
      decimals: 18,
    },
    rpcUrls: ["http://eth-jrpc.devnet.quarkchain.io:39907/"],
    blockExplorerUrls: ["https://devnet.quarkchain.io/7"],
  },
  200101: {
    id: "0x30da5",
    chainName: "Milkomeda Testnet",
    nativeCurrency: {
      name: "MilkADA",
      symbol: "mADA",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-devnet-cardano-evm.c1.milkomeda.com"],
    blockExplorerUrls: ["https://explorer-devnet-cardano-evm.c1.milkomeda.com"],
  },
  200625: {
    id: "0x30fb1",
    chainName: "Akroma",
    nativeCurrency: {
      name: "Akroma Ether",
      symbol: "AKA",
      decimals: 18,
    },
    rpcUrls: ["https://remote.akroma.io"],
    blockExplorerUrls: [],
  },
  246529: {
    id: "0x3c301",
    chainName: "ARTIS sigma1",
    nativeCurrency: {
      name: "ARTIS sigma1 Ether",
      symbol: "ATS",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.sigma1.artis.network"],
    blockExplorerUrls: [],
  },
  246785: {
    id: "0x3c401",
    chainName: "ARTIS Testnet tau1",
    nativeCurrency: {
      name: "ARTIS tau1 Ether",
      symbol: "tATS",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.tau1.artis.network"],
    blockExplorerUrls: [],
  },
  333888: {
    id: "0x51840",
    chainName: "Polis Testnet",
    nativeCurrency: {
      name: "tPolis",
      symbol: "tPOLIS",
      decimals: 18,
    },
    rpcUrls: ["https://sparta-rpc.polis.tech"],
    blockExplorerUrls: [],
  },
  333999: {
    id: "0x518af",
    chainName: "Polis Mainnet",
    nativeCurrency: {
      name: "Polis",
      symbol: "POLIS",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.polis.tech"],
    blockExplorerUrls: [],
  },
  421611: {
    id: "0x66eeb",
    chainName: "Arbitrum Testnet Rinkeby",
    nativeCurrency: {
      name: "Arbitrum Rinkeby Ether",
      symbol: "ARETH",
      decimals: 18,
    },
    rpcUrls: [
      "https://rinkeby.arbitrum.io/rpc",
      "wss://rinkeby.arbitrum.io/ws",
    ],
    blockExplorerUrls: ["https://rinkeby-explorer.arbitrum.io"],
    iconUrl: "https://hord-prod-users.s3.amazonaws.com/arbitrum_18_18.png",
  },
  421613: {
    id: "0x66eed",
    chainName: "Arbitrum",
    nativeCurrency: {
      name: "Arbitrum Ether",
      symbol: "ARETH",
      decimals: 18,
    },
    rpcUrls: ["https://goerli-rollup.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://goerli.arbiscan.io/"],
    iconUrl: "https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=029",
  },
  11155111: {
    id: "0xaa36a7",
    chainName: "Sepolia",
    nativeCurrency: {
      name: "Sepolia Ether",
      symbol: "SEP",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.sepolia.online", "https://rpc.sepolia.dev"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
  1313114: {
    id: "0x14095a",
    chainName: "Ether-1",
    nativeCurrency: {
      name: "Ether-1 Ether",
      symbol: "ETHO",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ether1.org"],
    blockExplorerUrls: [],
  },
  1313500: {
    id: "0x140adc",
    chainName: "Xerom",
    nativeCurrency: {
      name: "Xerom Ether",
      symbol: "XERO",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.xerom.org"],
    blockExplorerUrls: [],
  },
  7762959: {
    id: "0x76740f",
    chainName: "Musicoin",
    nativeCurrency: {
      name: "Musicoin",
      symbol: "MUSIC",
      decimals: 18,
    },
    rpcUrls: ["https://mewapi.musicoin.tw"],
    blockExplorerUrls: [],
  },
  13371337: {
    id: "0xcc07c9",
    chainName: "PepChain Churchill",
    nativeCurrency: {
      name: "PepChain Churchill Ether",
      symbol: "TPEP",
      decimals: 18,
    },
    rpcUrls: ["https://churchill-rpc.pepchain.io"],
    blockExplorerUrls: [],
  },
  18289463: {
    id: "0x1171337",
    chainName: "IOLite",
    nativeCurrency: {
      name: "IOLite Ether",
      symbol: "ILT",
      decimals: 18,
    },
    rpcUrls: ["https://net.iolite.io"],
    blockExplorerUrls: [],
  },
  20181205: {
    id: "0x133f0d5",
    chainName: "quarkblockchain",
    nativeCurrency: {
      name: "quarkblockchain Native Token",
      symbol: "QKI",
      decimals: 18,
    },
    rpcUrls: ["https://hz.rpc.qkiscan.cn", "https://jp.rpc.qkiscan.io"],
    blockExplorerUrls: [],
  },
  28945486: {
    id: "0x1b9ac4e",
    chainName: "Auxilium Network Mainnet",
    nativeCurrency: {
      name: "Auxilium coin",
      symbol: "AUX",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.auxilium.global"],
    blockExplorerUrls: [],
  },
  35855456: {
    id: "0x2231c60",
    chainName: "Joys Digital Mainnet",
    nativeCurrency: {
      name: "JOYS",
      symbol: "JOYS",
      decimals: 18,
    },
    rpcUrls: ["https://node.joys.digital"],
    blockExplorerUrls: [],
  },
  61717561: {
    id: "0x3adbc39",
    chainName: "Aquachain",
    nativeCurrency: {
      name: "Aquachain Ether",
      symbol: "AQUA",
      decimals: 18,
    },
    rpcUrls: ["https://c.onical.org", "https://tx.aquacha.in/api"],
    blockExplorerUrls: [],
  },
  99415706: {
    id: "0x5ecf69a",
    chainName: "Joys Digital Testnet",
    nativeCurrency: {
      name: "TOYS",
      symbol: "TOYS",
      decimals: 18,
    },
    rpcUrls: ["https://toys.joys.cash/"],
    blockExplorerUrls: [],
  },
  222000222: {
    id: "0xd3b745e",
    chainName: "Meld Testnet",
    nativeCurrency: {
      name: "MELD",
      symbol: "MELD",
      decimals: 18,
    },
    rpcUrls: ["https://subnets.avax.network/meld/testnet/rpc"],
    blockExplorerUrls: ["https://subnets-test.avax.network/meld/"],
  },
  245022926: {
    id: "0xe9ac0ce",
    chainName: "Neon EVM DevNet",
    nativeCurrency: {
      name: "Neon",
      symbol: "NEON",
      decimals: 18,
    },
    rpcUrls: ["https://proxy.devnet.neonlabs.org/solana"],
    blockExplorerUrls: [],
  },
  245022934: {
    id: "0xe9ac0d6",
    chainName: "Neon EVM Mainnet",
    nativeCurrency: {
      name: "Neon",
      symbol: "NEON",
      decimals: 18,
    },
    rpcUrls: ["https://proxy.mainnet.neonlabs.org/solana"],
    blockExplorerUrls: [],
  },
  245022940: {
    id: "0xe9ac0dc",
    chainName: "Neon EVM Testnet",
    nativeCurrency: {
      name: "Neon",
      symbol: "NEON",
      decimals: 18,
    },
    rpcUrls: ["https://proxy.testnet.neonlabs.org/solana"],
    blockExplorerUrls: [],
  },
  311752642: {
    id: "0x1294f7c2",
    chainName: "OneLedger Mainnet",
    nativeCurrency: {
      name: "OLT",
      symbol: "OLT",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet-rpc.oneledger.network"],
    blockExplorerUrls: ["https://mainnet-explorer.oneledger.network"],
  },
  333000333: {
    id: "0x13d92e8d",
    chainName: "Meld Mainnet",
    nativeCurrency: {
      name: "Meld",
      symbol: "MELD",
      decimals: 18,
    },
    rpcUrls: ["https://subnets.avax.network/meld/testnet/rpc"],
    blockExplorerUrls: ["https://subnets.avax.network/meld"],
  },
  1122334455: {
    id: "0x42e576f7",
    chainName: "IPOS Network",
    nativeCurrency: {
      name: "IPOS Network Ether",
      symbol: "IPOS",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.iposlab.com", "https://rpc2.iposlab.com"],
    blockExplorerUrls: [],
  },
  1313161554: {
    id: "0x4e454152",
    chainName: "Aurora Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "aETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.mainnet.aurora.dev:8545"],
    blockExplorerUrls: ["https://aurorascan.dev"],
  },
  1313161555: {
    id: "0x4e454153",
    chainName: "Aurora Testnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "aETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.testnet.aurora.dev:8545"],
    blockExplorerUrls: ["https://testnet.aurorascan.dev"],
  },
  1313161556: {
    id: "0x4e454154",
    chainName: "Aurora BetaNet",
    nativeCurrency: {
      name: "Ether",
      symbol: "aETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.betanet.aurora.dev:8545"],
    blockExplorerUrls: [],
  },
  1666600000: {
    id: "0x63564c40",
    chainName: "Harmony Mainnet Shard 0",
    nativeCurrency: {
      name: "ONE",
      symbol: "ONE",
      decimals: 18,
    },
    rpcUrls: ["https://api.harmony.one"],
    blockExplorerUrls: ["https://explorer.harmony.one"],
  },
  1666600001: {
    id: "0x63564c41",
    chainName: "Harmony Mainnet Shard 1",
    nativeCurrency: {
      name: "ONE",
      symbol: "ONE",
      decimals: 18,
    },
    rpcUrls: ["https://s1.api.harmony.one"],
    blockExplorerUrls: [],
  },
  1666600002: {
    id: "0x63564c42",
    chainName: "Harmony Mainnet Shard 2",
    nativeCurrency: {
      name: "ONE",
      symbol: "ONE",
      decimals: 18,
    },
    rpcUrls: ["https://s2.api.harmony.one"],
    blockExplorerUrls: [],
  },
  1666600003: {
    id: "0x63564c43",
    chainName: "Harmony Mainnet Shard 3",
    nativeCurrency: {
      name: "ONE",
      symbol: "ONE",
      decimals: 18,
    },
    rpcUrls: ["https://s3.api.harmony.one"],
    blockExplorerUrls: [],
  },
  1666700000: {
    id: "0x6357d2e0",
    chainName: "Harmony Testnet Shard 0",
    nativeCurrency: {
      name: "ONE",
      symbol: "ONE",
      decimals: 18,
    },
    rpcUrls: ["https://api.s0.b.hmny.io"],
    blockExplorerUrls: ["https://explorer.pops.one"],
  },
  1666700001: {
    id: "0x6357d2e1",
    chainName: "Harmony Testnet Shard 1",
    nativeCurrency: {
      name: "ONE",
      symbol: "ONE",
      decimals: 18,
    },
    rpcUrls: ["https://api.s1.b.hmny.io"],
    blockExplorerUrls: [],
  },
  1666700002: {
    id: "0x6357d2e2",
    chainName: "Harmony Testnet Shard 2",
    nativeCurrency: {
      name: "ONE",
      symbol: "ONE",
      decimals: 18,
    },
    rpcUrls: ["https://api.s2.b.hmny.io"],
    blockExplorerUrls: [],
  },
  1666700003: {
    id: "0x6357d2e3",
    chainName: "Harmony Testnet Shard 3",
    nativeCurrency: {
      name: "ONE",
      symbol: "ONE",
      decimals: 18,
    },
    rpcUrls: ["https://api.s3.b.hmny.io"],
    blockExplorerUrls: [],
  },
  3125659152: {
    id: "0xba4dc610",
    chainName: "Pirl",
    nativeCurrency: {
      name: "Pirl Ether",
      symbol: "PIRL",
      decimals: 18,
    },
    rpcUrls: ["https://wallrpc.pirl.io"],
    blockExplorerUrls: [],
  },
  4216137055: {
    id: "0xfb4d255f",
    chainName: "OneLedger Testnet Frankenstein",
    nativeCurrency: {
      name: "OLT",
      symbol: "OLT",
      decimals: 18,
    },
    rpcUrls: ["https://frankenstein-rpc.oneledger.network"],
    blockExplorerUrls: ["https://frankenstein-explorer.oneledger.network"],
  },
  11297108099: {
    id: "0x2a15c3083",
    chainName: "Palm Testnet",
    nativeCurrency: {
      name: "PALM",
      symbol: "PALM",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
  11297108109: {
    id: "0x2a15c308d",
    chainName: "Palm Mainnet",
    nativeCurrency: {
      name: "PALM",
      symbol: "PALM",
      decimals: 18,
    },
    rpcUrls: [],
    blockExplorerUrls: [],
  },
};

export const cardanoNetworks: INetworks = {
  0: {
    id: "0x0",
    chainName: "Cardano Testnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "tADA",
      decimals: 6,
    },
    rpcUrls: [],
    blockExplorerUrls: ["https://testnet.cardanoscan.io"],
  },
  1: {
    id: "0x1",
    chainName: "Cardano Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ADA",
      decimals: 6,
    },
    rpcUrls: [],
    blockExplorerUrls: ["https://cardanoscan.io"],
  },
};

// export const supportedNetworks: ISupportedNetworks = {
//   [BLOCKCHAIN_TYPES.evm]: ethereumNetworks,
//   [BLOCKCHAIN_TYPES.cardano]: cardanoNetworks,
// };
