const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const path = require('path');

const dotenv = require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


const routes = require('./routes/api/subscriptions');



const app = express();

connectDB();

// app.use(express.static(path.join('/Client',"client", "build")));
app.use(express.static(path.join(__dirname, 'client/build')))

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


app.get('/api/transactions/', async (req, res) => {
    const transactions = await fetch('https://api.stripe.com/v1/issuing/transactions')
    res.status(200).send(transactions);
});

app.post('/api/sub', async (req, res) => {
    const {email, payment_method, item} = req.body;

    const customer = await stripe.customers.create({
      payment_method: payment_method,
      email: email,
      invoice_settings:{
        default_payment_method: payment_method,
      },
    });

    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: item }],
        expand: ['latest_invoice.payment_intent']
    });

    const status = subscription['latest_invoice']['payment_intent']['status'];
    const client_secret = subscription['latest_invoice']['payment_intent']['client_secret'];

    res.json({ 'client_secret': client_secret, 'status': status });
      
})

app.use('/api/subscriptions', routes);

const port = process.env.PORT || 8082;

app.get('*', (req, res) => {
    // res.sendFile(path.join('/client/public', "client", "build", "index.html"));
    res.sendFile(path.join(__dirname+'/client/build/index.html'))
});


app.listen(port, () => console.log(`Server running on port ${port}`));