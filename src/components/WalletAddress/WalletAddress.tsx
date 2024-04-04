import React from "react";
import { formatAddress } from "../../utils/string";
import Blockies from "react-blockies";
import BlockiesSvg from "blockies-react-svg";

interface IWalletAddress {
  address: string;
}
export default function WalletAddress({ address }: IWalletAddress) {
  return (
    <div className="flex gap-1">
      <BlockiesSvg
      scale={3}
        address={address}
        style={{ borderRadius: "50%", }}
      />
      <h5>{formatAddress(address).showed}</h5>
    </div>
  );
}
