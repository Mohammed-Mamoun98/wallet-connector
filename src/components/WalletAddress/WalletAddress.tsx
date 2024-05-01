import React from "react";
import { formatAddress } from "../../utils/string";
import BlockiesSvg from "blockies-react-svg";
import CopyToClipboard from "../Shared/CopyToClipboard/CopyToClipboard";

interface IWalletAddress {
  address: string;
}

export default function WalletAddress({ address }: IWalletAddress) {
  return (
    <CopyToClipboard classname="flex cursor-pointer gap-1" textToCopy={address}>
      <BlockiesSvg
        scale={3}
        address={address}
        style={{ borderRadius: "50%" }}
      />
      <h5>{formatAddress(address).showed}</h5>
    </CopyToClipboard>
  );
}
