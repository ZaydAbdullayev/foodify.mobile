import React, { useState, useEffect, Fragment, useRef } from "react";
import "./catalog.css";
import { CatalogCard } from "../../components/cProductCard/cProductCard";
import { ProductMenu } from "../../components/productMenu/productMenu";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import {
  MdOutlineFavoriteBorder,
  MdOutlineAccessTimeFilled,
  MdFavorite,
} from "react-icons/md";
import { BsInfoCircle, BsFillStarFill } from "react-icons/bs";
import {
  ApiDeleteService,
  ApiGetService,
  ApiService,
} from "../../services/api.service";
import { HiArrowNarrowRight } from "react-icons/hi";

export const Catalog = () => {
  const user = JSON.parse(localStorage.getItem("customer")) || [];
  const [shop, setShop] = useState([]);
  const id = useParams()?.id;
  const [category, setCategory] = useState([]);
  const [state, setState] = useState([]);
  const [update, setUpdate] = useState(false);
  const name = shop?.username?.split("_").join(" ");
  const user_id = user?.users?.id;
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoryRefs = useRef({});

  useEffect(() => {
    ApiGetService.fetching(`get/restaurant/${id}`)
      .then((res) => {
        setShop(res?.data?.innerData);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    ApiGetService.fetching("get/products")
      .then((res) => {
        setCategory(res?.data?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const categoryes = category
    ? category.filter((item) =>
        item?.restaurant === id ? item?.category : null
      )
    : [];

  const getUniqueCategories = () => {
    const uniqueCategories = new Set();
    categoryes.forEach((item) => {
      uniqueCategories.add(item?.category);
    });
    return Array.from(uniqueCategories);
  };

  const uniqueCategories = getUniqueCategories();

  useEffect(() => {
    ApiGetService.fetching(`get/favRes/${user_id}/${id}`)
      .then((res) => {
        setState(res?.data?.innerData);
      })
      .catch((err) => console.log(err));
  }, [id, user_id, update]);

  const addToLike = (state) => {
    const shop_data = {
      id: id,
      state: state,
      user_id: user_id,
      rating: shop?.rating,
    };
    const service = state === 1 ? ApiService : ApiDeleteService;
    const endpoint =
      state === 1 ? "add/favRes" : `remove/restaurant/${user_id}/${id}`;

    service
      .fetching(endpoint, shop_data)
      .then((res) => {
        setUpdate(!update);
        enqueueSnackbar(
          state === 1
            ? "Restoran yoqtirilganlarga qo'shildi"
            : "Restoran yoqtirilganlardan o'chirildi",
          {
            variant: state === 1 ? "success" : "warning",
          }
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    if (categoryRefs.current[category]) {
      const categoryRef = categoryRefs.current[category];
      categoryRef.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div className="catalog_page">
      {/* =========== show product section ============= */}
      <div className="product_show">
        <figure className="about_restoran" key={id}>
          <img src={shop?.img} alt="restotaunt_img" />
          <figcaption className="about_restoran_item">
            <span>
              <button
                className="restoran_btn"
                onClick={() => addToLike(state === 0 ? 1 : 0)}
                style={state === 1 ? { color: "#9e0d0d" } : {}}
              >
                {state === 1 ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
              </button>
            </span>
            <div className="restoran_info_box">
              <h1>{name}</h1>
              <div className="restoran_delivery">
                <div>
                  <span>
                    <MdOutlineAccessTimeFilled />
                  </span>
                  <p>
                    {shop?.delivery_time_from} - {shop?.delivery_time_till}
                    <span>daqiqa</span>
                  </p>
                </div>
                <div>
                  <span>
                    <BsFillStarFill />
                  </span>
                  <p>
                    {shop?.rating}
                    <span>4.5</span>
                  </p>
                </div>
                <button className="restoran_btn" style={{ color: "#000" }}>
                  <BsInfoCircle />
                </button>
              </div>
            </div>
          </figcaption>
        </figure>

        <div className="product_filter">
          <HiArrowNarrowRight />
          <ProductMenu>
            {uniqueCategories.map((category) => (
              <p
                key={category}
                style={{ letterSpacing: "2px" }}
                onClick={() => handleCategoryClick(category)}
                className={
                  selectedCategory === category ? "active_category" : ""
                }
              >
                {category}
              </p>
            ))}
          </ProductMenu>
        </div>

        <div className="restoran_product">
          {uniqueCategories?.map((category, index) => (
            <Fragment key={index}>
              <h1
                id={category}
                key={category}
                ref={(element) => (categoryRefs.current[category] = element)}
              >
                {category}
              </h1>
              <CatalogCard restaurantId={id} category={category} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
