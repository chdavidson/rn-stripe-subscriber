import './App.css';
import CreateSubscription from './Components/CreateSubscription';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'


const dotenv = require('dotenv')
dotenv.config();


const stripePromise = loadStripe('pk_test_51JRZiRH9H3bUbp4v4rMxaEvcZTBtYY6VJECNDlJHErMviJO4Ooacgs4mr4SviOyWfcGTEn8ltTQVkUQSnaO0Iv0800x4iZH86h')

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <CreateSubscription/>
      </div>
    </Elements>
  );
}

export default App;
