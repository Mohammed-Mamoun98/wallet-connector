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
      to: "Present",
    },
    bullets: [
      "Worked on Hord App, a high-performing Ethereum staking app with over $7 million worth of ETH staked, consistently ranking among the top 3 in APY compared t ocompetitors.",
      "Created highly reusable tools like useContractReader. A function that simplifies dealing with contracts interactions (reads and writes).",
      "Created atomic internal css framework (cover 70% of what tailwind css do",
      "Contributed to company wallet connector mono-repo using lema, supporting multiple wallets and chains (metamask, walletConnect, ledger and more).",
      "Adding support for multi chain (Ethereum, Binance, Arbitrum)",
      "Wrote a set of unit-tests using cypress covering most used components",
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
