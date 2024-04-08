import { ReactComponent as LinkedInIcon } from "src/assets/svgs/icon_linkedin_16.svg";
import { ReactComponent as GithubIcon } from "src/assets/svgs/icon_github_16.svg";
import { ReactComponent as WebsiteIcon } from "src/assets/svgs/icon_website.svg";
import { ReactComponent as EmailIcon } from "src/assets/svgs/icon_email.svg";

export interface ILink {
  icon: JSX.Element;
  name: string;
  link?: string;
  classname?: string;
  onClick?: () => void;
}

export const infoLinks: ILink[] = [
  {
    name: "LinkedIn",
    icon: <LinkedInIcon />,
    link: "https://www.linkedin.com/in/mohammed-alshaer-96b4741a1/",
  },
  {
    name: "Github",
    icon: <GithubIcon />,
    link: "https://github.com/Mohammed-Mamoun98",
  },
  {
    name: "CV",
    icon: <WebsiteIcon />,
    link: "https://online.fliphtml5.com/rdhno/nvzo",
  },
  {
    name: "modahmada2018@gmail.com",
    icon: <EmailIcon />,
    link: "",
    classname: "bg-[#fff] md:flex-grow text-[#26272B] w-[100%] md:w-[fit-content] flex-1",
    onClick: function () {
      navigator.clipboard.writeText("modahmada2018@gmail.com");
      alert("Email is copied to your clipboard :)");
    },
  },
];
