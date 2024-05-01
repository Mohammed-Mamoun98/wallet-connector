import React, { useState } from "react";
import { copyToClipboard } from "src/utils/clipboard";
import Tippy, { TippyProps } from "@tippyjs/react";

type PartialTippyProps = Partial<TippyProps>;

interface ICopyToClipboard {
  children: JSX.Element | JSX.Element[];
  textToCopy: string;
  classname?: string;
  tooltipProps?: PartialTippyProps;
}
export default function CopyToClipboard({
  children,
  textToCopy,
  classname,
  tooltipProps,
}: ICopyToClipboard) {
  const [isVisiable, setVisiable] = useState(false);

  const handleCopy = () => {
    copyToClipboard(textToCopy);
    setVisiable(true);
    setTimeout(() => {
      setVisiable(false);
    }, 1000);
  };

  return (
    <Tippy
      placement={"bottom"}
      content="Copied to clipboard!"
      visible={isVisiable}
      {...tooltipProps}
    >
      <div className={classname} onClick={handleCopy}>
        {children}
      </div>
    </Tippy>
  );
}
