import React from "react";
import { ISkillList } from "./skillsLists";

export default function Skills({ icon, skills, title }: ISkillList) {
  return (
    <div className="">
      <div className="flex gap-2">
        {icon}
        <span className="font-normal text-[14px] opacity-60  text-[#EBEBF5]">
          {title}
        </span>
      </div>
      <div className="mt-2 flex gap-2 flex-wrap">
        {skills.map((skill) => (
          <div className="rounded-[12px] bg-[#252525] opacity-60 text-[16px]  py-[5px] px-[10px]">{skill}</div>
        ))}
      </div>
    </div>
  );
}
