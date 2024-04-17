import React from "react";
import { IExperience } from "./experiencesList";
import { secondaryFontColor } from "src/styles/tw-classes";
import clsx from "clsx";

export default function Experience({
  company,
  date: { from, to },
  position,
}: IExperience) {
  return (
    <div className="experience-wrapper flex justify-between items-center py-3  relative cursor-pointer">
      <div className="show-at-hover absolute left-[-3%] top-0 w-[105%] h-[100%] bg-[#272727] z-[0] rounded-[16px]" />
      <div className="flex items-center gap-3 text-lg z-1">
        <span className="block md:text-base sm:text-sm text-xs z-[1]">
          {company}
        </span>
        <span className={clsx("text-sm", secondaryFontColor)}>{position}</span>
      </div>
      <div className={clsx("md:text-base text-xs pr-2", secondaryFontColor)}>
        {from} - {to}
      </div>
    </div>
  );
}
