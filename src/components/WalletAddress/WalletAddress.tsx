import React, { useState } from "react";
import { formatAddress } from "../../utils/string";
import BlockiesSvg from "blockies-react-svg";

import { copyToClipboard } from "src/utils/clipboard";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // op
interface IWalletAddress {
  address: string;
}
export default function WalletAddress({ address }: IWalletAddress) {
  const [isVisiable, setVisiable] = useState(false);

  const handleCopy = () => {
    copyToClipboard(address);
    setVisiable(true);
    setTimeout(() => {
      setVisiable(false);
    }, 1000);
  };

  return (
    <Tippy content="Copied to clipboard!" visible={isVisiable}>
      <div className="flex cursor-pointer gap-1" onClick={handleCopy}>
        <BlockiesSvg
          scale={3}
          address={address}
          style={{ borderRadius: "50%" }}
        />
        <h5>{formatAddress(address).showed}</h5>
      </div>
    </Tippy>
  );
}
