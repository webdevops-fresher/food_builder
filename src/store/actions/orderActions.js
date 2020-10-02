import { ALL_ORDERS, ERROR_ORDERS } from "./actionTypes";
import axios from '../../axios-order';

export const getAllOrders=(token)=>{
    return async function(dispatch){
        axios
        .get(`/orders.json?auth=${token}`)
        .then((response) => {
          dispatch({ type: ALL_ORDERS, payload: response.data });
        })
        .catch((error) => {
          dispatch({ type: ERROR_ORDERS, payload: error.response.statusText });
        });
    }
}