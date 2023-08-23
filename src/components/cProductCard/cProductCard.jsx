import React, { useState, useEffect, useMemo, memo } from "react";
import "./cProductCard.css";
import { NumericFormat } from "react-number-format";
import {
  ApiService,
  ApiUpdateService,
  ApiGetService,
  ApiDeleteService,
} from "../../services/api.service";
import { enqueueSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { acUpdateCard } from "../../redux/cart";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ImgService } from "../../services/image.service";

export const CatalogCard = memo(({ restaurantId, category }) => {
  const [user, setUser] = useState([]);
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const updateCard = useSelector((state) => state.updateCard);
  const dispatch = useDispatch();
  const user_id = user?.users?.id;
  const navigate = useNavigate();
  const [effect, setEffect] = useState(false);
  const [update, setUpdate] = useState(false);
  const [food, setFood] = useState([]);
  useMemo(() => {
    setUser(JSON.parse(localStorage.getItem("customer")) || false);
  }, []);

  useEffect(() => {
    ApiGetService.fetching(`get/products/${restaurantId}`)
      .then((res) => {
        setProduct(res?.data?.innerData);
      })
      .catch((err) => console.log(err));
  }, [updateCard, restaurantId]);

  useEffect(() => {
    ApiGetService.fetching(`cart/get/products/${user_id}`)
      .then((res) => {
        setCart(res?.data?.cartItems);
      })
      .catch((err) => {});
  }, [updateCard, user_id]);

  useEffect(() => {
    ApiGetService.fetching(`get/favFoods/${user_id}`)
      .then((res) => {
        setFood(res?.data?.innerData);
      })
      .catch((err) => console.log(err));
  }, [user_id, update]);

  const addToCart = (item) => {
    setEffect(item.id);
    if (user?.token) {
      ApiService.fetching("add/toCart", item)
        .then((res) => {
          dispatch(acUpdateCard());
          enqueueSnackbar("Mahsulot savatga muvoffaqiyatli qo'shildi!", {
            variant: "success",
          });
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/signin");
    }
  };

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
        enqueueSnackbar(
          item.quantity > 0
            ? "Mahsulot savatga muvoffaqiyatli qo'shildi!"
            : "Mahsulot savatdan o'chirildi!",
          {
            variant: item.quantity > 0 ? "success" : "warning",
          }
        );
      })
      .catch((err) => console.log(err));
  };

  const addToLike = (state) => {
    const shop_data = {
      id: state?.id,
      state: state?.state,
      user_id: user_id,
    };
    const service = state?.state === 1 ? ApiService : ApiDeleteService;
    const endpoint =
      state?.state === 1
        ? "add/favFood"
        : `remove/food/${user_id}/${state?.id}`;

    service
      .fetching(endpoint, shop_data)
      .then((res) => {
        setUpdate(!update);
        enqueueSnackbar(
          state?.state === 1
            ? "Mahsulot yoqtirilganlarga qo'shildi"
            : "Mahsulot yoqtirilganlardan o'chirildi",
          {
            variant: state?.state === 1 ? "success" : "warning",
          }
        );
      })
      .catch((err) => console.log(err));
  };
  const filtered = product.filter((item) => {
    return item?.category === category;
  });

  return (
    <>
      {filtered?.map((item) => {
        const existingCartItem = cart?.find(
          (cartItem) => cartItem?.id === item?.id
        );
        const quantity = existingCartItem
          ? existingCartItem?.quantity
          : "Qo'shish";

        const existingFood = food?.find(
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
                <div className="btn_box on_effect">
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
                  className={
                    effect === item.id ? "btn_box off_effect" : "btn_box"
                  }
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
