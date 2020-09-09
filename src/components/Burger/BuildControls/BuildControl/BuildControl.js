import React from 'react';

import './BuildControl.css';
import propTypes from 'prop-types';

function BuildControl(props){
    return (
        <div className="BuildControl">
            {props.menuItem.label}
            <button 
            className="BuildControl button" 
            onClick={()=>props.removeIngredient(props.menuItem.type)}
            disabled={props.disabled}
            >
                remove
            </button>
            <button 
            className="BuildControl button" 
            onClick={()=>props.addIngredient(props.menuItem.type)}
            >add</button>
        </div>
    );
}

BuildControl.propTypes={
    menuItem:propTypes.object.isRequired
}


export default BuildControl;