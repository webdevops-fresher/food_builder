import React, { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { getAllOrders } from "../../store/actions/orderActions";



import './CustomerOrder.css';


function CustomerOrder() {
  const dispatch = useDispatch();
  const ordersState = useSelector((state) => state.orders);
  const authState=useSelector(state=>state.auth);


  useEffect(() => {
    const token=authState.idToken;
    dispatch(getAllOrders(token));
  }, []);

  return (
    <div>
      {ordersState.ordersError===null?
      <ul style={{ listStyleType: "none" }}>
        {ordersState.allOrders.map((order, index) => {
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
      </ul>:
      <h3>{ordersState.ordersError}</h3>
      }
    </div>
  );
}

export default CustomerOrder;
