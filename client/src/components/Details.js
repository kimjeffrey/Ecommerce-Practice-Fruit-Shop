import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from './actions/addToCart';

export default function Details(props){

  const dispatch = useDispatch();
  const selectedData = useSelector(state => state);
  const {fruitName, imgLink, price, description} = props.location.state;
  const fruitItem = {
    fruitName: fruitName,
    imgLink: imgLink,
    price: price,
    count: 1
  };

  const [count, setCount] = useState(1);

  function handleClick(event){
    fruitItem.count = count;

    dispatch(addToCart(fruitItem, count));

    let localCart = JSON.parse(localStorage.getItem("cart"));
    if(localCart){
      let exists = localCart.find(cartItem => cartItem.fruitName === fruitName);
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
    let exists = selectedData.find(cartItem => cartItem.fruitName === fruitName);
    if(exists){
      return exists.count;
    } else {
      return false;
    }
  }

  return(
    <div className="container">
      <div className="details-container">
        <img className="details-img" src={"/images/" + imgLink} alt={fruitName} />
        <h1 className="details-heading">{fruitName}</h1>
        <p className="details-description">{description}</p>
        <h2 className="details-price">{price}</h2>
        <div className="details-count-btns">
          <button className="details-count-btn" onClick={handleDecrement}>-</button>
          <p>{count}</p>
          <button className="details-count-btn" onClick={handleIncrement}>+</button>
        </div>
        <p className="details-total-price">Total: ${(price.slice(1) * count).toFixed(2)}</p>
        {checkCountInCart() &&
          <p className="details-cart-count">{checkCountInCart()} in Cart</p>
        }
        <div className="details-buttons">
          <button className="green-btn" onClick={handleClick}>Add to Cart</button>
          <Link to="/products">
            <button className="green-btn">Back to Products</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
