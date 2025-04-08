import React from "react";
import { IExperience } from "./experiencesList";
import { secondaryFontColor } from "src/styles/tw-classes";
import { ReactComponent as ArrowDown } from "src/assets/svgs/expand-arrow-down.svg";
import clsx from "clsx";
import { useCollapse } from "react-collapsed";

export default function Experience({
  company,
  date: { from, to },
  position,
  bullets,
}: IExperience) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <>
      <div
        {...getToggleProps()}
        className={clsx(
          "experience-wrapper w-[105%] ml-[-12px]  p-3  relative cursor-pointer rounded-[16px] hover:bg-[#272727]",
          {
            "bg-[#272727]": isExpanded,
          }
        )}
      >
        <div className="flex justify-between items-center">
          <div className="show-at-hovers absolute left-[-3%] top-0 w-[105%] h-[100%] z-[0] rounded-[16px]" />
          <div className="flex items-center gap-3 text-lg z-1">
            <span className="block md:text-base text-[10px] z-[1]">
              {company}
            </span>
            <span className={clsx("text-[10px] md:text-sm", secondaryFontColor)}>
              {position}
            </span>
          </div>
          <div className="flex items-center">
            <div
              className={clsx("sm:text-base text-[10px] pr-2", secondaryFontColor)}
            >
              {`${from.month} ${from.year}`} - {typeof to === "string" ? to : `${to.month} ${to.year}`}
            </div>
            <ArrowDown
              className={clsx("z-10 show-at-hover", {
                "block rotate-90 force-show": isExpanded,
              })}
            />
          </div>
        </div>
        <div {...getCollapseProps()}>
          <div className={clsx("mt-4 text-[13px]", secondaryFontColor)}>
            <ul className="list-disc list-inside space-y-3">
              {bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
