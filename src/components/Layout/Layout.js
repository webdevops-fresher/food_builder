import React from "react";
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends React.Component{
  state={
    showSidedrawer:false
  }
  showSideDrawer=()=>{
    let newShowSideDrawer=!this.state.showSidedrawer;
    this.setState({showSidedrawer:newShowSideDrawer})
  }
  render(){
    return (
      <>
        <Toolbar showSideDrawer={this.showSideDrawer}/>
        <Sidedrawer open={this.state.showSidedrawer} closed={this.showSideDrawer}/>
        <main className="Content">{this.props.children}</main>
      </>
    );
  }
};

export default Layout;
