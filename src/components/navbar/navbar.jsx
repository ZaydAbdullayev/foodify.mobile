import React, { useState } from "react";
import "./navbar.css";

import { BiSearch } from "react-icons/bi";
import { LuSettings2 } from "react-icons/lu";

export const Navbar = () => {
  const [search, setSearch] = useState(null);
  console.log(search);

  const handleSearch = (data) => {
    setSearch(data);
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
          onChange={(e) => handleSearch(e?.target?.value)}
        />
        <button type="button">
          <LuSettings2 />
        </button>
      </form>
    </div>
  );
};