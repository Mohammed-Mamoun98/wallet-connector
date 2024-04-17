export interface IExperience {
  position: string;
  company: string;
  date: {
    from: number;
    to: number;
  };
}

export const experiencesList: IExperience[] = [
  {
    company: "Dcentralab",
    position: "Senior Frontend Engineer",
    date: {
      from: 2021,
      to: 2023,
    },
  },
  {
    company: "Taaspoint",
    position: "Frontend Engineer",
    date: {
      from: 2020,
      to: 2021,
    },
  },
  {
    company: "Hemma Portal",
    position: "Frontend Engineer",
    date: {
      from: 2020,
      to: 2021,
    },
  },
];
