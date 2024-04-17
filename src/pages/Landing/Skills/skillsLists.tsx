import { ReactComponent as Web3SkillsIcon } from "src/assets/svgs/icon_global_20.svg";
import { ReactComponent as CodeSkillsIcon } from "src/assets/svgs/icon_code_20.svg";

export interface ISkillList {
  title: string;
  icon: JSX.Element;
  skills: string[];
}

export const generalSkill: ISkillList = {
  title: "GENERAL SKILLS",
  icon: <CodeSkillsIcon />,
  skills: [
    "React",
    "React Native",
    "Node.js",
    "Next.js",
    "Typescript",
    "Javascript",
    "Redux",
    "Zustand",
    "Context",
    "React hooks",
    "Cypress",
    "Jest",
    "SASS",
    "Tailwind",
    "Styled Components",
  ],
};

export const web3Skills: ISkillList = {
  title: "WEB3 SKILLS",
  icon: <Web3SkillsIcon />,
  skills: [
    "web3.js",
    "ethers.js",
    "viem",
    "wagmi",
    "dynamic",
    "Metamask",
    "WalletConnect",
    "Chain explorers",
  ],
};
