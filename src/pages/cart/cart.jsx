import React, { memo, useState, useEffect } from "react";
import "./cart.css";
import { NumericFormat } from "react-number-format";
import { CalculateTotalPrice } from "../../services/calc.service";
import { useSelector, useDispatch } from "react-redux";
import {
  ApiUpdateService,
  ApiDeleteService,
  ApiGetService,
} from "../../services/api.service";
import { acUpdateCard } from "../../redux/cart";
import { useNavigate, useParams } from "react-router-dom";
import { acPrice } from "../../redux/price";
import { enqueueSnackbar } from "notistack";

import empty from "../../components/assets/images/empty-cart.gif";
import { BsTaxiFrontFill, BsTaxiFront, BsInfoCircle } from "react-icons/bs";

export const Cart = memo(({ setOpen }) => {
  const user = JSON?.parse(localStorage.getItem("customer")) || [];
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const updateCard = useSelector((state) => state.updateCard);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams()?.id;
  const user_id = user?.users?.id;

  useEffect(() => {
    ApiGetService.fetching(`cart/get/products/${user_id}`)
      .then((res) => {
        setCart(res?.data?.cartItems);
        const total_price = CalculateTotalPrice(res?.data?.cartItems);
        setTotal(total_price ? total_price : 0);
        dispatch(acPrice(total_price ? total_price : 0));
      })
      .catch((err) => {});
  }, [updateCard, dispatch, user_id]);

  const updateCart = (item) => {
    const service = item?.quantity > 0 ? ApiUpdateService : ApiDeleteService;
    const endpoint =
      item?.quantity > 0
        ? `update/cart/${user_id}/${item?.id}`
        : `remove/cartItem/${user_id}/${item?.id}`;

    service
      .fetching(endpoint, item)
      .then((res) => {
        dispatch(acUpdateCard());
      })
      .catch((err) => console.log(err));
  };

  const payment = () => {
    navigate(`/payment/${id}`);
  };

  const handleDelCart = () => {
    const confirm = window.confirm("Cart tozalansinmi");

    if (confirm) {
      ApiDeleteService.fetching(`empty/cart/${user_id}`)
        .then((res) => {
          dispatch(acUpdateCard());
          enqueueSnackbar("savatingiz tozalandi", { variant: "warning" });
          setOpen(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="cart_box">
      <div className="cart_show_product">
        <div>
          <p>Savat</p>
          <button onClick={handleDelCart}>tozalash</button>
        </div>

        {/* =========== Cart body section ======= */}
        <div className="cart_body">
          <div className="cart_body_box last">
            {cart?.map((item) => {
              return (
                <div className="cart_body__item" key={item?.name}>
                  <img src={item?.img} alt="product_photo" />
                  <div className="item_info__box">
                    <div className="info">
                      <p style={{ lineHeight: "1.5" }}>{item?.name}</p>
                      <span>{item?.description}</span>
                      <p>{item?.price}</p>
                    </div>
                    <div className="count_box">
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
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {cart?.length ? (
            <div
              className="service_price"
              style={
                cart?.length === 1 ? {} : { borderTop: "1px solid #3333334b" }
              }
            >
              <p>Xizmat xaqi:</p>
              <span>5 000 sum</span>
            </div>
          ) : (
            <figure className="empty_cart">
              <p style={{ fontSize: "var(--fs5)", textAlign: "center" }}>
                Hozircha savatingiz bo'sh
              </p>
              <img src={empty} alt="empty_gif" />
            </figure>
          )}
        </div>
      </div>

      {/* =========== delivery section ============ */}
      {!cart?.length ? (
        <div className="cart_delivery">
          <label className="free">
            <span style={{ paddingRight: "5%" }}>
              <BsTaxiFrontFill />
            </span>
            <p> Kamida 10 000 so'mdan boshlab bepul yetkazib berish hizmati</p>
          </label>
        </div>
      ) : (
        <div className="cart_delivery">
          <label>
            <p>
              <span>
                <BsTaxiFront />
              </span>
              Yetkazib berish 0 sum
            </p>
            <BsInfoCircle />
          </label>
          <button onClick={() => payment()}>
            Jami to'lov:{" "}
            <NumericFormat
              value={total}
              suffix=" sum"
              thousandSeparator=" "
              displayType="text"
            />
          </button>
        </div>
      )}
    </div>
  );
});
