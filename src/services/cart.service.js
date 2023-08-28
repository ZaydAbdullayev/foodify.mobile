import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const base_url = "https://backend.foodify.uz";
const user = JSON?.parse(localStorage.getItem("customer")) || [];

export const cartAPi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    // add to cart all product "/add/toCart/:user_id/;id"
    addCart: builder.mutation({
      query: (body) => ({
        url: "add/toCart",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body,
      }),
      invalidatesTags: ["product"],
    }),

    // get cart product path: "/cart/get/products/:id" (private) (GET)
    getCartProduct: builder.query({
      query: (id) => ({
        url: `cart/get/products/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["product"],
    }),

    // update cart path: "/update/cart/:user_id/:id" (private) (PATCH)
    updateCartById: builder.mutation({
      query: (data) => ({
        url: `/update/cart/${data?.user_id}/${data?.item?.id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: data?.item,
      }),
      invalidatesTags: ["product"],
    }),

    // delete cart path: "/delete/cart/:user_id/:id" (private) (DELETE)
    deleteCartById: builder.mutation({
      query: (endpoint) => ({
        url: endpoint,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      invalidatesTags: ["product"],
    }),

    // get cart count path: "/cart/count/products/:id" (private) (GET)
    getCartCount: builder.query({
      query: (id) => ({
        url: `cart/count/products/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }),
      providesTags: ["product"],
    }),
  }),
});

export const {
  useAddCartMutation,
  useGetCartProductQuery,
  useUpdateCartByIdMutation,
  useDeleteCartByIdMutation,
  useGetCartCountQuery,
} = cartAPi;
