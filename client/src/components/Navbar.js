import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar(){

  return(
    <nav className="navbar">
      <Link className="navbar-link" to="/">Awesome Fruits</Link>
      <Link className="navbar-link" to="/Cart">Cart</Link>
    </nav>
  )
}
