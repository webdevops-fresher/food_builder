import React from 'react';

import  './Button.css';

function Button(props){
    return (
        <button onClick={props.clicked} className={[Button,props.btnType].join(' ')}>
            {props.children}
        </button>
    );
}



export default Button;
