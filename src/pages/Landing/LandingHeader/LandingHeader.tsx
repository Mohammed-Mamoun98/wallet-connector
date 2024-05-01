import React from "react";
import Links from "../Links/Links";
import ConnectBtn from "src/components/ConnectBtn/ConnectBtn";

export default function LandingHeader() {
  return (
    <div className="">
      <div className="flex justify-between items-center flex-wrap flex-col-reverse md:flex-row mb-0 md:mb-7">
        <span className="md:text-[36px] text-[26px] font-semibold  mt-7 md:mt-0">
          Mohammed AIshaer
        </span>
        <div className="flex justify-center md:justify-start w-full md:w-fit">
          <ConnectBtn />
        </div>
      </div>
      <Links />
    </div>
  );
}
