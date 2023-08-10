import React, { useState } from "react";
import "./layout.css";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Cart } from "../cart/cart";

import { GoHomeFill } from "react-icons/go";
import { ImSpoonKnife } from "react-icons/im";
import { MdOutlineFavorite } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

export const Layout = () => {
  const location = useLocation().pathname;
  const [open, setOpen] = useState(false);
  let startY = 0;

  const handleTouchStart = (e) => {
    startY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    if (startY - endY < 80) {
      setOpen(false);
    }
  };

  return (
    <div className="layout">
      <main>
        <Outlet />
      </main>
      <aside>
        {menu.map((menu) => {
          return (
            <Link
              to={menu.ticket ? location : menu.path}
              key={menu.id}
              className={location === menu.path ? "label location" : "label"}
            >
              <span
                style={{ position: "relative" }}
                onClick={menu.ticket && (() => setOpen(!open))}
              >
                {menu.icon}
                {menu.ticket && <span>3</span>}
              </span>
              <p>{menu.name}</p>
            </Link>
          );
        })}
      </aside>

      <div
        className={open ? "cart open_cart" : "cart"}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {open ? (
          <BsChevronCompactDown onClick={() => setOpen(false)} />
        ) : (
          <BsChevronCompactUp />
        )}
        <Cart />
      </div>
    </div>
  );
};

const menu = [
  {
    id: 2345,
    name: "Home",
    path: "/",
    icon: <GoHomeFill />,
  },
  {
    id: 6453,
    name: "Food",
    path: "/foods",
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
    path: "/fovorite",
    icon: <MdOutlineFavorite />,
  },
  {
    id: 9876,
    name: "Profil",
    path: "/profile",
    icon: <FaUser />,
  },
];
