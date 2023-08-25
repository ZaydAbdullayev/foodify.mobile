import React from "react";
import "./profil.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../services/user.service";

import delivery from "./old delivery.png";
import order from "./takeaway-food-icon.png";
import favourite from "./favorite food.png";
import default_img from "../../components/assets/images/default-img.png";
import { HiGift } from "react-icons/hi";
import { IoIosCar, IoIosPeople } from "react-icons/io";
import { MdAddHomeWork, MdHelp } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";

export const MyProfil = () => {
  const customer = JSON?.parse(localStorage?.getItem("customer")) || null;
  const id = customer?.users?.id;
  const navigate = useNavigate();
  const { data: users = [] } = useGetUserQuery(id);

  const logout = () => {
    localStorage.removeItem("customer");
    window.location.reload();
  };

  return (
    <div className="my_profil">
      <div className="user_info">
        <h1 style={{ textTransform: "capitalize" }}>
          {users?.innerData?.username || "Username"}
        </h1>
        <img src={default_img} alt="images" />
      </div>

      <div className="short_path">
        <figure onClick={() => navigate("/my/fav/food")}>
          <img src={favourite} alt="favourite" />
          <span>Sevimli ovqatlar</span>
        </figure>
        <figure onClick={() => navigate("/my/orders")}>
          <img src={delivery} alt="favourite" />
          <span>Buyurtmalarim</span>
        </figure>
        <figure onClick={() => navigate("/all/foods")}>
          <img src={order} alt="favourite" />
          <span>Buyurtma berish</span>
        </figure>
      </div>

      <div className="user_menu">
        {menu?.map((menu, index) => {
          return (
            <Link to={menu.path} key={index}>
              <span>{menu.icon}</span>
              {menu.name}
            </Link>
          );
        })}
        <button onClick={logout}>
          <span>
            <CgLogOut />
          </span>{" "}
          Hisobdan chiqish
        </button>
      </div>
    </div>
  );
};

const menu = [
  {
    name: "Sovg'a yuborish",
    path: "send/gift",
    icon: <HiGift />,
  },
  {
    name: "Yetkazish xizmati",
    path: "delivery",
    icon: <IoIosCar />,
  },
  {
    name: "Oilaviy",
    path: "my/family",
    icon: <IoIosPeople />,
  },
  {
    name: "Ish xona",
    path: "work",
    icon: <MdAddHomeWork />,
  },
  {
    name: "Yordam",
    path: "help",
    icon: <MdHelp />,
  },
];
