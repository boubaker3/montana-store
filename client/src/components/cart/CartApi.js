import { useDispatch } from "react-redux";
import {
  setLoading,
  getItems,
  addItem,
  removeItem,
  getItemsLength,
} from "./CartReducer";
import axiosInstance from "../Axios";

export const useGetCart = () => {
  const dispatch = useDispatch();

  const getCart = async (userid, page) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get("cart/getCart", {
        params: {
          userid,
          page,
        },
      });
      dispatch(setLoading(false));
      dispatch(getItems(response.data));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  return getCart;
};

export const useGetCartLength = () => {
  const dispatch = useDispatch();
  const getCartLength = async (userid) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get("cart/getCartLength", {
        params: {
          userid,
        },
      });
      dispatch(setLoading(false));
      dispatch(getItemsLength(response.data));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  return getCartLength;
};

export const useDeleteCart = () => {
  const dispatch = useDispatch();

  const deleteCart = async (id) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.delete("cart/deleteCart", {
        params: {
          id,
        },
      });
      dispatch(setLoading(false));
      dispatch(removeItem(response.data));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  return deleteCart;
};

export const useAddToCart = () => {
  const dispatch = useDispatch();
  const addToCart = async ({
    productName,
    productImage,
    sellPrice,
    pid,
    userid,
  }) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.post("cart/addToCart", {
        productName,
        productImage,
        sellPrice,
        pid,
        userid,
      });
      dispatch(setLoading(false));
      dispatch(addItem(response.data));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  return addToCart;
};
