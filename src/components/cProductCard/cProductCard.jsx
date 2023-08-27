import React, { useState, useMemo, memo } from "react";
import "./cProductCard.css";
import { NumericFormat } from "react-number-format";
import { enqueueSnackbar as es } from "notistack";
import { useNavigate } from "react-router-dom";
import { ImgService } from "../../services/image.service";
import {
  useGetCartProductQuery,
  useAddCartMutation,
  useDeleteCartByIdMutation,
  useUpdateCartByIdMutation,
} from "../../services/cart.service";
import {
  useGetFavFoodQuery,
  useAddFavFoodMutation,
  useDeleteFavFoodMutation,
} from "../../services/food.service";
import { useGetResProductsQuery } from "../../services/fav.service";

import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";

export const CatalogCard = memo(({ restaurantId, category }) => {
  const [user, setUser] = useState([]);
  const user_id = user?.users?.id;
  const navigate = useNavigate();
  const [effect, setEffect] = useState(false);
  useMemo(() => {
    setUser(JSON.parse(localStorage.getItem("customer")) || false);
  }, []);
  const { data: cartProduct = [] } = useGetCartProductQuery(user_id);
  const { data: resProduct = [] } = useGetResProductsQuery(restaurantId);
  const { data: favFood = [] } = useGetFavFoodQuery(user_id);
  const [deleteCart] = useDeleteCartByIdMutation();
  const [updateCartById] = useUpdateCartByIdMutation();
  const [addCart] = useAddCartMutation();
  const [addFavFood] = useAddFavFoodMutation();
  const [deleteFavFood] = useDeleteFavFoodMutation();

  const addToCart = async (item) => {
    if (user?.token) {
      const { error, data } = await addCart(item);
      if (error)
        return es("Savatga qo'shishda muammo yuz berdi", {
          variant: "warning",
        });
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
      const { error, data } = await updateCartById(Udata);
      if (error)
        return es("Savatga qo'shishda muammo yuz berdi", { variant: "error" });
      if (data)
        es("Mahsulot savatga muvoffaqiyatli qo'shildi!", {
          variant: "success",
        });
      console.log(data);
    } else {
      setEffect(item.id);
      const { error, data } = await deleteCart(endpoint);
      if (error)
        return es("Savatdan o'chirishda muammo yuz berdi", {
          variant: "error",
        });
      if (data) {
        es("Mahsulot savatdan o'chirildi!", { variant: "warning" });
      }
    }
  };

  const addToLike = async (state) => {
    const food_data = {
      id: state?.id,
      state: state?.state,
      user_id: user_id,
    };

    if (state?.state === 1) {
      const { error, data } = await addFavFood(food_data);
      if (error)
        return es("Yoqtirilganlarga qo'shishda muammo yuz berdi", {
          variant: "error",
        });
      if (data)
        es("Yoqtirilganlarga muvoffaqiyatli qo'shildi!", {
          variant: "success",
        });
    } else {
      const { error, data } = await deleteFavFood(food_data);
      if (error)
        return es("Yoqtirilganlardan o'chirishda muammo yuz berdi", {
          variant: "error",
        });
      if (data) es("Yoqtiganlardan o'chirildi!", { variant: "warning" });
    }
  };

  const filtered = resProduct?.innerData?.filter((item) => {
    return item?.category === category;
  });

  return (
    <>
      {filtered?.map((item) => {
        const existingCartItem = cartProduct?.cartItems?.find(
          (cartItem) => cartItem?.id === item?.id
        );
        const quantity = existingCartItem
          ? existingCartItem?.quantity
          : "Qo'shish";

        const existingFood = favFood?.innerData?.find(
          (foodItem) => foodItem?.id === item?.id || false
        );

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
                <div
                  className={
                    effect === item.id
                      ? "btn_box off_effect"
                      : "btn_box on_effect"
                  }
                >
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
                    style={item?.status === 0 ? { cursor: "not-allowed" } : {}}
                    onClick={() => {
                      if (item && item?.status === 1) {
                        addToCart({
                          id: item?.id,
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
              className={existingFood ? "like_btn on_like" : "like_btn"}
              onClick={() =>
                addToLike({ id: item?.id, state: existingFood ? 0 : 1 })
              }
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
    </>
  );
});
