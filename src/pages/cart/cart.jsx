import React, { memo } from "react";
import "./cart.css";
import { NumericFormat } from "react-number-format";
import { CalculateTotalPrice } from "../../services/calc.service";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar as es } from "notistack";
import { ImgService } from "../../services/image.service";
import {
  useGetCartProductQuery,
  useDeleteCartByIdMutation,
  useUpdateCartByIdMutation,
} from "../../services/cart.service";

import empty from "../../components/assets/images/empty-cart.gif";
import { BsTaxiFrontFill, BsTaxiFront, BsInfoCircle } from "react-icons/bs";

export const Cart = memo(({ setOpen }) => {
  const user = JSON?.parse(localStorage.getItem("customer")) || [];
  const navigate = useNavigate();
  const id = useParams()?.id;
  const user_id = user?.users?.id;
  const { data = [] } = useGetCartProductQuery(user_id);
  const [deleteCartById] = useDeleteCartByIdMutation();
  const [updateCartById] = useUpdateCartByIdMutation();
  const total_price = CalculateTotalPrice(data?.cartItems);

  const updateCart = async (item) => {
    const endpoint = `/remove/cartItem/${user_id}/${item?.id}`;

    const Udata = {
      item,
      user_id,
    };

    if (item?.quantity > 0) {
      const { error, data } = await updateCartById(Udata);
      if (error)
        return es("Savatga qo'shishda muammo yuz berdi", { variant: "error" });
      if (data)
        es("Mahsulot savatga muvoffaqiyatli qo'shildi!", {
          variant: "success",
        });
    } else {
      const { error, data } = await deleteCartById(endpoint);
      if (error)
        return es("Savatdan o'chirishda muammo yuz berdi", {
          variant: "error",
        });
      if (data) es("Mahsulot savatdan o'chirildi!", { variant: "warning" });
    }
  };

  const payment = () => {
    navigate(`/payment/${id}`);
  };

  const handleDelCart = async () => {
    const confirm = window.confirm("Cart tozalansinmi");
    const endpoint = `empty/cart/${user_id}`;

    if (confirm) {
      const { error, data } = await deleteCartById(endpoint);
      if (error)
        return es("Savatdan o'chirishda muammo yuz berdi", {
          variant: "error",
        });
      if (data) es("Mahsulot savatdan o'chirildi!", { variant: "warning" });
      setOpen(false);
      if (data?.cartItems?.length === 0) window.location.reload();
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
            {data?.cartItems?.map((item) => {
              return (
                <div className="cart_body__item" key={item?.id}>
                  <ImgService src={item?.img} fallbackSrc alt="product_photo" />
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

          {data?.cartItems?.length ? (
            <div
              className="service_price"
              style={
                data?.cartItems?.length === 1
                  ? {}
                  : { borderTop: "1px solid #3333334b" }
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
      {!data?.cartItems?.length ? (
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
              value={total_price || 0}
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
