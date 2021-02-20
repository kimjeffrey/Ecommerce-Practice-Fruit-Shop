import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

export default function Success() {

  const history = useHistory();

  useEffect(() => {
    setTimeout(() => history.push("/products"), 8000);
  }, [])

  return (
    <div className="container">
      <h1>Success!</h1>
      <p>Your transaction was successfully processed. Thank you for your purchase!</p>
      <p>Redirecting back to shop...</p>
    </div>
  )
}