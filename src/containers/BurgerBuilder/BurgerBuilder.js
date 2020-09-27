import React from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandler from "../../components/UI/errorHandler/ErrorHandler";

import axios from "../../axios-order";
import {connect} from 'react-redux';
import { ADD_INGREDIENTS, REMOVE_INGREDIENTS } from "../../store/actions";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends React.PureComponent {
  state = {
    purchasing: false,
    loading: false,
  };

  //toggle orderSummary
  purchaseHandler = () => {
    this.setState({ purchasing: !this.state.purchasing });
  };


  
  //continued on orderSummary
  purchaseContinued = () => {
    this.props.history.push({
      pathname: "/checkout",
      state: this.props.ings,
    });
  };

  componentDidMount() {
    axios
      .get("https://food-builder-bc122.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((err) => {
        this.setState({ ingredients: null });
      });
  }

  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = <Spinner />;
    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            price={this.props.totalPrice}
            purchaseable={this.props.purchaseable}
            purchase={this.purchaseHandler}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancel={this.purchaseHandler}
          purchaseContinued={this.purchaseContinued}
          price={this.props.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          togglePurchasing={this.purchaseHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}


const mapStateToProps=state=>{
  return {
    ings:state.ingredients,
    totalPrice:state.totalPrice,
    purchaseable:state.purchaseable
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    onIngredientAdded:(ingName)=>{dispatch({type:ADD_INGREDIENTS,ingredientName:ingName})},
    onIngredientRemoved:(ingName)=>{dispatch({type:REMOVE_INGREDIENTS,ingredientName:ingName})}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
