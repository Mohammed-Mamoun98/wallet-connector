export interface IExperience {
  position: string;
  company: string;
  date: {
    from: number;
    to: number | string;
  };
  bullets: string[];
}

export const experiencesList: IExperience[] = [
  {
    company: "Dcentralab",
    position: "Senior Frontend Engineer",
    date: {
      from: 2021,
      to: "2024",
    },
    bullets: [
      "Worked on Hord App, a high-performing Ethereum staking app with over $7 million worth of ETH staked, consistently ranking among the top 3 in APY compared t ocompetitors.",
      "Created highly reusable tools like useContractReader. A function that simplifies dealing with contracts interactions (reads and writes).",
      "Created atomic internal css framework (cover 70% of what tailwind css do",
      "Contributed to company wallet connector mono-repo using lerna, supporting multiple wallets and chains (metamask, walletConnect, ledger and more).",
      "Adding support for multi chain (Ethereum, Binance, Arbitrum)",
      "Wrote a set of unit-tests using cypress covering most used components",
    ],
  },
  {
    company: "Bria.AI",
    position: "Senior Frontend Engineer",
    date: {
      from: 2022,
      to: 2022,
    },
    bullets: [
      "Implemented functionalities for removing and changing backgrounds in images, enhancing user experience and improving the app’s visual editing capabilities.",
      "Integrated Object Manipulation Tools, Designed and integrated tools for changing objects within images, allowing users to modify and customize their photos with ease.",
      "Enhanced Image Processing Workflows, Applied various filters and image processing techniques to deliver high-quality, professional-grade photo enhancements.",
      "Optimized Frontend Performance: Improved the responsiveness and efficiency of the image processing features, ensuring smooth and fast user interactions across different devices and platforms",
    ],
  },
  {
    company: "Taaspoint",
    position: "Frontend Engineer",
    date: {
      from: 2020,
      to: 2021,
    },
    bullets: [
      "Developed a CMT Dashboard (Campaign management tool) using (react, typescript, chart.js)",
      "Developed a tableau report gallery, a filter UI controller",
    ],
  },
  {
    company: "Hemma Portal",
    position: "Frontend Engineer",
    date: {
      from: 2020,
      to: 2021,
    },
    bullets: [
      "Build and deliver an entire E-commerce (check at gheeed.com) from scratch that had sales reached +1M SAR in less than 7 months.",
      "Worked on couple enhancing performance techniques like progressive images and code splitting.",
    ],
  },
];
