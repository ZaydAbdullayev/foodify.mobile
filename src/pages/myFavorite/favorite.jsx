import React, { useState, useEffect } from "react";
import "./favorite.css";
import { FiStar } from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { ApiGetService } from "../../services/api.service";

export const MyFavorite = () => {
  const user = JSON.parse(localStorage.getItem("customer")) || [];

  const [favorite, setFavorite] = useState(false);
  const id = useParams().id;
  const user_id = user?.id;
  const [shop, setShop] = useState([]);
  console.log(shop);
  useEffect(() => {
    ApiGetService.fetching(`get/favRes/${user_id}`)
      .then((res) => {
        setShop(res?.data?.innerData);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, [user_id]);
  return (
    <div className="my_favorite">
      <div>
        <div className="my_account">
          <div>
            <h1>My Favorite</h1>
            <p>Dashboard</p>
          </div>
          <hr />
          <p>Restaurant</p>
        </div>
        <div className="fovorite_card">
          {shop?.map((item, index) => {
            return (
              <div key={item.username || index}>
                <figure>
                  <img src={item.img} alt="" />
                </figure>
                <p style={{ flex: "1" }}>{item.username}</p>
                <span
                  onClick={() =>
                    setFavorite({
                      id: id,
                      state: true,
                      name: shop.name,
                      user_id: user_id,
                      img: shop.img,
                      rating: favorite,
                    })
                  }
                >
                  {favorite >= 1 && item.id ? <BsStarFill /> : <FiStar />}
                </span>
                <span onClick={() => setFavorite(2)}>
                  {favorite >= 2 && item.id ? <BsStarFill /> : <FiStar />}
                </span>
                <span onClick={() => setFavorite(3)}>
                  {favorite >= 3 && item.id ? <BsStarFill /> : <FiStar />}
                </span>
                <span onClick={() => setFavorite(4)}>
                  {favorite >= 4 && item.id ? <BsStarFill /> : <FiStar />}
                </span>
                <span onClick={() => setFavorite(5)}>
                  {favorite >= 5 && item.id ? <BsStarFill /> : <FiStar />}
                </span>
                <p>===========</p>
                <button>Order</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
