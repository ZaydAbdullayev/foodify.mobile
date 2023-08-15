import React, { useState, useEffect } from "react";
import "./layout.css";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Cart } from "../cart/cart";
import { ApiGetService } from "../../services/api.service";
import { menu } from "./menu";

import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import active from "./active_11.png";

export const Layout = () => {
  const location = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const { id } = JSON.parse(localStorage.getItem("customer"))?.users || null;

  // useEffect(() => {
  //   ApiGetService.fetching(`cart/count/products/${id}`)
  //     .then((res) => setCount(res?.data))
  //     .catch((err) => console.log(err));
  // }, [id]);

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
            : location === "/my/favourite"
            ? "navigator like"
            : location === "/my/profile"
            ? "navigator profil"
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
                  <span style={count === 0 ? { display: "none" } : {}}>
                    {count}
                  </span>
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
        {open ? (
          <BsChevronCompactDown onClick={() => setOpen(false)} />
        ) : (
          <BsChevronCompactUp />
        )}
        <Cart setOpen={setOpen} />
      </div>
    </div>
  );
};
