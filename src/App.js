import React from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from './containers/Auth/Auth';
import Logout from "./containers/Auth/logout";
import {connect} from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/orders" component={Orders} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/auth" component={Auth}/>
            <Route path="/logout" component={Logout} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}


const mapStateToProps=state=>{
  return {
    authState:state.auth
  }
}


export default connect(mapStateToProps,null)(App);
