import React from "react";

import "./Modal.css";
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.PureComponent{

  // shouldComponentUpdate(nextProps,nextState){   //for performance
  //   return nextProps.show!==this.props.show;
  // }

  render(){
    return (
      <>
      <Backdrop show={this.props.show} togglePurchasing={this.props.togglePurchasing}/>
      <div
        className="Modal"
        style={{
          transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: this.props.show ? "1" : "0",
        }}
      >
        {this.props.children}
      </div>
      </>
    );
  }
};

export default Modal;
