import img1 from "src/assets/imgs/hord-app-img-1.png";
import img2 from "src/assets/imgs/hord-app-img-2.png";
import img3 from "src/assets/imgs/hord-app-img-3.png";
import img4 from "src/assets/imgs/hord-app-img-4.png";
import img5 from "src/assets/imgs/hord-app-img-5.png";
import img6 from "src/assets/imgs/tokensfarm-1.png";
import img7 from "src/assets/imgs/tokensfarm-2.png";

export interface IGalleryImg {
  img: string;
  describtion: string;
  title: string;
  link: string;
}

export const galleryImgsList: IGalleryImg[] = [
  {
    img: img3,
    describtion: "Stake ETH",
    title: "Hord",
    link: "https://app.hord.fi",
  },
  {
    img: img1,
    describtion: "Portfolio",
    title: "Hord",
    link: "https://app.hord.fi",
  },
  {
    img: img2,
    describtion: "Validators",
    title: "Hord",
    link: "https://app.hord.fi",
  },
  {
    img: img4,
    describtion: "Pool stats",
    title: "Hord",
    link: "https://app.hord.fi",
  },
  {
    img: img5,
    describtion: "Transactions history",
    title: "Hord",
    link: "https://app.hord.fi",
  },
  {
    img: img6,
    describtion: "Home page",
    title: "Tokens Farm",
    link: "https://tokensfarm.com/",
  },
  {
    img: img7,
    describtion: "Stats",
    title: "Tokens Farm",
    link: "https://tokensfarm.com/",
  },
];
