import img1 from "src/assets/imgs/hord-app-img-1.png";
import img2 from "src/assets/imgs/hord-app-img-2.png";
import img3 from "src/assets/imgs/hord-app-img-3.png";
import img4 from "src/assets/imgs/hord-app-img-4.png";
import img5 from "src/assets/imgs/hord-app-img-5.png";

export interface IGalleryImg {
  img: string;
  describtion: string;
  title: string;
  link: string;
}

export const galleryImgsList: IGalleryImg[] = [
  {
    img: img3,
    describtion: "Stake ETH app",
    title:"Hord",
    link: "https://app.hord.fi",
  },
  {
    img: img1,
    describtion: "Stake ETH app",
    title:"Hord",
    link: "https://app.hord.fi",
  },
  {
    img: img2,
    describtion: "Stake ETH app",
    title:"Hord",
    link: "https://app.hord.fi",
  },
  {
    img: img4,
    describtion: "Stake ETH app",
    title:"Hord",
    link: "https://app.hord.fi",
  },
  {
    img: img5,
    describtion: "Stake ETH app",
    title:"Hord",
    link: "https://app.hord.fi",
  },
];
