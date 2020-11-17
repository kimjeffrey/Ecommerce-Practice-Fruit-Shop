import React, {useState} from 'react';

export default function Checkout(){

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);

  function handleChange(event){
    if(event.target.name === "name"){
      setName(event.target.value);
    } else if(event.target.name === "email"){
      setEmail(event.target.value);
    }
  }

  function handleSubmit(event){
    setSubmit(!submit);
    event.preventDefault();
  }

  return(
    <React.Fragment>
      <form className="checkout-container" onSubmit={handleSubmit}>
        <h1>Checkout</h1>
        <label>
          Name:
          <input type="text" name="name" value={name} onChange={handleChange}/>
        </label>
        <label>
          Email:
          <input type="email" name="email" value={email} onChange={handleChange}/>
        </label>
        <input type="submit" value="Make Payment" />
      </form>
      {submit && <p>Thank you for your purchase!</p>}
    </React.Fragment>
  )
}
