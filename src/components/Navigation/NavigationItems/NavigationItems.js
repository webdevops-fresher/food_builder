import React from 'react';
import {useSelector} from 'react-redux';


import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

function NavigationItems(props) {
    const authState=useSelector(state=>state.auth);
    return (
        <div>
            <ul className="NavigationItems">
                <NavigationItem link="/" active>Burger Builder</NavigationItem>
                {authState.idToken!=null?<NavigationItem link="/orders">Orders</NavigationItem>:null}
                {authState.idToken!=null?
                 <NavigationItem link="/logout">Logout</NavigationItem>
                :
                <NavigationItem link="/auth">Authenticate</NavigationItem>
                }
            </ul>
        </div>
    )
}

export default NavigationItems
