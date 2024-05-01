import React from "react";
import Skills from "../Skills";
import { generalSkill, web3Skills } from "../skillsLists";

export default function SkillsWrapper() {
  return (
    <>
      <Skills {...generalSkill} />
      <Skills {...web3Skills} />
    </>
  );
}
