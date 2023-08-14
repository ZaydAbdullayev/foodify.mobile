import React, { useEffect, useState } from "react";
import "./profil.css";
import { ApiGetService } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import delivery from "./old delivery.png";
import order from "./takeaway-food-icon.png";
import favourite from "./favorite food.png";
import default_img from "../../components/assets/images/default-img.png";
import { HiGift } from "react-icons/hi";
import { IoIosCar, IoIosPeople } from "react-icons/io";
import { MdAddHomeWork, MdHelp } from "react-icons/md";

export const MyProfil = () => {
  const { id } = JSON.parse(localStorage.getItem("customer")).users || null;
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ApiGetService.fetching(`get/user/${id}`)
      .then((res) => {
        setUser(res?.data?.innerData);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="my_profil">
      <div className="user_info">
        <h1 style={{ textTransform: "capitalize" }}>
          {users?.username || "Username"}
        </h1>
        <img src={default_img} alt="images" />
      </div>

      <div className="short_path">
        <figure onClick={() => navigate("/my/favourite")}>
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
        {menu.map((menu, index) => {
          return (
            <Link to={menu.path} key={index}>
              <span>{menu.icon}</span>
              {menu.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const menu = [
  {
    name: "Sovg'a yuborish",
    path: "/send/gift",
    icon: <HiGift />,
  },
  {
    name: "Yetkazish xizmati",
    path: "/delivery",
    icon: <IoIosCar />,
  },
  {
    name: "Oilaviy",
    path: "/my/family",
    icon: <IoIosPeople />,
  },
  {
    name: "Ish xona",
    path: "/send/gift",
    icon: <MdAddHomeWork />,
  },
  {
    name: "Yordam",
    path: "/help",
    icon: <MdHelp />,
  },
];
