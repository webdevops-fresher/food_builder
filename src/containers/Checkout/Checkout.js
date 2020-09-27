import React from "react";
import CheckoutSummary from "../../components/Order/Checkoutsummary/Checkoutsummary";
import ContactData from "./Contactform/Contactform";

import { Route, withRouter } from "react-router-dom";
import './Checkout.css';

class Checkout extends React.PureComponent {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
  };

  checkoutCancelled = () => {
    this.props.history.replace({
        pathname:'/checkout',
        state:this.state.ingredients
    })
  };

  checkoutContinued = () => {
    this.props.history.push({
      pathname: "/checkout/contact-data",
      state: this.props.location.state,
    });
  };

  componentDidMount() {
    const cartIngredients = this.props.location.state;
    this.setState({ ingredients: cartIngredients });
  }

  render() {
    return (
      <div className="Checkout">
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

export default withRouter(Checkout);
