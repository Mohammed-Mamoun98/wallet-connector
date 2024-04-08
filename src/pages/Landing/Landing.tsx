import React from "react";
import "./Landing.scss";
import Links from "./Links/Links";
import Summary from "./Summary/Summary";
import LandingHeader from "./LandingHeader/LandingHeader";
import Skills from "./Skills/Skills";
import { generalSkill, web3Skills } from "./Skills/skillsLists";

export default function Landing() {
  return (
    <div className="bg-[#141414] text-white  flex flex-col flex-1 pt-6">
      <div className="lg:w-[620px] w-[90%] mx-auto flex-1">
        <LandingHeader />
        <Links />
        <Summary />
        <div className="mt-7 flex flex-col gap-7">
          <Skills {...generalSkill} />
          <Skills {...web3Skills} />
        </div>
      </div>
    </div>
  );
}
