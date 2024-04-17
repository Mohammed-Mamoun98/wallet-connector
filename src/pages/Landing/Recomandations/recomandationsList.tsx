const miljanImgLink =
  "https://media.licdn.com/dms/image/D4D03AQGlE_5jOP0…eta&t=9b6jFtGyx7frWsc9rgblPp0NjhOOEvZghpemjmLucj0";

const meirImgLink =
  "https://media.licdn.com/dms/image/C4D03AQEe8rWd3nn…eta&t=ckiUgXvaTCIm6CzsgiO5V--oKDWJSkK43sItXUQgm_0";

const liamLink =
  "https://media.licdn.com/dms/image/D4E35AQGhuQn_Vzj…eta&t=LLpM4gAyZfFownplFQLCpmABun8wVfexy3lNhFl4L8I";

export interface IRecomandation {
  text: string;
  giver: {
    name: string;
    linkedinImg: string;
    role: string;
    linkedinLink: string;
  };
}

export const recomandationsList: IRecomandation[] = [
  {
    text: "Mo is a versatile frontend developer who's desire to learn and constantly advance his skills greatly improved our workflow and product. He’s an extremely hard worker, and would be a great fit in any web3 team.",
    giver: {
      name: "Meir Rosenschein",
      linkedinImg:
        "https://media.licdn.com/dms/image/C4D03AQEe8rWd3nnh3Q/profile-displayphoto-shrink_100_100/0/1653299631464?e=1718236800&v=beta&t=ckiUgXvaTCIm6CzsgiO5V--oKDWJSkK43sItXUQgm_0",
      role: "Director of Product at Hord",
      linkedinLink: "https://www.linkedin.com/in/meir-rosenschein/",
    },
  },
  {
    text: "I had the pleasure of working with Mohammed as a frontend developer in React at Hord. He consistently impressed me with his exceptional skills and dedication. Mohammed is a talented developer who excels in translating design mockups into responsive and dynamic user interfaces.He is a great team player and valuable asset to any team. I highly recommend him for any frontend development role.",
    giver: {
      name: "Miljan Rakita",
      linkedinImg:
        "https://media.licdn.com/dms/image/D4D03AQGlE_5jOP0a-w/profile-displayphoto-shrink_100_100/0/1708428640291?e=1718236800&v=beta&t=9b6jFtGyx7frWsc9rgblPp0NjhOOEvZghpemjmLucj0",
      role: "Backend Team Lead at NIMA",
      linkedinLink: "https://www.linkedin.com/in/miljan-rakita-9b782213b/",
    },
  },
  {
    text: "Working with Mohammed at Hord as fellow frontend developers was a great experience. He was not just skilled in React, but also one of the hardest workers I've known. Mohammed often stayed longer hours and worked through many weekends, showing true dedication to our projects.\n What I really appreciated was his readiness to lend a hand whenever I was stuck or just needed a second pair of eyes on my code. His guidance on complex React concepts was invaluable",
    giver: {
      name: "Liam Sutton",
      linkedinImg:
        "https://media.licdn.com/dms/image/D4E35AQGhuQn_Vzj4nQ/profile-framedphoto-shrink_100_100/0/1676547464039?e=1713956400&v=beta&t=-9z7Y-xChgBxxbacVM-hs9XgqzMXXOSjU5JHE09kfnQ",
      role: "Full Stack Engineer at Chain Detective",
      linkedinLink: "https://www.linkedin.com/in/liam-sutton90/",
    },
  },
];
