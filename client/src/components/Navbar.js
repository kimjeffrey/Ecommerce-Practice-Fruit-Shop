import React from 'react';
import {Link} from 'react-router-dom';

export default function Navbar(){

  return(
    <nav className="navbar">
      <div className="logo">
        <Link className="navbar-link" to="/">Awesome Fruits</Link>
      </div>
      <div className="nav-links">
        <Link className="navbar-link" to="/Products">Shop</Link>
        <Link className="navbar-link" to="/Cart">Cart</Link>
      </div>
    </nav>
  )
}
