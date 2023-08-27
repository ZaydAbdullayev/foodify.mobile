import { BsFillPatchCheckFill, BsStarFill } from "react-icons/bs";
import { GiFire } from "react-icons/gi";
import { BiSolidTimeFive } from "react-icons/bi";

export const sortData = [
  {
    id: 1,
    name: "Tavsiya etiladiganlar",
    value: "default",
    icon: <BsFillPatchCheckFill />,
  },
  {
    id: 2,
    name: "Eng mashhurlar",
    value: "popular",
    icon: <GiFire />,
  },
  {
    id: 3,
    name: "Yuqori reytingdagilar",
    value: "raiting",
    icon: <BsStarFill />,
  },
  {
    id: 4,
    name: "Tez yetkazib berish",
    value: "delivery",
    icon: <BiSolidTimeFive />,
  },
];

export const priceFrom = [
  {
    id: 32,
    name: "$",
    value: "$",
  },
  {
    id: 33,
    name: "$$",
    value: "$$",
  },
  {
    id: 34,
    name: "$$$",
    value: "$$$",
  },

  {
    id: 35,
    name: "$$$$",
    value: "$$$$",
  },
];

export const priceTo = [
  {
    id: 36,
    name: "$",
    value: "$",
  },
  {
    id: 37,
    name: "$$",
    value: "$$",
  },
  {
    id: 38,
    name: "$$$",
    value: "$$$",
  },
  {
    id: 39,
    name: "$$$$",
    value: "$$$$",
  },
];
