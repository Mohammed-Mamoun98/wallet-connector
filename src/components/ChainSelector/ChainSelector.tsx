import React from "react";
// import { ReactComponent as EthIcon } from "src/assets/svgs/eth.svg";
import { useWalletStore } from "src/state/stores/walletState";
import NetworkDropdown from "./NetworkDropdown/NetworkDropdown";
import NetworkIcon from "./NetworkDropdown/NetworkIcon/NetworkIcon";
import { Popper } from "../Shared/Pepper/Popper";

export default function ChainSelector() {
  const { chain } = useWalletStore();

  if (!chain) return <></>;
  return (
    <Popper closeOnContentClick content={<NetworkDropdown />}>
      <div className="chain-selector border-solid border-[0.5px] border-[#38383A] rounded-xl p-1.5">
        <div className="selected-network cursor-pointer">
          <NetworkIcon iconUrl={chain?.iconUrl} />
        </div>
      </div>
    </Popper>
  );
}
