import React, { useState, useEffect } from "react";
import "./layout.css";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Cart } from "../cart/cart";
import { ApiGetService } from "../../services/api.service";
import { menu } from "./menu";
import { useSelector } from "react-redux";

import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import active from "./active_11.png";

export const Layout = () => {
  const location = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const user = JSON?.parse(localStorage?.getItem("customer")) || null;
  const id = user?.users?.id;
  const updateCard = useSelector((state) => state.updateCard);

  useEffect(() => {
    ApiGetService.fetching(`cart/count/products/${id}`)
      .then((res) => setCount(res?.data?.innerData))
      .catch((err) => console.log(err));
  }, [id, updateCard]);

  useEffect(() => setOpen(false), [location]);

  let startY = 0;

  const handleTouchStart = (e) => {
    startY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    if (startY - endY < 150 + "px") {
      setOpen(false);
    }
  };

  return (
    <div className="layout">
      <main>
        <Outlet />
      </main>
      <aside
        className={
          location === "/all/foods"
            ? "navigator food"
            : location.startsWith("/my/fav/") // ? "navigator fav"
            ? "navigator like" // : location.startsWith("/my/fav/")  //  ? "navigator fav"
            : location.startsWith("/my/profile") //  ? "navigator profil"
            ? "navigator profil"
            : "navigator"
        }
      >
        {menu?.map((menuItem, index) => (
          <Link
            to={menuItem?.ticket ? location : menuItem?.path}
            key={menuItem?.id}
            className="label"
          >
            <span
              style={{ position: "relative" }}
              onClick={menuItem?.ticket && (() => setOpen(!open))}
            >
              {menuItem?.icon}
              {menuItem?.ticket && (
                <span style={count ? {} : { display: "none" }}>{count}</span>
              )}
            </span>
            <p>{menuItem?.name}</p>
            <img
              src={active}
              alt=""
              className={
                location === menuItem?.path
                  ? "navigator_item active_menu"
                  : "navigator_item"
              }
            />
          </Link>
        ))}
      </aside>

      <div className={open ? "cart open_cart" : "cart"}>
        <b onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {open ? (
            <BsChevronCompactDown onClick={() => setOpen(false)} />
          ) : (
            <BsChevronCompactUp />
          )}
        </b>
        <Cart />
      </div>
    </div>
  );
};
