import React from 'react';


import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

function NavigationItems(props) {
    return (
        <div>
            <ul className="NavigationItems">
                <NavigationItem link="/" active>Burger Builder</NavigationItem>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/auth">Authenticate</NavigationItem>
            </ul>
        </div>
    )
}

export default NavigationItems
