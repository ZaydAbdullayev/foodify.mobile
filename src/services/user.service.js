import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const base_url = "https://backend12.foodify.uz";
const user = JSON?.parse(localStorage.getItem("customer")) || [];

export const userAPi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    // path for user's data "/get/user/:id"
    getUser: builder.query({
      query: (id) => ({
        url: `get/user/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
    }),

    // path  for user's resive order
    resieveOrder: builder.mutation({
      query: (body) => ({
        url: "receive/order",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body,
      }),
      invalidatesTags: ["order"],
    }),

    // path for get all user's has been orders "/get/orders/:user_id"
    getOrder: builder.query({
      query: (id) => ({
        url: `get/myOrders/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["order"],
    }),
  }),
});

export const { useGetUserQuery, useGetOrderQuery, useResieveOrderMutation } =
  userAPi;
