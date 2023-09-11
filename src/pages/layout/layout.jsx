import React, { useState, useEffect } from "react";
import "./layout.css";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Cart } from "../cart/cart";
import { menu, getNavigatorItemClass, getNavigatorClass } from "./menu";
import { QuecklyFilter } from "../../components/navbar/navbar";
import { useGetCartCountQuery } from "../../services/cart.service";
import { Message } from "../../components/nothification/message";

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
      {/* =========== show all section what place =============== */}
      <main>
        <Outlet />
      </main>

      {/* =========== navugation panel for user ============= */}
      <aside className={getNavigatorClass(location)}>
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
                className={getNavigatorItemClass(location, menu.path, index)}
              />
            </Link>
          );
        })}
      </aside>

      {/* ================ cart section ============== */}
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

      {/* =============== filter product and restaurant section ============ */}
      <QuecklyFilter />

      {/* =============== message section ============ */}
      <Message />
    </div>
  );
};
