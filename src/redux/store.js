import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reCardUpdate } from "./cart";
import { reModal } from "./modal";
import { reLocation } from "./location";
import { rePrice } from "./price";
import { reLoading } from "./loading";
import { reSearch } from "./search";
import { cartAPi } from "../services/cart.service";
import { favoriteAPi } from "../services/fav.service";
import { favFoodAPi } from "../services/food.service";
import { universalAPi } from "../services/product.service";
import { userAPi } from "../services/user.service";

export const store = configureStore({
  reducer: combineReducers({
    updateCard: reCardUpdate,
    modal: reModal,
    location: reLocation,
    price: rePrice,
    loading: reLoading,
    search: reSearch,
    [cartAPi.reducerPath]: cartAPi.reducer,
    [favoriteAPi.reducerPath]: favoriteAPi.reducer,
    [favFoodAPi.reducerPath]: favFoodAPi.reducer,
    [universalAPi.reducerPath]: universalAPi.reducer,
    [userAPi.reducerPath]: userAPi.reducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cartAPi.middleware,
      favoriteAPi.middleware,
      favFoodAPi.middleware,
      universalAPi.middleware,
      userAPi.middleware
    ),
});
