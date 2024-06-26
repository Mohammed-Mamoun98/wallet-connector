import React from "react";
import { ILink } from "../list";
import clsx from "clsx";

export default function Link({
  icon,
  link,
  name,
  classname,
  onClick: passedOnClick,
}: ILink) {
  const handleClick = (e: any) => {
    e.preventDefault();
    if (!link) {
      passedOnClick?.();
      return;
    }
    window.open(link, e.target);
  };
  return (
    <a
      className={clsx(
        "flex py-[8px] h-full  flex-1 md:flex-grow-0 px-[12px] gap-[8px] justify-center items-center bg-[#303030] rounded-[14px] min-w-fit",
        classname
      )}
      href={link}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
    >
      <>{icon}</>
      <span className="font-[14px] font-medium">{name}</span>
    </a>
  );
}
