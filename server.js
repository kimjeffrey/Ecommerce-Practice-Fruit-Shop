const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config()
const stripe =  require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// console.log(process.env.NODE_ENV);
// console.log(port);

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER_AND_PASSWORD}@cluster0.r1bi4.mongodb.net/fruitShopDB?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err))

const fruitSchema = new mongoose.Schema({
  fruitName: String,
  imgLink: String,
  price: String,
  description: String
})

const Fruit = mongoose.model("Fruit", fruitSchema);

app.get('/backend', (req, res) => {
  Fruit.find((err, foundFruits) => {
    if(err){
      console.log(err);
    } else{
      res.send(foundFruits);
    }
  })
})

app.post('/backend/payment_intents', async (req, res) => {
  try {
    const {amount} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd'
    });
    res.status(200).json({clientSecret: paymentIntent.client_secret});
  } catch(err) {
    res.status(500).json({statusCode: 500, message: err.message});
  }
})

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
