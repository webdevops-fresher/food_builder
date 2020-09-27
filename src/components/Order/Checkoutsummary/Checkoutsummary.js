import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import "./Checkoutsummary.css";

const checkoutsummary = (props) => {
  return (
    <div className="Checkout">
      <h1>YOUR DELICIOUS ORDER</h1>
      <div>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutsummary;
