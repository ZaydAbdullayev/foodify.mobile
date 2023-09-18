import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const base_url = "https://backend.foodify.uz";
const user = JSON?.parse(localStorage.getItem("customer")) || [];

export const universalAPi = createApi({
  reducerPath: "universalApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["product, restaurant"],
  endpoints: (builder) => ({
    // path for get all products
    getAllProduct: builder.query({
      query: () => ({
        url: `get/products`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    }),

    // path for get all restaurants
    getAllRestaurant: builder.query({
      query: () => ({
        url: `get/restaurants`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    }),

    // path for get most popular restaurants
    getPopularRes: builder.query({
      query: () => ({
        url: `get/mostViewed`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    }),

    // path get category for  filter "/filter/byCategory/:category"
    getfilterByCategory: builder.mutation({
      query: (category) => ({
        url: `filter/byCategory/${category}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetAllRestaurantQuery,
  useGetPopularResQuery,
  useGetfilterByCategoryMutation,
} = universalAPi;
