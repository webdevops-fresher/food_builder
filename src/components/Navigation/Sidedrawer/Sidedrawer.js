import React from 'react';

import Logo from '../../Layout/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import './Sidedrawer.css';

function Sidedrawer(props){
    let classes=["Sidedrawer","Close"];
    if(props.open){
        classes=["Sidedrawer","Open"];
    }
    return (
        <>
        <Backdrop show={props.open} togglePurchasing={props.closed}/>
        <div className={classes.join(' ')}>
            <Logo/>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </>
    );
}



export default Sidedrawer;
