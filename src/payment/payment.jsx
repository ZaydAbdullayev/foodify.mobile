import React, { useState, useMemo } from "react";
import "./payment.css";
import "./pyment.media.css";
import { enqueueSnackbar as es } from "notistack";
import { CalculateTotalPrice } from "../services/calc.service";
import { NumericFormat } from "react-number-format";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import {
  useGetCartProductQuery,
  useDeleteCartByIdMutation,
  useUpdateCartByIdMutation,
} from "../services/cart.service";
import { useGetFavDataQuery } from "../services/fav.service";
import { SiHomeadvisor } from "react-icons/si";
import { MdDelete } from "react-icons/md";
import { ImArrowLeft2 } from "react-icons/im";

// const socket = io("https://backup.foodify.uz");
// const socket = io("http://localhost:80");
const socket = io("https://799twrl4-80.euw.devtunnels.ms");

export const Payment = () => {
  const user = useMemo(
    () => JSON?.parse(localStorage?.getItem("customer")) || [],
    []
  );
  const coords = JSON?.parse(localStorage?.getItem("coords")) || [];
  const [write, setWrite] = useState(false);
  const [adress_info, setAdress_info] = useState({});
  const user_id = user?.users?.id;
  const id = useParams()?.id;
  const navigate = useNavigate();
  const { data: shop = null } = useGetFavDataQuery(id);
  const { data: cart = [] } = useGetCartProductQuery(user_id);
  const total = CalculateTotalPrice(cart?.cartItems);
  const [deleteCartById] = useDeleteCartByIdMutation();
  const [updateCartById] = useUpdateCartByIdMutation();
  const endpoint = `empty/cart/${user_id}`;

  const payment_data = {
    address: adress_info.home + "&" + user?.users?.username || "",
    description: adress_info?.description || "",
    padyezd: adress_info?.padez || "",
    qavat: adress_info?.qavat || "",
    product_data: JSON.stringify(cart?.cartItems),
    payment: "token",
    price: total || 0,
    user_id: user_id || 0,
    restaurant_id: id,
    latitude: coords[0] || "",
    longitude: coords[1] || "",
  };

  const updateCart = async (item) => {
    const endpoint = `/remove/cartItem/${user_id}/${item?.id}`;

    const Udata = {
      item,
      user_id,
    };

    if (item?.quantity > 0) {
      const { error, data } = await updateCartById(Udata);
      if (error) return es("Qandaydir muammo yuz berdi", { variant: "error" });
      if (data)
        es("Mahsulot savatga muvoffaqiyatli qo'shildi!", {
          variant: "success",
        });
    } else {
      const { error, data } = await deleteCartById(endpoint);
      if (error) return es("Qandaydir muammo yuz berdi", { variant: "error" });
      if (data) es("Mahsulot savatdan o'chirildi!", { variant: "warning" });
      if (cart?.cartItems?.length === 1 && cart?.cartItems[0]?.quantity === 1) {
        navigate(`/catalog/${id}`);
        window.location.reload();
      }
    }
  };

  const clearCart = async () => {
    const confirm = window.confirm("Cart tozalansinmi");

    if (confirm) {
      const { error, data } = await deleteCartById(endpoint);
      if (error) return es("Qandaydir muammo yuz berdi", { variant: "error" });
      if (data) es("Mahsulot savatdan o'chirildi!", { variant: "warning" });
      navigate("/all/foods");
      window.location.reload();
    }
  };

  const resieveOrderS = async () => {
    if (adress_info?.home === "")
      return es("Adressni kiriting", { variant: "warning" });
    socket.emit("/order", payment_data);
    es("Buyurtma yuborildi", { variant: "success" });
    const { error, data } = await deleteCartById(endpoint);
    if (error) return es("Qandaydir muammo yuz berdi", { variant: "error" });
    if (data) console.log("Mahsulot savatdan o'chirildi!");
    navigate("/my/orders");
    window.location.reload();
  };

  return (
    <div className="payment_box">
      <pre>
        <span onClick={() => navigate(-1)}>
          <ImArrowLeft2 />
        </span>
        <h1>{shop?.innerData?.username?.split("_")?.join(" ")}</h1>
      </pre>
      <div className="rigth_section">
        <p>Yetakazish shartlari</p>
        <div className="whose_order">
          <button type="button" autoFocus>
            Yetkazish <span>summasi</span>
          </button>
          <button type="button">
            Boshqa odam uchun buyurtma <span>summasi</span>
          </button>
        </div>
        <div
          className={write ? "place_information write" : "place_information"}
          onClick={() => setWrite(true)}
        >
          <div className="user_location">
            <SiHomeadvisor style={{ fontSize: "var(--fs4)", color: "#fff" }} />
            <select name="location">
              <option value="value">Namangan</option>
            </select>
          </div>
          <label>
            <p>Uy/Ofis</p>
            <input
              type="text"
              required
              autoComplete="off"
              onChange={(e) =>
                setAdress_info({ ...adress_info, home: e.target.value })
              }
            />
          </label>
          <label>
            <p>Podyez №:</p>
            <input
              type="number"
              autoComplete="off"
              onChange={(e) =>
                setAdress_info({ ...adress_info, padez: e.target.value })
              }
            />
          </label>
          <label>
            <p>Qavat №:</p>
            <input
              type="text"
              autoComplete="off"
              onChange={(e) =>
                setAdress_info({ ...adress_info, qavat: e.target.value })
              }
            />
          </label>
          <label>
            <p>buyurtma uchun izoh</p>
            <input
              type="text"
              autoComplete="off"
              onChange={(e) =>
                setAdress_info({
                  ...adress_info,
                  description: e.target.value,
                })
              }
            />
          </label>
        </div>
        <div className="delivery_time">
          <p>Yetkazib berish vaqti</p>
          <select name="time">
            <option value="time">Yetkazish: 20-30 daqiqa</option>{" "}
            <option value="dhdsf">Bugun: 20-30 daqiqa</option>
          </select>
        </div>
      </div>
      <div className="left_section">
        <p>
          Buyurtmangiz:{" "}
          <span onClick={clearCart}>
            <MdDelete />
          </span>
        </p>
        <div>
          {cart?.cartItems?.map((item) => {
            return (
              <div className="cart_body__item payment_body" key={item?.id}>
                <div className="payment_info_box">
                  <img src={item?.img} alt="product_photo" />
                  <label>
                    <p
                      style={{
                        lineHeight: "1.5",
                        textTransform: "capitalize",
                      }}
                    >
                      {item?.name}
                    </p>
                    <span>{item?.description}</span>
                  </label>
                </div>
                <div className="payment_count_box">
                  <button
                    onClick={() =>
                      updateCart({
                        quantity: item?.quantity - 1,
                        id: item?.id,
                      })
                    }
                  >
                    –
                  </button>
                  <span>{item?.quantity}</span>
                  <button
                    onClick={() =>
                      updateCart({
                        quantity: item?.quantity + 1,
                        id: item?.id,
                      })
                    }
                  >
                    +
                  </button>
                  <p>{item?.price} so'm</p>
                </div>
              </div>
            );
          })}
          <p className="total_price">
            Jami to'lov:{" "}
            <NumericFormat
              displayType="text"
              value={total || 0}
              suffix=" so'm"
              thousandSeparator=" "
            />
          </p>
        </div>
      </div>

      <button onClick={resieveOrderS} className="payment_btn">
        Buyurtma berish
      </button>
    </div>
  );
};
