import React from "react";
import { Chain, INetwork } from "src/constants/networks";
import NetworkIcon from "../NetworkIcon/NetworkIcon";
import clsx from "clsx";

interface IDropdownItem {
  chain: INetwork;
  selected: boolean;
  onClick?: (chain: INetwork) => void;
}

export default function DropdownItem({
  chain,
  selected,
  onClick,
}: IDropdownItem) {
  return (
    <div
      className={clsx(
        "flex gap-2 items-center whitespace-pre py-[8px] px-[6px]  cursor-pointer rounded-[10px] hover:bg-[#272727]",
        { ["bg-[#272727]"]: selected }
      )}
      onClick={() => onClick?.(chain)}
    >
      <NetworkIcon iconUrl={chain.iconUrl} />
      <span className="text-white">{chain.chainName}</span>
    </div>
  );
}
