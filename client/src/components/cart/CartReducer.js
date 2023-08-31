import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartItemsLength: [],
    loading: false,
    error: null,
  },
  reducers: {
    addItem: (state, action) => {
      state.wasAdded = action.payload.res;
    },
    getItems: (state, action) => {
      state.cartItems = action.payload;
    },
    getItemsLength: (state, action) => {
      state.cartItemsLength = action.payload;
    },
    removeItem: (state) => {
      state.wasAdded = "product was deleted successfully";
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addItem, getItems, getItemsLength, removeItem, setLoading } =
  cartSlice.actions;
export default cartSlice.reducer;
