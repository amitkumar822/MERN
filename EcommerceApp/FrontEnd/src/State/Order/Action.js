import { type } from "express/lib/response";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
  console.log("reqData: ", reqData);

  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const { data } = await api.post(`/api/orders`, reqData.address);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch error: ", error);
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.message,
    });
  }
};

export const getOrderById = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });

    const { data } = await api.get(`/api/orders/${orderId}`);

    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch error: ", error);
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};
