import clsx from "clsx";
import React from "react";
import { secondaryFontColor } from "src/styles/tw-classes";
import { experiencesList } from "./experiencesList";
import "./Experience.scss";

export default function Experience() {
  return (
    <div>
      <span
        className={clsx(secondaryFontColor, "text-sm font-normal block mb-2 ")}
      >
        Recent experience
      </span>
      <div className="flex flex-col gap-3">
        {experiencesList.map((exp) => (
          <div className="experience-wrapper flex justify-between items-center py-3  relative cursor-pointer">
            <div className="show-at-hover absolute left-[-3%] top-0 w-[105%] h-[100%] bg-[#272727] z-[0] rounded-[16px]" />
            <div className="flex items-center gap-3 text-lg z-1">
              <span className="block md:text-base sm:text-sm text-xs z-[1]">
                {exp.company}
              </span>
              <span className={clsx("text-sm", secondaryFontColor)}>
                {exp.position}
              </span>
            </div>
            <div
              className={clsx("md:text-base text-xs pr-2", secondaryFontColor)}
            >
              {exp.date.from} - {exp.date.to}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
