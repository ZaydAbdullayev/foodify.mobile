import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const base_url = "https://backend.foodify.uz";
const user = JSON?.parse(localStorage.getItem("customer")) || [];

export const userAPi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["product, restaurant"],
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
  }),
});

export const { useGetUserQuery } = userAPi;
