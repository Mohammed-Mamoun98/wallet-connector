import React from "react";
import { infoLinks } from "./list";
import Link from "./Link/Link";

export default function Links() {
  return (
    <div className="flex gap-[8px] items-center flex-wrap mt-3">
      {infoLinks.map((link) => (
        <Link {...link} key={link.name} />
      ))}
    </div>
  );
}
