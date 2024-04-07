import React, { useCallback } from "react";
import { supportedChainsList } from "src/constants/chains/chainsList";
import DropdownItem from "./DropdownItem/DropdownItem";
import { useWalletStore } from "src/state/stores/walletState";
import useWalletConnection from "src/hooks/useWalletConnection/useWalletConnection";
import { IConnector } from "src/types/connector";
import { INetwork } from "src/constants/networks";

export default function NetworkDropdown() {
  const { chain: selectedChain } = useWalletStore();
  // const {} = useWalletConnection()

  const changeChain = useCallback((chain: INetwork) => {
    const currentConnector = (window as any).connector as IConnector;
    currentConnector?.switchChain?.(+chain.id);
  }, []);

  return (
    <div className="flex flex-col gap-2 bg-[#1d1d1d] p-3 rounded-[24px]">
      {supportedChainsList.map((chain) => (
        <DropdownItem
          key={chain.id}
          chain={chain}
          selected={chain.id === selectedChain?.id}
          onClick={changeChain}
        />
      ))}
    </div>
  );
}
