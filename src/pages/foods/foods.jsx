import React from "react";
import "./foods.css";
import { Link, useLocation } from "react-router-dom";

export const Foods = () => {
  const { search } = useLocation();

  const ct = search && search.split("=");

  return (
    <div className="foods_box">
      <h1>Foods</h1>
      <div className="category">
        {category.map((category) => {
          return (
            <Link to={`?q/category=${category.name}`} key={category.id}>
              <img src={category.img} alt="images" />
              {category.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const category = [
  {
    id: 34567,
    name: "fast food",
    img: require("./assets/fastfood.png"),
  },
  {
    id: 76543,
    name: "coffee",
    img: require("./assets/coffee-cup-26.png"),
  },
  {
    id: 23454,
    name: "lavash",
    img: require("./assets/lavash.png"),
  },
  {
    id: 23554,
    name: "salad",
    img: require("./assets/salad.png"),
  },
  {
    id: 65443,
    name: "pizza",
    img: require("./assets/pizza.png"),
  },
  {
    id: 23453,
    name: "steyk",
    img: require("./assets/steyk.png"),
  },
  {
    id: 23456,
    name: "kebab",
    img: require("./assets/kebab.png"),
  },
];
