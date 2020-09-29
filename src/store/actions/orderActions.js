import { ALL_ORDERS } from "./actionTypes";
import axios from '../../axios-order';

export const getAllOrders=()=>{
    return async function(dispatch){
        axios
        .get("/orders.json")
        .then((response) => {
          dispatch({ type: ALL_ORDERS, payload: response.data });
        })
        .catch((err) => {
          dispatch({ type: ALL_ORDERS, payload: [] });
        });
    }
}