import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from './actions/addToCart';

export default function Product(props){

  const dispatch = useDispatch();
  const selectedData = useSelector(state => state);
  const localCart = JSON.parse(localStorage.getItem("cart"));

  function handleClick(event){
    dispatch(addToCart({
      fruitName: props.fruitName,
      imgLink: props.imgLink,
      price: props.price,
      count: 1
    }));
    // if(localCart){
    //   localCart.push(props.fruitName);
    //   localStorage.setItem("cart", JSON.stringify(localCart));
    // } else{
    //   localStorage.setItem("cart", JSON.stringify([props.fruitName]));
    // }
  }

  function checkInCart(){
    let exists = selectedData.find(cartItem => cartItem.fruitName === props.fruitName);
    if(exists){
      return true;
    } else {
      return false;
    }
  }

  return(
    <div className="card">
      <h1 className="card-title">{props.fruitName}</h1>
      <Link to={{
        pathname:"/details",
        state: {
          fruitName: props.fruitName,
          imgLink: props.imgLink,
          price: props.price,
          description: props.description
        }
      }}>
        <img alt="fruit" src={props.imgLink} />
      </Link>
      <p>{props.price}</p>
      <button className="cart-btn" onClick={handleClick} disabled={checkInCart()}>{checkInCart()?"Added to Cart":"Add to Cart"}</button>
    </div>
  )
}
