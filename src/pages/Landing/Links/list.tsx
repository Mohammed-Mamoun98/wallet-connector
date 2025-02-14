import { ReactComponent as LinkedInIcon } from "src/assets/svgs/icon_linkedin_16.svg";
import { ReactComponent as GithubIcon } from "src/assets/svgs/icon_github_16.svg";
import { ReactComponent as WebsiteIcon } from "src/assets/svgs/icon_website.svg";
import { ReactComponent as EmailIcon } from "src/assets/svgs/icon_email.svg";
import { ReactComponent as NpmIcon } from "src/assets/svgs/npm-icon.svg";
import StackoverflowIcon from "src/assets/imgs/Stack_Overflow_icon.svg.png";
import StackExchangeIcon from "src/assets/imgs/stack-exchange-icon.png";
import CopyToClipboard from "src/components/Shared/CopyToClipboard/CopyToClipboard";
import Link from "./Link/Link";

export interface ILink {
  icon: JSX.Element;
  name: string;
  link?: string;
  classname?: string;
  onClick?: () => void;
  render?: () => JSX.Element;
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
    link: "https://pink-loralie-74.tiiny.site",
  },
  {
    name: "Upwork",
    icon: <img width={20} height={20} src="https://www.svgrepo.com/show/349549/upwork.svg" alt="upwork" />,
    link: "https://www.upwork.com/freelancers/~01f09035063e028b50",
  },
  {
    name: "NPM",
    icon: <NpmIcon width={20} height={20} />,
    link: "https://www.npmjs.com/settings/mo-toolkit/packages",
  },
  {
    name: "491",
    icon: (
      <img src={StackoverflowIcon} className="min-w-[24px] w-[24px] h-auto" alt="stackoverflow" />
    ),
    link: "https://stackoverflow.com/users/11052491/mohammed-alshaer",
  },
  {
    name: "111",
    icon: (
      <img src={StackExchangeIcon} className="min-w-[24px] w-[24px] h-auto" alt="ethereum" />
    ),
    link: "https://ethereum.stackexchange.com/users/93101/mohammed-alshaer",
  },
  {
    name: "modahmada2018@gmail.com",
    icon: <EmailIcon />,
    link: "",
    classname:
      "bg-[#fff] md:flex-grow text-[#26272B] w-[100%] md:w-[fit-content] flex-1",
    render: function () {
      return (
        <>
          <CopyToClipboard classname="w-full md:w-fit" textToCopy={this.name}>
            <Link {...this} />
          </CopyToClipboard>
        </>
      );
    },
  },
];
