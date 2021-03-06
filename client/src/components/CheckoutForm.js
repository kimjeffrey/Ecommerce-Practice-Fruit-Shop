import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {deleteItem} from './actions/deleteItem';

export default function CheckoutForm() {

  const [isProcessing, setIsProcessing] = useState(false); 
  const [checkoutError, setCheckoutError] = useState('');

  const items = useSelector(state => state);

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const dispatch = useDispatch();

  function calculateTotal(){
    let totalPrice = 0;
    items.forEach(item => {
      totalPrice += parseFloat(item.price.slice(1) * item.count);
    })
    return totalPrice.toFixed(2);
  }

  function cardChangeHandler(event){
    if(event.error) {
      setCheckoutError(event.error.message);
    } else {
      setCheckoutError();
    }
  }

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setIsProcessing(true);

    const billingDetails = {
      name: event.target.name.value,
      email: event.target.email.value,
      address: {
        city: event.target.city.value,
        line1: event.target.address.value,
        state: event.target.state.value,
        postal_code: event.target.zip.value,
      }
    }

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const {clientSecret} = await callBackend({amount: calculateTotal() * 100});

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails,
    });

    if (error) {
      setCheckoutError(error.message);
      setIsProcessing(false);
    } else {
      //console.log('[PaymentMethod]', paymentMethod);
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      }).then(res => {
        if(res.error) {
          setCheckoutError(res.error.message);
          setIsProcessing(false);
        } else {
          if(res.paymentIntent.status === 'succeeded') {
            history.push("/success");
            deleteCart();
          }
        }
      })
    }
  };

  async function callBackend(data = {}) {
    const response = await fetch('/backend/payment_intents', {
      method: 'POST', 
      headers: {'Content-Type': 'application/JSON'},
      body: JSON.stringify(data)
    });
    const body = await response.json();

    if(response.status !== 200){
      console.log('error');
    } else{
      return body;
    }
  }

  function deleteCart(){
    items.forEach(item => {
      let fruit = item.fruitName;
      dispatch(deleteItem(fruit));
      removeFromLocalStorage(fruit);
    })
  }

  function removeFromLocalStorage(fruitName){
    let localCart = JSON.parse(localStorage.getItem("cart"));
    let exists = localCart.find(cartItem => cartItem.fruitName === fruitName);
    let index = localCart.indexOf(exists);
    localCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(localCart));
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2>Billing Address</h2>
      <label>
        Name
        <input type="text" name="name" />
      </label>
      <label>
        Email
        <input type="email" name="email" />
      </label>
      <label>
        Address
        <input type="adr" name="address" />
      </label>
      <label>
        City
        <input type="text" name="city" />
      </label>
      <div className="state-zip">
        <label>
          State
          <input type="text" name="state" />
        </label>
        <label>
          Zip
          <input type="number" name="zip" />
        </label>
      </div>
      <label>
        Phone number
        <input type="number" name="number" />
      </label>
      <h2>Payment</h2>
      <CardElement onChange={cardChangeHandler}
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
          hidePostalCode: true,
        }}
      />
      {checkoutError && <p>{checkoutError}</p>}
      <button className="green-btn" type="submit" disabled={!stripe || isProcessing}>{isProcessing ? "Processing..." : `Pay $${calculateTotal()}`}</button>
    </form>
  )
}