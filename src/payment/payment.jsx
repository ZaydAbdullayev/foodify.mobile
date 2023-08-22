import React, { useState, useEffect, useMemo } from "react";
import "./payment.css";
import { useSelector, useDispatch } from "react-redux";
import {
  ApiGetService,
  ApiUpdateService,
  ApiDeleteService,
  ApiService,
} from "../services/api.service";
import { useSnackbar } from "notistack";
import { CalculateTotalPrice } from "../services/calc.service";
import { acUpdateCard } from "../redux/cart";
import { NumericFormat, PatternFormat } from "react-number-format";
import { useParams, useNavigate } from "react-router-dom";
import { SiHomeadvisor } from "react-icons/si";
import { MdDelete } from "react-icons/md";
import { ImArrowLeft2 } from "react-icons/im";

const bankImages = {
  humo: require("../components/assets/images/humo.jpg"),
  visa: require("../components/assets/images/Visa_Inc.-Logo.wine.png"),
  click: require("../components/assets/images/Click-01.png"),
  mastercard: require("../components/assets/images/Mastercard-Logo.wine.png"),
  uzum: require("../components/assets/images/UZUM_BANK-01.png"),
  payme: require("../components/assets/images/payme-01.png"),
  uzcard: require("../components/assets/images/Uzcard_Logo-700x367.png"),
};

export const Payment = () => {
  const user = useMemo(
    () => JSON?.parse(localStorage?.getItem("customer")) || [],
    []
  );
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const updateCard = useSelector((state) => state.updateCard);
  const [write, setWrite] = useState(false);
  const [adress_info, setAdress_info] = useState({});
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [bg, setBg] = useState("");
  const dispatch = useDispatch();
  const user_id = user?.users?.id;
  const [shop, setShop] = useState(null);
  const id = useParams()?.id;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const payment_data = {
    address: adress_info?.home,
    description: adress_info?.description,
    padyezd: adress_info?.padez,
    qavat: adress_info?.qavat,
    product_data: JSON.stringify(cart),
    payment: "token",
    price: total,
    user_id: user_id,
    restaurant_id: id,
    latitude: "4567584985784938574934857",
    longitude: "4567584985784938574934857",
  };

  useEffect(() => {
    ApiGetService.fetching(`cart/get/products/${user_id}`)
      .then((res) => {
        setCart(res?.data?.cartItems);
        const total_price = CalculateTotalPrice(res?.data?.cartItems);
        setTotal(total_price);
      })
      .catch((err) => {
        console.log(err);
      });

    ApiGetService.fetching(`get/restaurant/${id}`)
      .then((res) => {
        setShop(res?.data?.innerData);
      })
      .catch((err) => console.log(err));
  }, [updateCard, user_id, id]);

  const updateCart = (item) => {
    const service = item?.quantity > 0 ? ApiUpdateService : ApiDeleteService;
    const endpoint =
      item?.quantity > 0
        ? `update/cart/${user_id}/${item?.id}`
        : `remove/cartItem/${user_id}/${item?.id}`;

    service
      .fetching(endpoint, item)
      .then((res) => {
        console.log(res);
        dispatch(acUpdateCard());
      })
      .catch((err) => console.log(err));
  };

  const clearCart = () => {
    const confirm = window.confirm("Savatingiz tozalansinmi?");
    if (confirm) {
      ApiDeleteService.fetching(`empty/cart/${user_id}`)
        .then((res) => {
          console.log(res);
          dispatch(acUpdateCard());
        })
        .catch((err) => console.log(err));
    }
  };

  const handlePayment = () => {
    ApiService.fetching("receive/order", payment_data)
      .then((res) => {
        const msg = "Buyurtmangiz restoranga yuborildi";
        enqueueSnackbar(msg, { variant: "success" });
        navigate("/my/orders");
        ApiDeleteService.fetching(`empty/cart/${user_id}`)
          .then((res) => {
            console.log(res);
            dispatch(acUpdateCard());
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="payment_box">
      <pre>
        <span onClick={() => navigate(-1)}>
          <ImArrowLeft2 />
        </span>
        <h1>{shop?.username?.split("_")?.join(" ")}</h1>
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
          {cart?.map((item) => {
            return (
              <div className="cart_body__item payment_body" key={item?.name}>
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
              value={total}
              suffix=" so'm"
              thousandSeparator=" "
            />
          </p>
        </div>
      </div>
      <div className="payment_postcard">
        <div className="payment_header" onClick={() => setOpen(false)}>
          <div
            className={active === 1 ? "payment_item active" : "payment_item"}
            onClick={() => setActive(1)}
          >
            <img src={bankImages.humo} alt="bank" />
            <img src={bankImages.uzcard} alt="bank" />
            <p>Sum cards (0%)</p>
          </div>
          <div
            className={active === 2 ? "payment_item active" : "payment_item"}
            onClick={() => setActive(2)}
          >
            <img src={bankImages.visa} alt="bank" />
            <img src={bankImages.mastercard} alt="bank" />
            <p>Sum cards (0%)</p>
          </div>
          <div
            className={active === 3 ? "payment_item active" : "payment_item"}
            onClick={() => setActive(3)}
          >
            <img src={bankImages.payme} alt="bank" />
            <img src={bankImages.click} alt="bank" />
            <img src={bankImages.uzum} alt="bank" />
            <p>Sum cards (0%)</p>
          </div>
        </div>

        {active === 1 ? (
          <form
            className="payment_body2"
            style={{
              flexDirection: "column",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div className="add_card" onClick={() => setOpen(true)}>
              ADD card +
            </div>
            <div
              className={
                bg === "9"
                  ? "card_item humo"
                  : bg === "4"
                  ? "card_item visa"
                  : bg === "8"
                  ? "card_item uzcard"
                  : "card_item"
              }
              style={open ? { top: "50%" } : {}}
            >
              <PatternFormat
                format="#### #### #### ####"
                displayType="input"
                name="card_name"
                required
                autoComplete="off"
                placeholder="Karta raqami"
                onChange={(e) => setBg(e.target.value.substring(0, 1))}
              />
              <PatternFormat
                format="##/##"
                displayType="input"
                name="card_month"
                required
                placeholder="Amal qiladigan muddati"
                autoComplete="off"
              />
              <button className="payment_btn">To'lash</button>
            </div>
          </form>
        ) : active === 2 ? (
          ""
        ) : (
          <div className="payment_body2">
            <figure className="app_item">
              <img src={bankImages.click} alt="bank" />
              <p>(comission 0%)</p>
            </figure>
            <figure className="app_item">
              <img src={bankImages.payme} alt="bank" />
              <p>(comission 0%)</p>
            </figure>
            <figure className="app_item">
              <img src={bankImages.uzum} alt="bank" />
              <p>(comission 0%)</p>
            </figure>
            <figure className="app_item">
              <img src={bankImages.click} alt="bank" />
              <p>(comission 0%)</p>
            </figure>
          </div>
        )}
      </div>
      <button onClick={handlePayment} className="payment_btn">
        Buyurtma berish
      </button>
    </div>
  );
};
