import React, { useCallback, useMemo } from "react";
import { useWalletStore } from "../../state/stores/walletState";
import { IConnectionInfo } from "../../state/types/wallet";
import { IConnector } from "../../types/connector";
import { WALLET_CONNECTION_TYPE, storeConnectionType } from "../../services/wallet/connectionPreservers";
import { usePromise } from "../usePromise/usePromise";
import { IRequestState } from "../../state/types/requestState";
import { retrieveFromLs } from "../../utils/localstorage";
import { connectorsList } from "../../constants/connectors/list";

interface IUseWalletConnection extends IConnectionInfo {
  hanldeConnection: () => void;
  diconnectWallet: () => void;
}

interface IUseWAlletConnectionParams {
  connector?: IConnector | null;
}


const storedConnectioType = retrieveFromLs(WALLET_CONNECTION_TYPE);
const uiConnector = connectorsList.find(
  (con) => con.connector.name === storedConnectioType
);
  console.log({uiConnector, storedConnectioType, connectorsList});
  
const defaultConnector = uiConnector ? uiConnector.connector : null;


export default function useWalletConnection({
  connector = defaultConnector,
}: IUseWAlletConnectionParams): [IUseWalletConnection, IRequestState] {
  const {
    setAccount,
    account,
    chain,
    balance,
    resetInfo,
    setChain,
    setBalance,
  } = useWalletStore((state) => state);

  const handleConnectionSuccess = useCallback(
    (res: IConnectionInfo | null) => {
      if (!res) return;
      setChain(res.chain);
      setAccount(res.account);
      setBalance(res.balance);
    },
    [setChain, setAccount, setBalance]
  );

  const hanldeConnection = useCallback(async () => {
    if (!connector) return;

    connector.connect((connectionInfo) => {
      storeConnectionType(connector.name);

      handleConnectionSuccess(connectionInfo);
      connector.addListeners({
        onAccountChanged: (newAccount) => {
          setAccount(newAccount as string);
        },
        onBalanceChanged: (newBalance) => {
          setBalance(newBalance);
        },
        onChainChanged: (newChain) => {
          setChain(newChain);
        },
      });
    });
  }, [connector?.name]);

  const handleDisconect = () => {
    connector?.disconnect?.();
    resetInfo();
  };

  const [
    statfullHandleConnection,
    connectionResult,
    isConnecting,
    connectionError,
  ] = usePromise(hanldeConnection);

  const connectionRequestState: IRequestState = {
    error: connectionError,
    loading: isConnecting,
    response: connectionResult,
  };

  const connectionInfo = useMemo<IUseWalletConnection>(() => {
    return {
      account,
      chain,
      balance,
      hanldeConnection: statfullHandleConnection,
      diconnectWallet: handleDisconect,
    };
  }, [account, chain, balance, hanldeConnection]);

  return [connectionInfo, connectionRequestState];
}
