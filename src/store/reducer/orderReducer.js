import * as actionTypes from "../actions/actionTypes";

const initialState = {
  allOrders: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_ORDERS:
      const payload = action.payload;
      let orderIds = Object.keys(payload);
      let orders = orderIds.map((id) => payload[id]);
      return { ...state, allOrders: orders };
    default:
      return state;
  }
};


export default reducer;