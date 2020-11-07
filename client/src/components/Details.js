import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from './actions/addToCart';

export default function Details(props){

  const dispatch = useDispatch();
  const selectedData = useSelector(state => state);
  const {fruitName, imgLink, price, description} = props.location.state;

  function handleClick(event){
    dispatch(addToCart({
      fruitName: fruitName,
      imgLink: imgLink,
      price: price,
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
    let exists = selectedData.find(cartItem => cartItem.fruitName === fruitName);
    if(exists){
      return true;
    } else {
      return false;
    }
  }

  return(
    <div id="details-container">
      <h1 id="details-heading">{fruitName}</h1>
      <img id="details-img" src={imgLink} alt="fruit" />
      <h2 id="details-price">{price}</h2>
      <p id="details-description">{description}</p>
      <div id="details-buttons">
        <button onClick={handleClick} disabled={checkInCart()}>{checkInCart()?"Added to Cart":"Add to Cart"}</button>
        <Link to="/">
          <button>Back to Products</button>
        </Link>
      </div>
    </div>
  )
}
