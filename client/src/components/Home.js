import React from 'react';
import {Link} from 'react-router-dom';

export default function Home(){
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Fresh and Delicious</h1>
        <p>No more going out to get your fill of fruits. <br/>
          All your fresh fruit needs in one place.
        </p>
        <Link to="/products" className="home-button">Shop Now</Link>
      </div>
    </div>
  )
}