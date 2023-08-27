import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const base_url = "https://backend.foodify.uz";
const user = JSON?.parse(localStorage.getItem("customer")) || [];

export const favoriteAPi = createApi({
  reducerPath: "favoriteApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["favorite"],
  endpoints: (builder) => ({
    // add to favorite "/add/toCart/:user_id/;id"
    addFavRes: builder.mutation({
      query: (body) => ({
        url: "add/favRes",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body,
      }),
      invalidatesTags: ["favorite"],
    }),

    // get restaurants all products "get/products/:res_id"
    getResProducts: builder.query({
      query: (id) => ({
        url: `get/products/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["favorite"],
    }),

    // path of get favorite restaurant by user id "/get/favRes/:user_id"
    getFavRes: builder.query({
      query: (id) => ({
        url: `get/favRes/ ${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        providesTags: ["favorite"],
      }),
    }),

    // update restaurant  by user's  gave raiting "/update/money/:id" (private) (PATCH)
    updateFavRes: builder.mutation({
      query: (data) => ({
        url: `update/favRes/${data?.user_id}/${data?.id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: data.raiting,
      }),
      invalidatesTags: ["favorite"],
    }),

    // delete money path: "/admin/delete/money/:id" (private) (DELETE)
    deleteFavRes: builder.mutation({
      query: (endpoint) => ({
        url: endpoint,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      invalidatesTags: ["favorite"],
    }),

    // get favorite restaurant state "/get/favRes/:user_id/:id"
    getFavState: builder.query({
      query: (endpoint) => ({
        url: endpoint,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["favorite"],
    }),

    // get favorite restaurant data "/get/restaurant/:id"
    getFavData: builder.query({
      query: (id) => ({
        url: `get/restaurant/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    }),
  }),
});

export const {
  useAddFavResMutation,
  useGetResProductsQuery,
  useUpdateFavResMutation,
  useDeleteFavResMutation,
  useGetFavStateQuery,
  useGetFavDataQuery,
  useGetFavResQuery,
} = favoriteAPi;