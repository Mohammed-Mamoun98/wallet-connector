import React from "react";
import { IRecomandation } from "../recomandationsList";
import { ReactComponent as LinkedInLogo } from "src/assets/svgs/linkedin-logo.svg";
import clsx from "clsx";
import { secondaryFontColor } from "src/styles/tw-classes";

export default function Recomandation({ giver, text }: IRecomandation) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-normal text-md">"{text}"</span>
      <div className="flex gap-3 items-center">
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <span>{giver.name}</span>
            <a href={giver.linkedinLink}>
              <LinkedInLogo className="hover:brightness-150 cursor-pointer" />
            </a>
          </div>
          <span className={clsx("text-sm", secondaryFontColor)}>
            {giver.role}
          </span>
        </div>
      </div>
    </div>
  );
}
