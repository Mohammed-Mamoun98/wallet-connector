import React from "react";
import Summary from "./Summary/Summary";
import LandingHeader from "./LandingHeader/LandingHeader";
import Recomandations from "./Recomandations/Recomandations";
import ProfileGallery from "./ProfileGallery/ProfileGallery";
import Experiences from "./Experiences/Experiences";
import SkillsWrapper from "./Skills/SkillsWrapper/SkillsWrapper";
import "./Landing.scss";

export default function Landing() {
  return (
    <div className="bg-[#141414] text-white  flex flex-col flex-1 pt-6">
      <div className="lg:w-[620px] w-[90%] mx-auto flex-1 flex flex-col gap-10 pb-[100px]">
        <LandingHeader />
        <Summary />
        <SkillsWrapper />
        <Experiences />
        <Recomandations />
        <ProfileGallery />
      </div>
    </div>
  );
}
