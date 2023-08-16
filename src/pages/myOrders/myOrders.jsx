import React, { useEffect, useState } from "react";
import "./myOrders.css";
import { ApiGetService } from "../../services/api.service";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";

import { BsFillCartCheckFill, BsFillHouseCheckFill } from "react-icons/bs";
import { LuChefHat } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { ImArrowLeft2 } from "react-icons/im";
import { AiOutlineCheck } from "react-icons/ai";

export const MyOrders = () => {
  const user = JSON.parse(localStorage.getItem("customer")) || [];
  const [orders, setOrdres] = useState([]);
  const id = user?.users?.id;
  const navigate = useNavigate();

  const compareByReceivedAt = (a, b) => {
    const dateA = new Date(a.receivedAt);
    const dateB = new Date(b.receivedAt);
    return dateB - dateA;
  };

  useEffect(() => {
    ApiGetService.fetching(`get/myOrders/${id}`)
      .then((res) => {
        setOrdres(res?.data?.innerData);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const backWord = () => {
    navigate(-1);
  };

  return (
    <div className="my_orders">
      <pre>
        <span onClick={backWord}>
          <ImArrowLeft2 />
        </span>
        <p>Mening Buyurtmalarim</p>
      </pre>
      {orders.sort(compareByReceivedAt).map((order) => {
        const products = JSON.parse(order?.product_data);
        const change = products.find(({ status }) => status === "3");
        const time = order.receivedAt.substring(0, 19).split("T").join(" | ");
        return (
          <div className="orders_item" key={order.id}>
            <div className="order_info">
              <span>Buyurtma IDsi №: {order.id}</span>
              <label style={!change ? { display: "none" } : {}}>
                So'rovni tasdiqlash:{" "}
                <b>
                  <AiOutlineCheck />
                </b>
              </label>
            </div>
            <div className="orders_stution">
              <span>
                <BsFillCartCheckFill
                  style={order.status >= 1 ? { color: "#38b000" } : {}}
                />
                {/* <span>Buyurtmangiz qabul qilinishi kutilmoqda...</span> */}
              </span>{" "}
              <p style={order.status >= 1 ? { background: "#38b000" } : {}}></p>{" "}
              <span>
                <LuChefHat
                  style={order.status >= 2 ? { color: "#38b000" } : {}}
                />
              </span>{" "}
              <p style={order.status >= 2 ? { background: "#38b000" } : {}}></p>{" "}
              <span>
                <TbTruckDelivery
                  style={order.status >= 3 ? { color: "#38b000" } : {}}
                />
              </span>{" "}
              <p style={order.status >= 3 ? { background: "#38b000" } : {}}></p>{" "}
              <span>
                <BsFillHouseCheckFill
                  style={order.status >= 4 ? { color: "#38b000" } : {}}
                />
              </span>
            </div>
            <div className="order_body">
              {products.map((product) => {
                return (
                  <figure className="order_body__item" key={product?.id}>
                    <img src={product?.img} alt="" />
                    <figcaption>
                      <pre>
                        <p>{product?.name}</p>
                        <span>{product?.description}</span>
                      </pre>
                      <span>{product?.quantity} ta</span>
                      <NumericFormat
                        value={product?.price}
                        displayType="text"
                        thousandSeparator=" "
                        suffix=" so'm dan"
                      />
                    </figcaption>
                    <i style={product.status === "3" ? {} : { top: "-120%" }}>
                      <b>Ushbu mahsulot restoran tarafidan bekor qilindi...!</b>
                      <b>Noqulayliklar uchu uzur so'raymiz!</b>
                      <b>Mavjud mahsulotlar tayyorlansinmi?</b>
                    </i>
                  </figure>
                );
              })}
              <div>
                <p>
                  Jami to'lov:{" "}
                  <NumericFormat
                    value={order.price}
                    displayType="text"
                    thousandSeparator=" "
                    suffix=" so'm"
                  />
                </p>
                <b>{time}</b>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
