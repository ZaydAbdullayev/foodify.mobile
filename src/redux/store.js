import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reCardUpdate } from "./cart";
import { reModal } from "./modal";
import { reLocation } from "./location";
import { rePrice } from "./price";
import { reLoading } from "./loading";
import { reSearch } from "./search";

export const store = configureStore({
  reducer: combineReducers({
    updateCard: reCardUpdate,
    modal: reModal,
    location: reLocation,
    price: rePrice,
    loading: reLoading,
    search: reSearch,
  }),
});
