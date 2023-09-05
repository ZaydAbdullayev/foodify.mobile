import React from "react";
import "./myOrders.css";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { ImgService } from "../../services/image.service";
import { useGetOrderQuery } from "../../services/user.service";

import {
  BsFillCartCheckFill,
  BsFillHouseCheckFill,
  BsBagXFill,
  BsBagCheckFill,
} from "react-icons/bs";
import { LuChefHat } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { ImArrowLeft2 } from "react-icons/im";

export const MyOrders = () => {
  const user = JSON?.parse(localStorage?.getItem("customer")) || [];
  const id = user?.users?.id;
  const navigate = useNavigate();
  const { data: orders = [] } = useGetOrderQuery(id);

  const compareByReceivedAt = (a, b) => {
    const dateA = new Date(a.receivedAt);
    const dateB = new Date(b.receivedAt);
    return dateB - dateA;
  };

  return (
    <div className="my_orders animate__animated animate__fadeIn">
      <pre>
        <span onClick={() => navigate(-1)}>
          <ImArrowLeft2 />
        </span>
        <p>Mening Buyurtmalarim</p>
      </pre>
      {orders?.innerData?.sort(compareByReceivedAt)?.map((order) => {
        const products = JSON.parse(order?.product_data);
        const change = products?.find(({ status }) => status === "3");
        const time = order?.receivedAt
          ?.substring(0, 19)
          ?.split("T")
          ?.join(" | ");
        return (
          <div className="orders_item" key={order?.id}>
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
                  style={order?.status >= 1 ? { color: "#38b000" } : {}}
                />
                {/* <span>Buyurtmangiz qabul qilinishi kutilmoqda...</span> */}
              </span>{" "}
              <p
                style={order?.status >= 1 ? { background: "#38b000" } : {}}
              ></p>{" "}
              <span>
                <LuChefHat
                  style={order?.status >= 2 ? { color: "#38b000" } : {}}
                />
              </span>{" "}
              <p
                style={order?.status >= 2 ? { background: "#38b000" } : {}}
              ></p>{" "}
              <span>
                <TbTruckDelivery
                  style={order?.status >= 3 ? { color: "#38b000" } : {}}
                />
              </span>{" "}
              <p
                style={order?.status >= 3 ? { background: "#38b000" } : {}}
              ></p>{" "}
              <span>
                <BsFillHouseCheckFill
                  style={order?.status >= 4 ? { color: "#38b000" } : {}}
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
