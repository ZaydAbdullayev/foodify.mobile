import React, { useState, useEffect } from "react";
import "./favorite.css";
import { FiStar } from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { ApiGetService } from "../../services/api.service";

export const MyFavorite = () => {
  const { id } = JSON.parse(localStorage.getItem("customer")).users || [];
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const shop_id = useParams().id;
  const [shop, setShop] = useState([]);

  useEffect(() => {
    ApiGetService.fetching(`get/favRes/${id}`)
      .then((res) => {
        setShop(res?.data?.innerData);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="my_favorite">
      <h1>Men yoqtirgan restoranlar</h1>
      <div className="fovorite_card">
        {shop?.map((item) => {
          return (
            <div key={item.id} className="fovorite_item">
              <figure>
                <img src={item.img} alt="" />
              </figure>
              <p style={{ flex: "1" }}>{item.username}</p>
              <div className="give_raiting">
                <span
                  onClick={() =>
                    setFavorite({
                      id: shop_id,
                      state: true,
                      name: shop.name,
                      user_id: id,
                      img: shop.img,
                      rating: favorite,
                    })
                  }
                  style={
                    favorite.status >= 1 && favorite.id === item.id
                      ? { color: "#fc0" }
                      : {}
                  }
                >
                  {favorite.status >= 1 && favorite.id === item.id ? (
                    <BsStarFill />
                  ) : (
                    <FiStar />
                  )}
                </span>
                <span
                  onClick={() => setFavorite({ id: item.id, status: 2 })}
                  style={
                    favorite.status >= 2 && favorite.id === item.id
                      ? { color: "#fc0" }
                      : {}
                  }
                >
                  {favorite.status >= 2 && favorite.id === item.id ? (
                    <BsStarFill />
                  ) : (
                    <FiStar />
                  )}
                </span>
                <span
                  onClick={() => setFavorite({ id: item.id, status: 3 })}
                  style={
                    favorite.status >= 3 && favorite.id === item.id
                      ? { color: "#fc0" }
                      : {}
                  }
                >
                  {favorite.status >= 3 && favorite.id === item.id ? (
                    <BsStarFill />
                  ) : (
                    <FiStar />
                  )}
                </span>
                <span
                  onClick={() => setFavorite({ id: item.id, status: 4 })}
                  style={
                    favorite.status >= 4 && favorite.id === item.id
                      ? { color: "#fc0" }
                      : {}
                  }
                >
                  {favorite.status >= 4 && favorite.id === item.id ? (
                    <BsStarFill />
                  ) : (
                    <FiStar />
                  )}
                </span>
                <span
                  onClick={() => setFavorite({ id: item.id, status: 5 })}
                  style={
                    favorite.status >= 5 && favorite.id === item.id
                      ? { color: "#fc0" }
                      : {}
                  }
                >
                  {favorite.status >= 5 && favorite.id === item.id ? (
                    <BsStarFill />
                  ) : (
                    <FiStar />
                  )}
                </span>
              </div>
              <p>=======</p>
              <button onClick={() => navigate(`/catalog/${item.id}`)}>
                Buyurtma
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const data = [
  {
    id: "gf45tfd",
    img: "",
    username: "Oqtepa Lavash",
  },
  {
    id: "jyhtrge3",
    img: "",
    username: "Oqtepa Lavash",
  },
  {
    id: "gf45tfd",
    img: "",
    username: "Oqtepa Lavash",
  },

  {
    id: "gf45tfd",
    img: "",
    username: "Oqtepa Lavash",
  },
  {
    id: "gf45tfd",
    img: "",
    username: "Oqtepa Lavash",
  },
  {
    id: "gf45tfd",
    img: "",
    username: "Oqtepa Lavash",
  },
];
