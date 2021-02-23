import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Navbar(){

  const selectedData = useSelector(state => state);

  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
  }

  function checkCountInCart(){
    let count = 0;
    if(selectedData){
      selectedData.forEach(cartItem => {
        count += cartItem.count;
      })
    }
    return count;
  }

  return(
    <>
    <nav className="navbar">
      <div className="logo">
        <Link className="navbar-link" to="/">Awesome Fruits</Link>
      </div>
      <div className="nav-links">
        <Link className="navbar-link" to="/Products">Shop</Link>
        <Link className="navbar-link" to="/Cart">
          Cart
          {checkCountInCart() !== 0 && 
            <div className="navbar-cart-count">
              {checkCountInCart()}
            </div> 
          }
        </Link>
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
