import React, { useState, Fragment, useRef } from "react";
import "./catalog.css";
import { CatalogCard } from "../../components/cProductCard/cProductCard";
import { ProductMenu } from "../../components/productMenu/productMenu";
import { useParams } from "react-router-dom";
import { enqueueSnackbar as es } from "notistack";
import {
  MdOutlineFavoriteBorder,
  MdOutlineAccessTimeFilled,
  MdFavorite,
} from "react-icons/md";
import { BsInfoCircle, BsFillStarFill } from "react-icons/bs";
import {
  useAddFavResMutation,
  useDeleteFavResMutation,
  useGetFavStateQuery,
  useGetFavDataQuery,
} from "../../services/fav.service";
import { useGetAllProductQuery } from "../../services/product.service";
import { ImgService } from "../../services/image.service";

export const Catalog = () => {
  const user = JSON.parse(localStorage.getItem("customer")) || [];
  const id = useParams()?.id;
  const user_id = user?.users?.id;
  const endpoint = `get/favRes/${user_id}/${id}`;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: shop = [] } = useGetFavDataQuery(id);
  const { data: category = [] } = useGetAllProductQuery();
  const { data: favState = [] } = useGetFavStateQuery(endpoint);
  const [addFavRes] = useAddFavResMutation();
  const [deleteFavRes] = useDeleteFavResMutation();
  const name = shop?.innerData?.username?.split("_").join(" ");
  const categoryRefs = useRef({});

  const categoryes = category
    ? category?.data?.filter((item) =>
        item?.restaurant === id ? item?.category : null
      )
    : [];

  const getUniqueCategories = () => {
    const uniqueCategories = new Set();
    categoryes?.forEach((item) => {
      uniqueCategories.add(item?.category);
    });
    return Array.from(uniqueCategories);
  };
  const uniqueCategories = getUniqueCategories();

  const addToLike = async (state) => {
    const shop_data = {
      id: id,
      state: state,
      user_id: user_id,
      rating: shop?.innerData?.rating,
    };

    if (state === 1) {
      const { error, data } = await addFavRes(shop_data);
      if (error)
        return es("Yoqtirilganlarga qo'shishda muammo yuz berdi", {
          variant: "error",
        });
      if (data)
        es("Yoqtirilganlarga muvoffaqiyatli qo'shildi!", {
          variant: "success",
        });
    } else {
      const { error, data } = await deleteFavRes(shop_data);
      if (error)
        return es("Yoqtirilganlardan o'chirishda muammo yuz berdi", {
          variant: "error",
        });
      if (data) es("Yoqtiganlardan o'chirildi!", { variant: "warning" });
    }
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
          <ImgService
            src={shop?.innerData?.img}
            fallbackSrcRes
            alt="restotaunt_img"
          />
          <figcaption className="about_restoran_item">
            <span>
              <button
                className="restoran_btn"
                onClick={() => addToLike(favState?.innerData === 0 ? 1 : 0)}
                style={favState?.innerData === 1 ? { color: "#9e0d0d" } : {}}
              >
                {favState?.innerData === 1 ? (
                  <MdFavorite />
                ) : (
                  <MdOutlineFavoriteBorder />
                )}
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
                    {shop?.innerData?.delivery_time_from} -{" "}
                    {shop?.innerData?.delivery_time_till}
                    <span>daqiqa</span>
                  </p>
                </div>
                <div>
                  <span>
                    <BsFillStarFill />
                  </span>
                  <p>
                    {shop?.innerData?.rating}
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
          <ProductMenu>
            {uniqueCategories.map((category, index) => (
              <p
                key={index}
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
