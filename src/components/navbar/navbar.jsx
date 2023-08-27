import React, { memo, useState } from "react";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { acSearch } from "../../redux/search";
import { acToggleModal } from "../../redux/modal";
import { sortData, priceFrom, priceTo } from "./filter";

import { BiSearch, BiX } from "react-icons/bi";
import { LuSettings2 } from "react-icons/lu";

export const Navbar = memo(() => {
  const dispatch = useDispatch();

  const handleSearch = (data) => {
    dispatch(acSearch(data));
  };
  const handleOpen = () => {
    dispatch(acToggleModal());
  };

  return (
    <div
      className="navbar_box"
      style={{ position: "sticky", top: "0", left: "0" }}
    >
      <form>
        <BiSearch />
        <input
          type="search"
          name="search"
          placeholder="Mahsulot qidirish"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button type="button" onClick={handleOpen}>
          <LuSettings2 />
        </button>
      </form>
    </div>
  );
});

export const QuecklyFilter = () => {
  const dispatch = useDispatch();
  const toggleOpen = useSelector((state) => state.modal);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const handleClose = () => {
    dispatch(acToggleModal());
  };

  const filterByData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <form
      className={toggleOpen ? "filter_modal open_filter_modal" : "filter_modal"}
      onSubmit={filterByData}
    >
      <div className="filter_header">
        <p>Filterlash uchun tanlang</p>
        <span onClick={handleClose}>
          <BiX />
        </span>
      </div>
      <div className="filter_body">
        <div className="filter_item_first">
          <h3>Saralash</h3>
          {sortData.map((item) => (
            <label key={item.id}>
              <span>
                {item.icon} {item.name}
              </span>
              <input type="radio" value={item.value} name="sort" />
            </label>
          ))}
        </div>
        <div className="filter_item_second">
          <h3>Narx bo'yicha</h3>
          <p>dan:</p>
          {priceFrom.map((item) => {
            return (
              <label
                key={item.id}
                className={from === item.id ? "active" : ""}
                onClick={() => setFrom(item.id)}
              >
                <span>{item.name}</span>
                <input type="radio" value={item.value} name="from" />
              </label>
            );
          })}
          <p>gacha:</p>
          {priceTo.map((item) => {
            return (
              <label
                key={item.id}
                className={to === item.id ? "active" : ""}
                onClick={() => setTo(item.id)}
              >
                <span>{item.name}</span>
                <input type="radio" value={item.value} name="to" />
              </label>
            );
          })}
        </div>
      </div>
      <div>
        <button className="filter_btn">Filterlash</button>
      </div>
    </form>
  );
};

//  <label
//     className={active.find((item) => "price1") ? "active" : ""}
//     onChange={(e) => setFrom((prev) => [...prev, e.target.value])}
//   >
//     <span>$</span>
//     <input type="checkbox" value="$" name="price1" />
//   </label>
//   <label>
//     <span>$$</span>
//     <input type="checkbox" value="$$" name="price2" />
//   </label>
//   <label>
//     <span>$$$</span>
//     <input type="checkbox" value="$$$" name="price3" />
//   </label>
//   <label>
//     <span>$$$$</span>
//     <input type="checkbox" value="$$$$" name="price4" />
//   </label>
//   <label>
//     <span>$$$$$</span>
//     <input type="checkbox" value="$$$$$" name="price5" />
//   </label>
