import React, { useState, useEffect } from "react";
import "./foods.css";
import { ApiGetService } from "../../services/api.service";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";

export const Foods = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const totalProductCount = products?.reduce((count) => {
    return count + 1;
  }, 0);

  useEffect(() => filterCategory(), []);

  const filterCategory = (name) => {
    const category = name ? name : "all";
    ApiGetService.fetching(`filter/byCategory/${category}`)
      .then((res) => {
        setProducts(res?.data?.innerData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="foods_box">
      <h1>Foods</h1>
      <div className="category">
        {category?.map((category) => {
          return (
            <p
              key={category?.id}
              onClick={() => filterCategory(category?.name)}
            >
              {category?.img && <img src={category?.img} alt="images" />}
              {category?.visibility ? category?.visibility : category?.name}
            </p>
          );
        })}
      </div>

      <div className="food_body">
        <h1>
          Topligan mahsulotlar:{" "}
          {totalProductCount === 300 ? "300+" : totalProductCount}
        </h1>
        {products?.map((item) => {
          return (
            <figure
              className="food_body_item"
              key={item?.id}
              onClick={() => navigate(`/catalog/${item?.restaurant}#lavash`)}
            >
              <img src={item?.img} alt="" />
              <figcaption>
                <pre>
                  <p>{item?.name}</p>
                  <NumericFormat
                    displayType="text"
                    value={item?.price}
                    suffix=" sum"
                    thousandSeparator=" "
                  />
                  <p>15-20 min</p>
                </pre>
                <span style={item?.raiting ? {} : { display: "none" }}>
                  {item?.raiting}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
};

const category = [
  {
    id: 98765,
    name: "all",
    visibility: "Barchasi",
  },
  {
    id: 34567,
    name: "fast food",
    img: require("./assets/fastfood.png"),
  },
  {
    id: 76543,
    name: "ichimliklar",
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
