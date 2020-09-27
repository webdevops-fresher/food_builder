import * as actionTypes from "./actions";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    bacon: 0,
    meat: 0,
  },
  totalPrice: 4,
  purchaseable: false,
};

const reducer = (state = initialState, action) => {
  let newIngredients = {};
  let count = 0;
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      newIngredients = {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      };
      count = Object.keys(newIngredients)
        .map((key) => newIngredients[key])
        .reduce((sum, el) => sum + el, 0);
      return {
        ...state,
        ingredients: newIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        purchaseable: count > 0,
      };
    case actionTypes.REMOVE_INGREDIENTS:
      newIngredients = {
        ...state.ingredients,
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      };
      count = Object.keys(newIngredients)
        .map((key) => newIngredients[key])
        .reduce((sum, el) => sum + el, 0);
      return {
        ...state,
        ingredients: newIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        purchaseable: count > 0,
      };
    default:
      return state;
  }
};

export default reducer;
