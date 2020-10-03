import React, { Component, PureComponent } from "react";
import Button from "../../../components/UI/Button/Button";

import "./Contactform.css";
import axios from "../../../axios-order";
import { Redirect } from "react-router-dom";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
class ContactData extends PureComponent {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      pincode: "",
    },
    ingredients: {},
    price: "",
    deliveryType: "",
  };

  orderHandler = (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: this.state.name,
        email: this.state.email,
        street: this.state.street,
        pincode: this.state.pincode,
      },
      email: this.state.email,
      deliveryMethod: this.state.deliveryType,
      userId:localStorage.getItem('userId')
    };
    axios
      .post(`/orders.json`, order)
      .then((response) => {
        alert("order made");
        return <Redirect to="/" />;
      })
      .catch((err) => {
        alert("please try after some time", err);
      });
  };

  onChangeInput = (e) => {
    let target = e.target.name;
    switch (target) {
      case "name":
        this.setState({ name: e.target.value });
        break;
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "street":
        this.setState({ address: { street: e.target.value } });
        break;
      case "pincode":
        this.setState({ address: { pincode: e.target.value } });
        break;
      default:
        this.setState({ deliveryType: e.target.value });
    }
  };

  componentDidMount() {
    let price = 0;
    const selectedIngredients = this.props.location.state;
    const iKeys = Object.keys(selectedIngredients);
    iKeys.map((iKey, index) => {
      price += INGREDIENT_PRICES[iKey] * selectedIngredients[iKey];
    });
    this.setState({ ingredients: selectedIngredients });
    this.setState({ price: price });
  }

  render() {
    return (
      <div className="Checkout-Form">
        <form>
          <input
            type="text"
            name="email"
            placeholder="enter your email"
            value={this.state.email}
            onChange={this.onChangeInput}
          />
          <input
            type="text"
            name="name"
            placeholder="enter your name"
            value={this.state.name}
            onChange={this.onChangeInput}
          />
          <input
            type="text"
            name="street"
            placeholder="enter your street"
            value={this.state.address.street}
            onChange={this.onChangeInput}
          />
          <input
            type="text"
            name="pincode"
            placeholder="enter your pincode"
            value={this.state.address.pincode}
            onChange={this.onChangeInput}
          />
          <div onChange={this.onChangeInput} value={this.state.deliveryType}>
            <label>Fastest</label>
            <input type="radio" name="deliverytype" value="fastest" />
            <label>Slowest</label>
            <input type="radio" name="deliverytype" value="slowest" />
            <label>Standard</label>
            <input type="radio" name="deliverytype" value="standard" />
          </div>
          <Button
            btnType="Success"
            clicked={this.orderHandler}
            disabled={
              this.state.name === "" ||
              this.state.email === "" ||
              this.state.address.street === "" ||
              this.state.address.pincode === "" ||
              this.state.deliveryType === ""
            }
          >
            Place Order
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
