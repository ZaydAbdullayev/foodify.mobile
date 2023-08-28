import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const base_url = "https://backend.foodify.uz";
const user = JSON?.parse(localStorage.getItem("customer")) || [];

export const favFoodAPi = createApi({
  reducerPath: "favFoodApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["food"],
  endpoints: (builder) => ({
    // add to cart all product "/add/toCart/:user_id/;id"
    addFavFood: builder.mutation({
      query: (body) => ({
        url: "add/favFood",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body,
      }),
      invalidatesTags: ["food"],
    }),

    // get favorite food "get/favFoods/:id"
    getFavFood: builder.query({
      query: (id) => ({
        url: `get/favFoods/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["food"],
    }),

    // update money path: "/admin/update/money/:id" (private) (PATCH)
    updateFavFood: builder.mutation({
      query: (data) => ({
        url: ` /update/money/${data?.id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: data?.item,
      }),
      invalidatesTags: ["food"],
    }),

    // delete cart path: "/delete/cart/:user_id/:id" (private) (DELETE)
    deleteFavFood: builder.mutation({
      query: (endpoint) => ({
        url: `remove/food/${endpoint?.user_id}/${endpoint?.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      invalidatesTags: ["food"],
    }),
  }),
});

export const {
  useAddFavFoodMutation,
  useUpdateFavFoodMutation,
  useDeleteFavFoodMutation,
  useGetFavFoodQuery,
} = favFoodAPi;
