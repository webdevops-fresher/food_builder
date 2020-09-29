import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName: ingName,
  };
};

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: ingName,
  };
};

export const fetchIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://food-builder-bc122.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((err) => {
        this.setState({ ingredients: null });
      });
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS,
    ingredients,
  };
};
