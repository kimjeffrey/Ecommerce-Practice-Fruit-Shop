const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

console.log(process.env.NODE_ENV);
console.log(port);



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

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
