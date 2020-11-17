import React, {useEffect} from 'react';
import {Route, Switch} from "react-router-dom";
import {useDispatch} from 'react-redux';
import Navbar from './Navbar';
import Home from './Home';
import Details from './Details';
import Cart from './Cart';
import Checkout from './Checkout';
import Error from './Error';

function App() {

  const dispatch = useDispatch();
  const localCart = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    if(localCart){
      localCart.forEach(fruit => {
        dispatch({type: 'ADD_TO_CART', fruit});
      })
    }
  }, [])

  return (
    <React.Fragment>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/details" component={Details}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route path="/checkout" component={Checkout}></Route>
        <Route component={Error}></Route>
      </Switch>

    </React.Fragment>
  );
}

export default App;
