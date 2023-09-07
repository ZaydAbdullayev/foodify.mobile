import React, { useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar/navbar";
import { useSelector } from "react-redux";
import {
  useGetAllRestaurantQuery,
  useGetPopularResQuery,
} from "../../services/product.service";
import { ImgService } from "../../services/image.service";

import { BsTaxiFrontFill, BsFillStarFill } from "react-icons/bs";
import { MdDeliveryDining } from "react-icons/md";
import pin from "../../components/assets/images/pin.png";

export const Home = () => {
  const navigate = useNavigate();
  const search_data = useSelector((state) => state.search);
  const { data: restaurant = [] } = useGetAllRestaurantQuery();
  const { data: popular = [] } = useGetPopularResQuery();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        window.location.reload();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function viewShop(id) {
    navigate(`/catalog/${id}`);
  }

  const filterRestaurant = restaurant?.data?.filter((item) => {
    return item?.username?.toLowerCase().includes(search_data?.toLowerCase());
  });

  const locationOptions = ["Option 1", "Option 2", "Option 3"];

  return (
    <div className="home_page">
      <div className="header">
        <div className="navigation_panel">
          <label>
            <span>Hozirgi manzil</span>
            <select name="location">
              {locationOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
              <option value="kj">+Yangi manzil</option>
            </select>
          </label>
          <button onClick={() => navigate("/map")}>
            <img src={pin} alt="" />
          </button>
        </div>
        <Navbar />
      </div>
      <div className="restaurant_carusel">
        {popular?.data?.map((shop) => {
          return (
            <div
              className="carusel_item"
              onClick={() => viewShop(shop?.id)}
              key={shop?.id}
            >
              <ImgService src={shop?.img} fallbackSrcRes alt="Restaurant img" />
            </div>
          );
        })}
      </div>
      <div className="restaurant_box">
        {filterRestaurant?.map((shop) => {
          return (
            <figure
              onClick={() => viewShop(shop?.id)}
              key={shop?.id}
              className="restaurant"
            >
              <ImgService src={shop?.img} fallbackSrcRes alt="Restaurant img" />
              <label>
                <div>
                  <h1>{shop?.username?.split("_").join(" ")}</h1>
                  <p>
                    <span>
                      <BsFillStarFill
                        style={
                          shop?.rating >= 5
                            ? { color: "#094d03" }
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
                      title="Bepul yetkazib berish 20 000 sumdan boshlab istalhan yerga bepul"
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
