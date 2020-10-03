import React from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandler from "../../components/UI/errorHandler/ErrorHandler";

import axios from "../../axios-order";
import {connect} from 'react-redux';
import { addIngredient, fetchIngredients, removeIngredient } from "../../store/actions/burgerBuilder";

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
    this.props.onFetchIngredients();
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
            isAuthenticated={this.props.authToken}
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
    ings:state.burger.ingredients,
    totalPrice:state.burger.totalPrice,
    purchaseable:state.burger.purchaseable,
    authToken:state.auth.idToken
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    onIngredientAdded:(ingName)=>{dispatch(addIngredient(ingName))},
    onIngredientRemoved:(ingName)=>{dispatch(removeIngredient(ingName))},
    onFetchIngredients:()=>{dispatch(fetchIngredients())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(BurgerBuilder, axios));
