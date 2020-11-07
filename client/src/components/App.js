import React from 'react';
import {Route, Switch} from "react-router-dom";
import Navbar from './Navbar';
import Home from './Home';
import Details from './Details';
import Cart from './Cart';
import Error from './Error'

function App() {

  return (
    <React.Fragment>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/details" component={Details}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route component={Error}></Route>
      </Switch>

    </React.Fragment>
  );
}

export default App;
