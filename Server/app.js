const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// .env
const dotenv = require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


const routes = require('./routes/api/subscriptions')

const app = express();

connectDB();
app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));



app.get('/api/payment-intent', (req, res) => res.send('payment-intent route test! : '+ process.env.STRIPE_SECRET_KEY));


app.post('/api/create-payment-intent', async (req, res) => {
  
  try{
      const { amount } = req.body;
      // Create PaymentIntent with thr order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        // calculate the amount on the server side to avoid manipulation
        amount: 1000,
        currency: "usd"
      });
      res.status(200).send(paymentIntent.client_secret);
  }
  catch(err){
    res.status(500).json({ statusCode: 500, message: err.mesage});
  }
  

});

app.use('/api/subscriptions', routes);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));