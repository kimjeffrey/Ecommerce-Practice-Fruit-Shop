import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from './actions/addToCart';

export default function Product(props){

  const dispatch = useDispatch();
  const selectedData = useSelector(state => state);
  const fruitItem = {
    fruitName: props.fruitName,
    imgLink: props.imgLink,
    price: props.price,
    count: 1
  };

  function handleClick(event){
    dispatch(addToCart(fruitItem));

    let localCart = JSON.parse(localStorage.getItem("cart"));
    if(localCart){
      localCart.push(fruitItem);
      localStorage.setItem("cart", JSON.stringify(localCart));
    } else{
      localStorage.setItem("cart", JSON.stringify([fruitItem]));
    }
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
      <button className="green-btn" onClick={handleClick} disabled={checkInCart()}>{checkInCart()?"Added to Cart":"Add to Cart"}</button>
    </div>
  )
}
