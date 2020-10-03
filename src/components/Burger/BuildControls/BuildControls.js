import React from "react";
import BuildControl from "./BuildControl/BuildControl";

import "./BuildControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
];
function BuildControls(props) {
  console.log('>>>props hceck flag point',props.isAuthenticated,props.purchaseable);
  const controlMenu = controls.map((menuItem, index) => {
    return (
      <BuildControl
        key={index}
        menuItem={menuItem}
        addIngredient={props.addIngredient}
        removeIngredient={props.removeIngredient}
        disabled={props.disabledInfo[menuItem.type]}
      />
    );
  });
  return (
    <div className="Controls">
      <p className="Label">
        {props.price.toFixed(2) < 0
          ? -props.price.toFixed(2)
          : props.price.toFixed(2)}
      </p>
      {controlMenu}
      <button
        className="OrderButton"
        disabled={!(props.purchaseable && props.isAuthenticated!=null)}
        onClick={props.purchase}
      >
        {props.isAuthenticated?"Order Now":"Login to order"}
      </button>
    </div>
  );
}

export default BuildControls;
