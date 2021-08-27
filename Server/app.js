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

app.post('/api/create-payment-intent', async (req, res) => {
  
  try{
      console.log(req.body)
      const { amount } = req.body;
      // Create PaymentIntent with thr order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        // calculate the amount on the server side to avoid manipulation
        amount: amount,
        currency: "gbp"
      });
      res.status(200).send(paymentIntent.client_secret);
  }
  catch(err){
    res.status(500).json({ statusCode: 500, message: err.message});
  }
});

app.post('/api/sub', async (req, res) => {
    const {email, payment_method} = req.body;

    const customer = await stripe.customers.create({
      payment_method: payment_method,
      email: email,
      invoice_settings:{
        default_payment_method: payment_method,
      },
    });

    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: 'price_1JT1tPH9H3bUbp4vTswRMwvx'}],
        expand: ['latest_invoice.payment_intent']
    });

    const status = subscription['latest_invoice']['payment_intent']['status'];
    const client_secret = subscription['latest_invoice']['payment_intent']['client_secret'];

    res.json({ 'client_secret': client_secret, 'status': status });
      
})

app.use('/api/subscriptions', routes);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));