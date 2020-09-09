import React from 'react';

import BurgerLogo from '../../../assets/project_logo.png';

function Logo() {
    return (
        <div>
            <img src={BurgerLogo} alt="burgerrr" style={{height:'50px',width:'60px'}}/>
        </div>
    )
}

export default Logo
