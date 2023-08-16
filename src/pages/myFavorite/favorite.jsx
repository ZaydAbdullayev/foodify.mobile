import React, { useState, useEffect } from "react";
import "./favorite.css";
import { FiStar } from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ApiGetService, ApiUpdateService } from "../../services/api.service";

export const MyFavorite = () => {
  const user = JSON?.parse(localStorage?.getItem("customer")) || [];
  const id = user?.users?.id;
  const navigate = useNavigate();
  const [shop, setShop] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    ApiGetService.fetching(`get/favRes/${id}`)
      .then((res) => {
        setShop(res?.data?.innerData);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, [id, update]);

  const giveRaiting = (data) => {
    ApiUpdateService.fetching(`update/favRes/${id}/${data?.id}`, {
      state: data?.state,
    })
      .then((res) => {
        setUpdate(!update);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="my_favorite">
      <h1>Men yoqtirgan restoranlar</h1>
      <div className="fovorite_card">
        {shop?.map((item) => {
          return (
            <div key={item?.id} className="fovorite_item">
              <figure>
                <img src={item?.img} alt="" />
              </figure>
              <div className="res_raiting">
                <p style={{ flex: "1" }}>{item?.username}</p>
                <div className="give_raiting">
                  <span
                    onClick={() => giveRaiting({ id: item?.id, state: 1 })}
                    style={item?.state >= 1 ? { color: "#fc0" } : {}}
                  >
                    {item?.state >= 1 ? <BsStarFill /> : <FiStar />}
                  </span>
                  <span
                    onClick={() => giveRaiting({ id: item?.id, state: 2 })}
                    style={item?.state >= 2 ? { color: "#fc0" } : {}}
                  >
                    {item?.state >= 2 ? <BsStarFill /> : <FiStar />}
                  </span>
                  <span
                    onClick={() => giveRaiting({ id: item?.id, state: 3 })}
                    style={item?.state >= 3 ? { color: "#fc0" } : {}}
                  >
                    {item?.state >= 3 ? <BsStarFill /> : <FiStar />}
                  </span>
                  <span
                    onClick={() => giveRaiting({ id: item?.id, state: 4 })}
                    style={item?.state >= 4 ? { color: "#fc0" } : {}}
                  >
                    {item?.state >= 4 ? <BsStarFill /> : <FiStar />}
                  </span>
                  <span
                    onClick={() => giveRaiting({ id: item?.id, state: 5 })}
                    style={item?.state >= 5 ? { color: "#fc0" } : {}}
                  >
                    {item?.state >= 5 ? <BsStarFill /> : <FiStar />}
                  </span>
                </div>
              </div>
              <p id="none">=======</p>
              <button onClick={() => navigate(`/catalog/${item?.id}`)}>
                Buyurtma
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
