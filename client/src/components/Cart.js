import React from 'react';
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
    removeFromLocalStorage(fruitName);
  }

  function handleDecrement(fruitName, count) {
    if(count === 1){
      dispatch(deleteItem(fruitName));
      removeFromLocalStorage(fruitName);
    } else{
      dispatch(decrementCount(fruitName));
      editCountLocalStorage("decrement", fruitName);
    }
  }

  function handleIncrement(fruitName) {
    dispatch(incrementCount(fruitName));
    editCountLocalStorage("increment", fruitName);
  }

  function removeFromLocalStorage(fruitName){
    let localCart = JSON.parse(localStorage.getItem("cart"));
    let exists = localCart.find(cartItem => cartItem.fruitName === fruitName);
    let index = localCart.indexOf(exists);
    localCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(localCart));
  }

  function editCountLocalStorage(type, fruitName){
    let localCart = JSON.parse(localStorage.getItem("cart"));
    let exists = localCart.find(cartItem => cartItem.fruitName === fruitName);
    let index = localCart.indexOf(exists);

    if(type === "increment"){
      localCart[index].count++;
    } else if(type ==="decrement"){
      localCart[index].count--;
    }

    localStorage.setItem("cart", JSON.stringify(localCart));
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
              <button className="cart-count-btn" onClick={() => {handleDecrement(cartItem.fruitName, cartItem.count)}}>-</button>
              <p>{cartItem.count}</p>
              <button className="cart-count-btn" onClick={() => {handleIncrement(cartItem.fruitName)}}>+</button>
            </div>
          </div>
      )) : <p className="cart-empty">The cart is empty.</p>}
      <div className="cart-summary">
        <h2>Summary</h2>
        {items.map(cartItem => (
          <div className="cart-summary-item">
            <p>{cartItem.fruitName} (x{cartItem.count})</p>
            <p>${(cartItem.price.slice(1) * cartItem.count).toFixed(2)}</p>
          </div>
        ))}
        <p className="cart-total-price">Subtotal: ${calculateTotal().toFixed(2)}</p>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  )
}
