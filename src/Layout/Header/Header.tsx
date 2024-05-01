import React from "react";
import ConnectBtn from "../../components/ConnectBtn/ConnectBtn";

export default function Header() {
  return (
    <div className="py-4 flex px-2 gap-2 bg-[#2c2c2c] justify-between items-center">
      <ConnectBtn />
    </div>
  );
}
