import React, { useState, useEffect } from "react";
import "./myOrders.css";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { ImgService } from "../../services/image.service";
import { useGetOrderQuery } from "../../services/user.service";
import socket from "../../socket.config";

import { BsFillCartCheckFill, BsFillHouseCheckFill } from "react-icons/bs";
import { LuChefHat } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { ImArrowLeft2 } from "react-icons/im";

export const MyOrders = () => {
  const user = JSON?.parse(localStorage?.getItem("customer")) || [];
  const id = user?.users?.id;
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const { data: orders = [] } = useGetOrderQuery(id);

  useEffect(() => {
    socket.on(`/get/order/status/${id}`, (data) => {
      setOrder(data);
      socket.off(`/get/order/status/${id}`);
    });
  }, [id]);

  const orderData = order?.length ? order : orders?.innerData;

  return (
    <div className="my_orders">
      <pre>
        <span onClick={() => navigate("/")}>
          <ImArrowLeft2 />
        </span>
        <p>Mening Buyurtmalarim</p>
      </pre>
      {orderData?.map((order) => {
        const products =
          order?.product_data && JSON?.parse(order?.product_data);
        const change = products?.find(({ status }) => status === "3");
        const time = new Date(order?.receivedAt)?.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        });
        return (
          <div
            className={order?.status === 6 ? "orders_item none" : "orders_item"}
            key={order?.id}
          >
            <b className="time">{time}</b>
            <div className="order_info">
              <span>Buyurtma IDsi №: {order?.id}</span>
              <label style={!change ? { display: "none" } : {}}>
                Boshqa taomlar:{" "}
                <b
                  style={{ color: "#ff8c00" }}
                  onClick={() => navigate(`/catalog/${order?.restaurant_id}`)}
                >
                  Ko'rish
                </b>
              </label>
            </div>
            <div className="orders_stution">
              <span>
                <BsFillCartCheckFill
                  style={
                    order?.status >= 2 && order?.status !== 6
                      ? { color: "#2ceb1a" }
                      : {}
                  }
                />
                {/* <span>Buyurtmangiz qabul qilinishi kutilmoqda...</span> */}
              </span>{" "}
              <p
                style={
                  order?.status >= 2 && order?.status !== 6
                    ? { background: "#2ceb1a" }
                    : {}
                }
              ></p>{" "}
              <span>
                <LuChefHat
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
                <TbTruckDelivery
                  style={
                    order?.status >= 4 && order?.status !== 6
                      ? { color: "#2ceb1a" }
                      : {}
                  }
                />
              </span>{" "}
              <p
                style={
                  order?.status >= 4 && order?.status !== 6
                    ? { background: "#2ceb1a" }
                    : {}
                }
              ></p>{" "}
              <span>
                <BsFillHouseCheckFill
                  style={
                    order?.status >= 5 && order?.status !== 6
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
                      <b>Ushbu taom restoran tarafidan bekor qilindi...!</b>
                      <b>Boshqa taom buyurta qiling !</b>
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
