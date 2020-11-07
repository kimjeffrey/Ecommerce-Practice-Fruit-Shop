import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Product from './Product';

export default function Home(){

  let productList;
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  //const localCart = JSON.parse(localStorage.getItem("cart"));

  //const [productList, setProductList] = useState([]);
  // useEffect(() => {
  //   if(localCart){
  //     localCart.forEach(fruit => {
  //       dispatch({type: 'ADD_TO_CART', fruitName: fruit});
  //     })
  //   }
  // }, [])

  useEffect(() => {
    callBackend()
      .then(res => setData(res))
      .catch(err => console.log(err))
  }, [])

  async function callBackend() {
    const response = await fetch('/backend');
    const body = await response.json();

    if(response.status !== 200){
      console.log('error');
    } else{
      return body;
    }
  }


  return (
    <React.Fragment>
      <h1>Our Products</h1>
      <div className="product-grid">
        {data.map(product => (
          <Product fruitName={product.fruitName} imgLink={product.imgLink} price={product.price} description={product.description} />
        ))}
      </div>
    </React.Fragment>
  )
}
