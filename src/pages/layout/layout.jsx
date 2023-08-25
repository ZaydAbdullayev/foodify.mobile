import React, { useState, useEffect } from "react";
import "./layout.css";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Cart } from "../cart/cart";
import { menu } from "./menu";
import { useGetCartCountQuery } from "../../services/cart.service";

import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import active from "./active_11.png";

export const Layout = () => {
  const location = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const user = JSON?.parse(localStorage?.getItem("customer")) || null;
  const id = user?.users?.id;
  const { data: count = null } = useGetCartCountQuery(id);

  useEffect(() => setOpen(false), [location]);

  let startY = 0;

  const handleTouchStart = (e) => {
    startY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY;
    if (startY - endY < 100 + "px") {
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
          location === "/all/foods" // ? "navigator food"
            ? "navigator food" // : location === "/all/foods"  // ? "navigator food"
            : location.startsWith("/my/fav/") // ? "navigator fav"
            ? "navigator like" // : location.startsWith("/my/fav/")  //  ? "navigator fav"
            : location.startsWith("/my/profile") //  ? "navigator profil"
            ? "navigator profil" //  : location.startsWith("/my/profile")  //  ? "navigator profil"
            : location === "/my/orders" //  ? "navigator profil"
            ? "navigator profil" //  : location.startsWith("/my/profile")  //  ? "navigator profil"
            : location === `/payment/${location.split("/").pop()}`
            ? "navigator card"
            : "navigator" //  : location.startsWith("/my/profile")  //  ? "navigator profil"
        }
      >
        {menu?.map((menu, index) => {
          return (
            <Link
              to={menu?.ticket ? location : menu?.path}
              key={menu?.id}
              className="label"
            >
              <span
                style={{ position: "relative" }}
                onClick={menu?.ticket && (() => setOpen(!open))}
              >
                {menu?.icon}
                {menu?.ticket && (
                  <span style={count?.innerData ? {} : { display: "none" }}>
                    {count?.innerData}
                  </span>
                )}
              </span>
              <p>{menu?.name}</p>
              <img
                src={active}
                alt=""
                className={
                  location === menu?.path ||
                  (location === `/catalog/${location.split("/").pop()}` &&
                    index === 0) ||
                  (location.startsWith("/map") && index === 0) ||
                  (location.startsWith("/my/fav") && index === 3) ||
                  (location.startsWith("/my/profile") && index === 4) ||
                  (location === "/my/orders" && index === 4) ||
                  (location === `/payment/${location.split("/").pop()}` &&
                    index === 2)
                    ? "navigator_item active_menu"
                    : "navigator_item"
                }
              />
            </Link>
          );
        })}
      </aside>

      <div className={open ? "cart open_cart" : "cart"}>
        <b>
          {open ? (
            <BsChevronCompactDown
              onClick={() => setOpen(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
          ) : (
            <BsChevronCompactUp />
          )}
        </b>
        <Cart setOpen={setOpen} />
      </div>
    </div>
  );
};
