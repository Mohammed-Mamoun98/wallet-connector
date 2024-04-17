import clsx from "clsx";
import React from "react";
import { secondaryFontColor } from "src/styles/tw-classes";
import { experiencesList } from "./experiencesList";
import "./Experience.scss";
import Experience from "./Experience";

export default function Experiences() {
  return (
    <div>
      <span
        className={clsx(secondaryFontColor, "text-sm font-normal block mb-2 ")}
      >
        Recent experience
      </span>
      <div className="flex flex-col gap-3">
        {experiencesList.map((exp) => (
          <Experience {...exp} key={exp.company} />
        ))}
      </div>
    </div>
  );
}
