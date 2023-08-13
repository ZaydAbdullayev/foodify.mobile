import React, { useState } from "react";
import "./foods.css";
import { ApiGetService } from "../../services/api.service";
import { NumericFormat } from "react-number-format";

export const Foods = () => {
  const [products, setProducts] = useState([]);

  const totalProductCount = products.reduce((count) => {
    return count + 1;
  }, 0);

  const filterCategory = (name) => {
    ApiGetService.fetching(`filter/byCategory/${name}`)
      .then((res) => {
        setProducts(res?.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="foods_box">
      <h1>Foods</h1>
      <div className="category">
        {category.map((category) => {
          return (
            <p key={category.id} onClick={() => filterCategory(category.name)}>
              {category.img && <img src={category.img} alt="images" />}
              {category.visibility ? category.visibility : category.name}
            </p>
          );
        })}
      </div>

      <div className="food_body">
        <h1>Topligan mahsulotlar: {totalProductCount }100 ta</h1>
        {data.map((item) => {
          return (
            <figure className="food_body_item" key={item.id}>
              <img src={item?.img} alt="" />
              <figcaption>
                <pre>
                  <p>{item.name}</p>
                  <NumericFormat
                    displayType="text"
                    value={item.price}
                    suffix=" sum"
                    thousandSeparator=" "
                  />
                  <p>15-20 min</p>
                </pre>
                <span>4.6</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
};

const data = [
  {
    id: "gh6543",
    name: "shashlik",
    price: "23400",
    description: "go'shtli",
    quantity: 1,
    status: 1,
    restaurant: "fv567h",
  },
  {
    id: "gh6543",
    name: "shashlik",
    price: "23400",
    description: "go'shtli",
    quantity: 1,
    status: 1,
    restaurant: "fv567h",
  },
  {
    id: "gh6543",
    name: "shashlik",
    price: "23400",
    description: "go'shtli",
    quantity: 1,
    status: 1,
    restaurant: "fv567h",
  },
  {
    id: "gh6543",
    name: "shashlik",
    price: "23400",
    description: "go'shtli",
    quantity: 1,
    status: 1,
    restaurant: "fv567h",
  },
  {
    id: "gh6543",
    name: "shashlik",
    price: "23400",
    description: "go'shtli",
    quantity: 1,
    status: 1,
    restaurant: "fv567h",
  },
  {
    id: "gh6543",
    name: "shashlik",
    price: "23400",
    description: "go'shtli",
    quantity: 1,
    status: 1,
    restaurant: "fv567h",
  },
  {
    id: "gh6543",
    name: "shashlik",
    price: "23400",
    description: "go'shtli",
    quantity: 1,
    status: 1,
    restaurant: "fv567h",
  },
  {
    id: "gh6543",
    name: "shashlik",
    price: "23400",
    description: "go'shtli",
    quantity: 1,
    status: 1,
    restaurant: "fv567h",
  },
  {
    id: "gh6543",
    name: "shashlik",
    price: "23400",
    description: "go'shtli",
    quantity: 1,
    status: 1,
    restaurant: "fv567h",
  },
  {
    id: "gh6543",
    name: "shashlik",
    price: "23400",
    description: "go'shtli",
    quantity: 1,
    status: 1,
    restaurant: "fv567h",
  },
  {
    id: "gh6543",
    name: "shashlik",
    price: "23400",
    description: "go'shtli",
    quantity: 1,
    status: 1,
    restaurant: "fv567h",
  },
  {
    id: "gh6543",
    name: "shashlik",
    price: "23400",
    description: "go'shtli",
    quantity: 1,
    status: 1,
    restaurant: "fv567h",
  },
  {
    id: "gh6543",
    name: "shashlik",
    price: "23400",
    description: "go'shtli",
    quantity: 1,
    status: 1,
    restaurant: "fv567h",
  },
  {
    id: "gh6543",
    name: "shashlik",
    price: "23400",
    description: "go'shtli",
    quantity: 1,
    status: 1,
    restaurant: "fv567h",
  },
];

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
