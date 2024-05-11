import React from "react";
import { ReactComponent as LinkedInLogo } from "src/assets/svgs/linkedin-logo.svg";
import { recomandationsList } from "./recomandationsList";
import Recomandation from "./Recomandation/Recomandation";
import clsx from "clsx";
import { secondaryFontColor } from "src/styles/tw-classes";

export default function Recomandations() {
  return (
    <div>
      <span className={clsx("text-sm block mb-2", secondaryFontColor)}>
        Recommendations
      </span>
      <div className="flex flex-col gap-[32px]">
        {recomandationsList.map((recomandation) => (
          <Recomandation {...recomandation} key={recomandation.giver.name} />
        ))}
      </div>
    </div>
  );
}
