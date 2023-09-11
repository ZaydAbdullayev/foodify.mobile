import React from "react";
import "./myOrders.css";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { ImgService } from "../../services/image.service";
import { useGetOrderQuery } from "../../services/user.service";
import { io } from "socket.io-client";

import {
  BsFillCartCheckFill,
  BsFillHouseCheckFill,
  BsBagXFill,
  BsBagCheckFill,
} from "react-icons/bs";
import { LuChefHat } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { ImArrowLeft2 } from "react-icons/im";

const socket = io("https://backup.foodify.uz");
// const socket = io("http://localhost:80");

export const MyOrders = () => {
  const user = JSON?.parse(localStorage?.getItem("customer")) || [];
  const id = user?.users?.id;
  const navigate = useNavigate();
  let { data: orders = [] } = useGetOrderQuery(id);

  socket.on(`/get/order/status/${id}`, (data) => {
    orders = data;
    socket.off(`/get/order/status/${id}`);
  });

  return (
    <div className="my_orders">
      <pre>
        <span onClick={() => navigate("/")}>
          <ImArrowLeft2 />
        </span>
        <p>Mening Buyurtmalarim</p>
      </pre>
      {orders?.innerData?.map((order) => {
        const products = JSON?.parse(order?.product_data);
        const change = products?.find(({ status }) => status === "3");
        const time = order?.receivedAt
          ?.substring(0, 19)
          ?.split("T")
          ?.join(" | ");
        return (
          <div
            className={order?.status === 6 ? "orders_item none" : "orders_item"}
            key={order?.id}
          >
            <div className="order_info">
              <span>Buyurtma IDsi №: {order?.id}</span>
              <label style={!change ? { display: "none" } : {}}>
                Buyurtmani:{" "}
                <b style={{ background: "#38b000" }}>
                  <BsBagXFill />
                </b>
                yoki
                <b style={{ background: "#ff0000da" }}>
                  <BsBagCheckFill />
                </b>
              </label>
            </div>
            <div className="orders_stution">
              <span>
                <BsFillCartCheckFill
                  style={
                    order?.status >= 1 && order?.status !== 6
                      ? { color: "#2ceb1a" }
                      : {}
                  }
                />
                {/* <span>Buyurtmangiz qabul qilinishi kutilmoqda...</span> */}
              </span>{" "}
              <p
                style={
                  order?.status >= 1 && order?.status !== 6
                    ? { background: "#2ceb1a" }
                    : {}
                }
              ></p>{" "}
              <span>
                <LuChefHat
                  style={
                    order?.status >= 2 && order?.status !== 6
                      ? { color: "#2ceb1a" }
                      : {}
                  }
                />
              </span>{" "}
              <p
                style={
                  order?.status >= 2 && order?.status !== 6
                    ? { background: "#2ceb1a" }
                    : {}
                }
              ></p>{" "}
              <span>
                <TbTruckDelivery
                  style={
                    order?.status >= 3 && order?.status !== 6
                      ? { color: "#2ceb1a" }
                      : {}
                  }
                />
              </span>{" "}
              <p
                style={
                  order?.status >= 3 && order?.status !== 6
                    ? { background: "#2ceb1a" }
                    : {}
                }
              ></p>{" "}
              <span>
                <BsFillHouseCheckFill
                  style={
                    order?.status >= 4 && order?.status !== 6
                      ? { color: "#2ceb1a" }
                      : {}
                  }
                />
              </span>
            </div>
            <div className="order_body">
              {products?.map((product) => {
                return (
                  <figure className="order_body__item" key={product?.id}>
                    <ImgService src={product?.img} fallbackSrc alt="" />
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
                    <i style={product?.status === "3" ? {} : { top: "-120%" }}>
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
                    value={order?.price}
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
