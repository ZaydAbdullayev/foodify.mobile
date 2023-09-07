import React, { useState, useMemo } from "react";
import "./myFavoriteFood.css";
import "../../components/cProductCard/cProductCard.css";
import { NumericFormat } from "react-number-format";
import { enqueueSnackbar as es } from "notistack";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ImgService } from "../../services/image.service";

import {
  useAddCartMutation,
  useDeleteCartByIdMutation,
  useUpdateCartByIdMutation,
  useGetCartProductQuery,
} from "../../services/cart.service";

import {
  useGetFavFoodQuery,
  useDeleteFavFoodMutation,
} from "../../services/food.service";

export const MyFavFood = () => {
  const [user, setUser] = useState([]);
  const user_id = user?.users?.id;
  const navigate = useNavigate();
  useMemo(() => {
    setUser(JSON?.parse(localStorage?.getItem("customer")) || false);
  }, []);
  const { data: cart = [] } = useGetCartProductQuery(user_id);
  const { data: product = [] } = useGetFavFoodQuery(user_id);
  const [deleteCart] = useDeleteCartByIdMutation();
  const [updateCartById] = useUpdateCartByIdMutation();
  const [addCart] = useAddCartMutation();
  const [deleteFavFood] = useDeleteFavFoodMutation();

  console.log(product?.innerData);

  const addToCart = async (item) => {
    if (user?.token) {
      const { error, data } = await addCart(item);
      if (error) return es("Xatolik uzberdi", { variant: "warning" });
      if (data)
        es("Mahsulot savatga muvoffaqiyatli qo'shildi!", {
          variant: "success",
        });
    } else {
      navigate("/signin");
    }
  };

  const updateCart = async (item) => {
    const endpoint = `/remove/cartItem/${user_id}/${item?.id}`;

    const Udata = {
      item,
      user_id,
    };

    if (item?.quantity > 0) {
      const { data } = await updateCartById(Udata);
      if (data)
        es("Mahsulot savatga muvoffaqiyatli qo'shildi!", {
          variant: "success",
        });
    } else {
      const { data } = await deleteCart(endpoint);
      if (data) es("Mahsulot savatdan o'chirildi!", { variant: "warning" });
    }
  };

  const addToLike = async (state) => {
    console.log(state?.id);
    const food_data = {
      id: state?.id,
      state: state?.state,
      user_id: user_id,
    };
    const { data } = await deleteFavFood(food_data);
    if (data) es("Yoqtiganlardan o'chirildi!", { variant: "warning" });
  };

  return (
    <div className="my_favorite">
      <h1>Sevimli Ovqatlarim</h1>
      <div className="food_fav">
        {product?.innerData?.map((item) => {
          const existingCartItem = cart?.innerData?.find(
            (cartItem) => cartItem?.id === item?.id
          );
          const quantity = existingCartItem
            ? existingCartItem?.quantity
            : "Qo'shish";

          return (
            <figure
              className="catalog_product"
              key={item?.id}
              style={
                item?.status === 0
                  ? { opacity: "0.4", cursor: "not-allowed" }
                  : {}
              }
            >
              <ImgService src={item?.img} fallbackSrc alt="images" />
              <figcaption className="product_info">
                <div>
                  <NumericFormat
                    value={item?.price}
                    suffix=" sum"
                    thousandSeparator=" "
                    displayType="text"
                  />
                  <span style={{ textTransform: "capitalize" }}>
                    {item?.name}
                  </span>
                  <span>{item?.description || ""}</span>
                </div>
                {existingCartItem ? (
                  <div className="btn_box add_effect">
                    {quantity > 0 && (
                      <span
                        className="span"
                        onClick={() =>
                          updateCart({ quantity: quantity - 1, id: item?.id })
                        }
                      >
                        –
                      </span>
                    )}
                    <button>{quantity} </button>
                    {quantity > 0 && (
                      <span
                        className="span"
                        onClick={() =>
                          updateCart({ quantity: quantity + 1, id: item?.id })
                        }
                      >
                        +
                      </span>
                    )}
                  </div>
                ) : (
                  <div
                    className="btn_box"
                    style={existingCartItem ? {} : { justifyContent: "center" }}
                  >
                    <button
                      style={
                        item?.status === 0 ? { cursor: "not-allowed" } : {}
                      }
                      onClick={() => {
                        if (item && item?.status === 1) {
                          addToCart({
                            ...item,
                            quantity: 1,
                            user_id: user_id,
                          });
                        }
                      }}
                    >
                      {quantity > 0 ? quantity : "Qo'shish +"}
                    </button>
                  </div>
                )}
              </figcaption>
              <button
                className="like_btn on_like"
                onClick={() => addToLike(item?.id)}
                style={{ color: "var(--cl1)" }}
              >
                <span>
                  <MdFavorite />
                </span>
                <span>
                  <MdOutlineFavoriteBorder />
                </span>
              </button>
            </figure>
          );
        })}
      </div>
    </div>
  );
};
