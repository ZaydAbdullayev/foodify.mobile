import React, { useState, useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { ApiGetService } from "../../services/api.service";
import { Navbar } from "../../components/navbar/navbar";

import { BsTaxiFrontFill, BsFillStarFill } from "react-icons/bs";
import { MdDeliveryDining } from "react-icons/md";
import pin from "../../components/assets/images/pin.png";

export const Home = () => {
  const [restaurant, setRestaurant] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ApiGetService.fetching("get/restaurants")
      .then((res) => {
        setRestaurant(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const viewShop = (id) => {
    navigate(`/catalog/${id}`);
  };

  return (
    <div className="home_page">
      <div className="header">
        <div className="navigation_panel">
          <label>
            <span>Hozirgi manzil</span>
            <select name="location">
              <option value="cordinate">Do'stlikshox Ko'chasi</option>
            </select>
          </label>
          <button onClick={() => navigate("/map")}>
            <img src={pin} alt="" />
          </button>
        </div>
        <Navbar />
      </div>
      <div className="restaurant_carusel">
        <div className="carusel_item">
          <img
            src="https://restaurantsnapshot.com/wp-content/uploads/2023/02/Best-New-Restaurants-1.jpg"
            alt=""
          />
        </div>
        <div className="carusel_item">
          <img
            src="https://www.touchbistro.com/wp-content/uploads/2021/08/restaurant-interior-design-ideas-thumbnail.jpg"
            alt=""
          />
        </div>
        <div className="carusel_item">
          <img
            src="https://img.freepik.com/premium-photo/3d-rendering-loft-luxury-hotel-reception-vintage-cafe-lounge-restaurant_105762-1102.jpg"
            alt=""
          />
        </div>
        <div className="carusel_item">
          <img
            src="https://prodmypods.azureedge.net/-/media/businessblog/gettyimages-1226046100-2048x1707.jpg?rev=0d0c057269b0494b8e3b1628557f5d35&mw=767&hash=9E225268FC281BF143947C54E23AB6EF"
            alt=""
          />
        </div>
        <div className="carusel_item">
          <img
            src="https://restaurantsnapshot.com/wp-content/uploads/2023/02/Best-New-Restaurants-1.jpg"
            alt=""
          />
        </div>
        <div className="carusel_item">
          <img
            src="https://www.touchbistro.com/wp-content/uploads/2021/08/restaurant-interior-design-ideas-thumbnail.jpg"
            alt=""
          />
        </div>
        <div className="carusel_item">
          <img
            src="https://img.freepik.com/premium-photo/3d-rendering-loft-luxury-hotel-reception-vintage-cafe-lounge-restaurant_105762-1102.jpg"
            alt=""
          />
        </div>
        <div className="carusel_item">
          <img
            src="https://prodmypods.azureedge.net/-/media/businessblog/gettyimages-1226046100-2048x1707.jpg?rev=0d0c057269b0494b8e3b1628557f5d35&mw=767&hash=9E225268FC281BF143947C54E23AB6EF"
            alt=""
          />
        </div>
      </div>
      <div className="restaurant_box">
        {restaurant?.map((shop) => {
          return (
            <figure
              onClick={() => viewShop(shop?.id)}
              key={shop?.id}
              className="restaurant"
            >
              <img src={shop?.img} alt="restoran_img" />
              <label>
                <div>
                  <h1>{shop?.username?.split("_").join(" ")}</h1>
                  <p>
                    <span>
                      <BsFillStarFill
                        style={
                          shop?.rating >= 5
                            ? { color: "#15a302" }
                            : shop?.rating >= 3
                            ? { color: "#fc0" }
                            : { color: "#aaa" }
                        }
                      />{" "}
                      {shop?.rating}{" "}
                      {shop?.rating >= 5
                        ? "Zo'r"
                        : shop?.rating >= 3
                        ? "Yaxshi"
                        : "Baholar kam"}{" "}
                      {shop?.rating >= 5
                        ? "$$$"
                        : shop?.rating >= 3
                        ? "$$"
                        : "$"}
                    </span>{" "}
                    |
                    <span
                      title="Bepul yetkazib berish 10 000 sumdan boshlab istalhan yerga bepul"
                      className="free_delivery"
                    >
                      <MdDeliveryDining />{" "}
                      <span>20 000 so'mdan Bepul yetkazib berish</span>
                    </span>
                  </p>
                </div>
                <span style={{ textAlign: "center" }}>
                  <BsTaxiFrontFill /> {shop?.delivery_time_from} -{" "}
                  {shop?.delivery_time_till} min
                </span>
              </label>
            </figure>
          );
        })}
      </div>
    </div>
  );
};
