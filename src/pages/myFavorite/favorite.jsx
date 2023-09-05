import React from "react";
import "./favorite.css";
import { FiStar } from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  useGetFavResQuery,
  useUpdateFavResMutation,
} from "../../services/fav.service";
import { enqueueSnackbar as es } from "notistack";
import { ImgService } from "../../services/image.service";

export const MyFavorite = () => {
  const user = JSON?.parse(localStorage?.getItem("customer")) || [];
  const id = user?.users?.id;
  const navigate = useNavigate();
  const { data: shop = [] } = useGetFavResQuery(id);
  const [updateFavRes] = useUpdateFavResMutation();

  const giveRaiting = async (raiting) => {
    const rdata = {
      raiting: raiting?.state,
      id: raiting?.id,
      user_id: id,
    };
    const { data } = await updateFavRes(rdata);
    if (data) return es("Bahoyingiz uchun rahmat!!!", { variant: "success" });
  };

  return (
    <div className="my_favorite animate__animated animate__fadeIn">
      <h1>Men yoqtirgan restoranlar</h1>
      <div className="fovorite_card">
        {shop?.innerData?.map((item) => {
          return (
            <div key={item?.id} className="fovorite_item">
              <figure>
                <ImgService src={item?.img} fallbackSrcRes alt="" />
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
