import React from "react";

import Button from "../../UI/Button/Button";

class OrderSummary extends React.Component {

  render(){
  const ingredientsSummary = Object.keys(this.props.ingredients).map(
    (igKey, index) => {
      return (
        <li key={index}>
          <span>{igKey}</span>:{this.props.ingredients[igKey]}
        </li>
      );
    }
  );
  return (
    <div>
      <h3>Your order</h3>
      <ul>{ingredientsSummary}</ul>
      <h3>{this.props.price} $</h3>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={this.props.purchaseCancel}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={this.props.purchaseContinued}>
        Continue
      </Button>
    </div>
  );
  }
}

export default OrderSummary;
