import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';


import BurgerBuilderReducer from './store/reducer/burgerBuilder';
import OrderReducer from './store/reducer/orderReducer';


const composedEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();
const rootReducer=combineReducers({burger:BurgerBuilderReducer,orders:OrderReducer});
const store=createStore(rootReducer,applyMiddleware(thunk));


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
