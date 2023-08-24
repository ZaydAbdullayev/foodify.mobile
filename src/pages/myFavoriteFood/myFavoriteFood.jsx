import React, { useEffect, useState, useMemo } from "react";
import "./myFavoriteFood.css";
import "../../components/cProductCard/cProductCard.css";
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

export const MyFavFood = () => {
  const [user, setUser] = useState([]);
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const updateCard = useSelector((state) => state.updateCard);
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState(false);
  const user_id = user?.users?.id;
  const navigate = useNavigate();
  useMemo(() => {
    setUser(JSON?.parse(localStorage?.getItem("customer")) || false);
  }, []);

  useEffect(() => {
    ApiGetService.fetching(`get/favFoods/${user_id}`)
      .then((res) => {
        setProduct(res?.data?.innerData);
      })
      .catch((err) => {});
  }, [favorite, user_id]);

  useEffect(() => {
    ApiGetService.fetching(`cart/get/products/${user_id}`)
      .then((res) => {
        setCart(res?.data?.cartItem);
      })
      .catch((err) => {});
  }, [updateCard, user_id]);

  const addToCart = (item) => {
    if (user.token) {
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
        enqueueSnackbar("Mahsulot savatga muvoffaqiyatli qo'shildi!", {
          variant: "success",
        });
      })
      .catch((err) => console.log(err));
  };

  const addToLike = (id) => {
    ApiDeleteService.fetching(`remove/food/${user_id}/${id}`).then((res) => {
      setFavorite(!favorite);
      enqueueSnackbar("mahsulot yoqtirilganlardan o'chirildi", {
        variant: "warning",
      });
    });
  };
  return (
    <div className="my_favorite">
      <h1>Sevimli Ovqatlarim</h1>
      <div className="food_fav">
        {product?.map((item) => {
          const existingCartItem = cart?.find(
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
