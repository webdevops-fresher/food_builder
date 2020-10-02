import * as actionTypes from "../actions/actionTypes";

const initialState = {
  allOrders: [],
  ordersError:null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_ORDERS:
      const payload = action.payload;
      let orderIds = Object.keys(payload);
      let orders = orderIds.map((id) => payload[id]);
      return { ...state, allOrders: orders,ordersError:null };
    case actionTypes.ERROR_ORDERS:
      return {...state,allOrders:[],ordersError:action.payload}
    default:
      return state;
  }
};


export default reducer;