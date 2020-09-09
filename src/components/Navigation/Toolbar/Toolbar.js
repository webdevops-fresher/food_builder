import React from "react";

import Logo from '../../Layout/Logo/Logo';

import './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';

function Toolbar(props) {
  return (
    <header className="Toolbar">
      <div onClick={props.showSideDrawer}>Menu</div>
      <Logo />
      <nav className="Nav">
        <NavigationItems/>
      </nav>
    </header>
  );
}

export default Toolbar;
