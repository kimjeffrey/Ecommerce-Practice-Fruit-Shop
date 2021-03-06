import React, {useEffect, useState} from 'react';
import Product from './Product';

export default function Products(){

  const [data, setData] = useState([]);

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
    <div className="container">
      <h1>Our Products</h1>
      <div className="product-grid">
        {data.map(product => (
          <Product fruitName={product.fruitName} imgLink={product.imgLink} price={product.price} description={product.description} />
        ))}
      </div>
    </div>
  )
}
