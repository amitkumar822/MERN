import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
} from "./ActionType";

const token = localStorage.getItem("jwt");

export const findProducts = (reqData) => async (dispatch) => {
  // console.log("ReD: ",reqData.colors);
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;
  
  console.log("colors: ",colors);

  try {
    const { data } = await axios.get(
      // `/api/products?colors=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      '/api/products?colors="white"',
      // '/api/products?size="L"'
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("findProducts product data: ", data);

    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.log("findProducts Error: ", error.message);
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const findProductById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const { productId } = reqData;
  // console.log("findProductById productId: ", productId);

  try {
    const { data } = await api.get(`/api/products/id/${productId}`);

    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    // console.log("findProductById Error: ", error.message);
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};
