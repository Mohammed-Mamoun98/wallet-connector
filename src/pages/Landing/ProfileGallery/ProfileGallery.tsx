import React from "react";
import { galleryImgsList } from "./galleryList";
import clsx from "clsx";
import { secondaryFontColor } from "src/styles/tw-classes";

export default function ProfileGallery() {
  return (
    <div className="flex flex-col gap-4">
      {galleryImgsList.map((galleryImg) => (
        <a
          href={galleryImg.link}
          target="_blank"
          rel="noreferrer"
          className="bg-black p-[5px] rounded-[32px]"
        >
          <img
            src={galleryImg.img}
            className="w-100 h-auto rounded-[27px]"
            alt="gallery-img"
          />
          <div className="pb-1 px-4">
            <span className="block mt-3 text-lg">{galleryImg.title}</span>
            <span className={clsx("block text-sm", secondaryFontColor)}>
              {galleryImg.describtion}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
