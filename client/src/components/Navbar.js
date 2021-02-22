import React, {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Navbar(){

  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
  }

  return(
    <>
    <nav className="navbar">
      <div className="logo">
        <Link className="navbar-link" to="/">Awesome Fruits</Link>
      </div>
      <div className="nav-links">
        <Link className="navbar-link" to="/Products">Shop</Link>
        <Link className="navbar-link" to="/Cart">Cart</Link>
      </div>
      <div className="hamburger-menu" onClick={handleClick}>&#9776;</div>
    </nav>
    {isClicked &&
      <div className="hamburger-nav-links">
        <Link className="navbar-link" to="/Products">Shop</Link>
        <Link className="navbar-link" to="/Cart">Cart</Link>
      </div>
    }
    </>
  )
}
