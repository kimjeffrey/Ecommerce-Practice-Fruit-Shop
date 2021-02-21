import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from './actions/addToCart';
import CSSTransitionGroup from 'react-transition-group';

export default function Product(props){
  const dispatch = useDispatch();
  const selectedData = useSelector(state => state);
  const fruitItem = {
    fruitName: props.fruitName,
    imgLink: props.imgLink,
    price: props.price,
    count: 1
  };

  const [isHovered, setIsHovered] = useState(false);
  const [count, setCount] = useState(1);

  function handleClick(event){
    fruitItem.count = count;

    dispatch(addToCart(fruitItem, count));

    let localCart = JSON.parse(localStorage.getItem("cart"));
    if(localCart){
      let exists = localCart.find(cartItem => cartItem.fruitName === props.fruitName);
      if(exists) {
        let index = localCart.indexOf(exists);
        localCart[index].count += count;
      } else {
        localCart.push(fruitItem);
      }
      localStorage.setItem("cart", JSON.stringify(localCart));
    } else{
      localStorage.setItem("cart", JSON.stringify([fruitItem]));
    }

    setCount(1);
  }

  function handleDecrement() {
    setCount(prev => {
      if(prev === 1){
        return prev;
      } else {
        return prev - 1;
      }
    })
  }

  function handleIncrement() {
    setCount(count + 1);
  }

  function checkCountInCart(){
    let exists = selectedData.find(cartItem => cartItem.fruitName === props.fruitName);
    if(exists){
      return exists.count;
    } else {
      return false;
    }
  }

  return(
    <>
    <div className="product-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link to={{
        pathname:"/details",
        state: {
          fruitName: props.fruitName,
          imgLink: props.imgLink,
          price: props.price,
          description: props.description
        }
      }}>
        <img alt={props.fruitName} src={"/images/" + props.imgLink} />
      </Link>
      <h1 className="product-card-title">{props.fruitName}</h1>
      <p>{props.price}</p>
      <p>{checkCountInCart() ? checkCountInCart() : 0} in Cart</p>
      <div className="product-card-hover-content">
        <div className="cart-count-btns">
          <button className="cart-count-btn" onClick={handleDecrement}>-</button>
          <p>{count}</p>
          <button className="cart-count-btn" onClick={handleIncrement}>+</button>
        </div>
        <p>Total: ${(props.price.slice(1) * count).toFixed(2)}</p>
        <button className="green-btn" onClick={handleClick}>Add to Cart</button>
        <p>{checkCountInCart() ? checkCountInCart() : 0} in Cart</p>
      </div>
    </div>
    
    </>
  )
}
