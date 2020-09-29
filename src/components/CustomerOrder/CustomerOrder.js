import React, { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { getAllOrders } from "../../store/actions/orderActions";



import './CustomerOrder.css';


function CustomerOrder() {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.orders).allOrders;

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        {allOrders.map((order, index) => {
          return (
            <li key={index}>
              <div style={{border:'1px solid #ccc',maxWidth:'60%',margin:'auto',marginBottom:'10px'}}>
                <label>Email:</label>
                <div>{order.email}</div>
                <label>Price:</label>
                <div>{order.price}</div>
                <label>Delivery Type:</label>
                <div>{order.deliveryMethod}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CustomerOrder;
