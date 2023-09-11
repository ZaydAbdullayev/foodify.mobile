import { GoHomeFill } from "react-icons/go";
import { ImSpoonKnife } from "react-icons/im";
import { MdOutlineFavorite } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";

const { token } = JSON?.parse(localStorage?.getItem("customer")) || false;
export const menu = [
  {
    id: 2345,
    name: "Home",
    path: "/",
    icon: <GoHomeFill />,
  },
  {
    id: 6453,
    name: "Food",
    path: "/all/foods",
    icon: <ImSpoonKnife />,
  },
  {
    id: 2225,
    name: "Savat",
    path: "",
    icon: <TiShoppingCart />,
    ticket: true,
  },
  {
    id: 6535,
    name: "Yoqtirganlar",
    path: "/my/fav/res",
    icon: <MdOutlineFavorite />,
  },
  {
    id: 9876,
    name: "Profil",
    path: token ? "/my/profile" : "/signin",
    icon: <FaUser />,
    check: true,
  },
];

export const getNavigatorClass = (location) => {
  if (location === "/all/foods") return "navigator food";
  if (location.startsWith("/my/fav/")) return "navigator like";
  if (location.startsWith("/my/profile") || location === "/my/orders")
    return "navigator profil";
  if (location.startsWith(`/payment/${location.split("/").pop()}`))
    return "navigator card";
  return "navigator";
};

export const getNavigatorItemClass = (location, path, index) => {
  if (
    location === path ||
    (location === `/catalog/${location.split("/").pop()}` && index === 0) ||
    (location.startsWith("/map") && index === 0) ||
    (location.startsWith("/my/fav") && index === 3) ||
    (location.startsWith("/my/profile") && index === 4) ||
    (location === "/my/orders" && index === 4) ||
    (location === `/payment/${location.split("/").pop()}` && index === 2)
  ) {
    return "navigator_item active_menu";
  }
  return "navigator_item";
};