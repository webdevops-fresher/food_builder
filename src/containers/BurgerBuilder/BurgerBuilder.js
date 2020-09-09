import React from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
class BurgerBuilder extends React.PureComponent {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0,
    },
    price: 0,
    purchaseable: false,
    purchasing: false,
  };

  //toggle orderSummary
  purchaseHandler = () => {
    this.setState({ purchasing: !this.state.purchasing });
  };

  //disable-enable orderNow button
  updatePurchaseable = (ingredients) => {
    const ingredientsPresent = Object.keys(ingredients)
      .map((igKey, index) => {
        return ingredients[igKey];
      })
      .reduce((sum, el, index) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: ingredientsPresent > 0 });
  };

  //addIngredient
  addIngredient = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.price;
    const newPrice = oldPrice + priceAddition;
    this.setState({ price: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseable(updatedIngredients);
  };

  //removeIngredient
  removeIngredient = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.price;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ price: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseable(updatedIngredients);
  };

  //continued on orderSummary
  purchaseContinued = () => {
    alert("pushed to cart");
  };


  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <>
        <Modal
          show={this.state.purchasing}
          togglePurchasing={this.purchaseHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancel={this.purchaseHandler}
            purchaseContinued={this.purchaseContinued}
            price={this.state.price}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
          disabledInfo={disabledInfo}
          price={this.state.price}
          purchaseable={this.state.purchaseable}
          purchase={this.purchaseHandler}
        />
      </>
    );
  }
}

export default BurgerBuilder;
