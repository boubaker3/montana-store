import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import cartSlice from "./cart/CartReducer";
const store = configureStore(
  {
    reducer: {
      cart: cartSlice,
    },
  },
  applyMiddleware(thunk)
);
export default store;
