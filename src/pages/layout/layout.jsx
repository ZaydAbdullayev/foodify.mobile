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
  const { id } = JSON.parse(localStorage.getItem("customer"))?.users || null;
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
            : location.startsWith("/my/fav/")
            ? "navigator like"
            : location.startsWith("/my/profile")
            ? "navigator profil"
            : location === "/catalog/:id"
            ? "navigator"
            : "navigator"
        }
      >
        {menu.map((menu) => {
          return (
            <Link
              to={menu.ticket ? location : menu.path}
              key={menu.id}
              className="label"
            >
              <span
                style={{ position: "relative" }}
                onClick={menu.ticket && (() => setOpen(!open))}
              >
                {menu.icon}
                {menu.ticket && (
                  <span style={count ? {} : { display: "none" }}>{count}</span>
                )}
              </span>
              <p>{menu.name}</p>
              <img
                src={active}
                alt=""
                className={
                  location === menu.path
                    ? "navigator_item  active_menu"
                    : "navigator_item"
                }
              />
            </Link>
          );
        })}
      </aside>

      <div
        className={open ? "cart open_cart" : "cart"}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <b>
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
