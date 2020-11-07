import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {decrementCount} from './actions/decrementCount';
import {incrementCount}from './actions/incrementCount';
import {deleteItem} from './actions/deleteItem';

export default function Cart(props){

  const dispatch = useDispatch();
  const items = useSelector(state => state);

  function calculateTotal(){
    let totalPrice = 0;
    items.forEach(item => {
      totalPrice += parseFloat(item.price.slice(1) * item.count);
    })
    return totalPrice;
  }

  function handleDelete(fruitName){
    dispatch(deleteItem(fruitName));
  }

  function handleDecrement(fruitName, count) {
    if(count === 1){
      dispatch(deleteItem(fruitName));
    } else{
      dispatch(decrementCount(fruitName));
    }
  }

  function handleIncrement(fruitName) {
    dispatch(incrementCount(fruitName));
  }

  return(
    <div className="cart-container">
      <h1 className="cart-heading">Your Cart</h1>
      {items.length !== 0 ? items.map(cartItem => (
          <div className="cart-item">
            <img className="cart-image" alt="fruit" src={cartItem.imgLink} />
            <h1 className="cart-fruit-name">{cartItem.fruitName}</h1>
            <button className="cart-delete-btn" onClick={() => {handleDelete(cartItem.fruitName)}}>Remove from cart</button>
            <p className="cart-price">${(cartItem.price.slice(1) * cartItem.count).toFixed(2)}</p>
            <div className="cart-count-btns">
              <button onClick={() => {handleDecrement(cartItem.fruitName, cartItem.count)}}>-</button>
              <p>{cartItem.count}</p>
              <button onClick={() => {handleIncrement(cartItem.fruitName)}}>+</button>
            </div>
          </div>
      )) : <p className="cart-empty">The cart is empty.</p>}
      {items.length !== 0 && <p className="cart-total-price">Total Price: ${calculateTotal().toFixed(2)}</p>}
    </div>
  )
}
