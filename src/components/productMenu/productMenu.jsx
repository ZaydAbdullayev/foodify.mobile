import React, { memo } from "react";
import "./productMenu.css";

export function ProductMenu(props) {
  return (
    <div className="food_menu">
      <ul>{props.children}</ul>
    </div>
  );
}

export default memo(ProductMenu);
