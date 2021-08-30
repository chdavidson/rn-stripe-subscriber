import './App.css';
import CreateSubscription from './Components/CreateSubscription';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CONSTANTS } from './CONSTANTS';
import TierSelection from './Components/TierSelection';
import GiftAidOptIn from './Components/GiftAidOptIn';


// .env
require('dotenv').config();

//stripe
const stripePromise = loadStripe('pk_test_51JRZiRH9H3bUbp4v4rMxaEvcZTBtYY6VJECNDlJHErMviJO4Ooacgs4mr4SviOyWfcGTEn8ltTQVkUQSnaO0Iv0800x4iZH86h')

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <img src={CONSTANTS.LOGO} alt="company logo here" width='100px' height='80ppx'/>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend diam eu eleifend dapibus. Donec sodales lacus non enim aliquet convallis. Aliquam tristique eleifend sagittis. Morbi sed mattis erat, sed mollis lectus. Nulla vel ullamcorper metus. Praesent ac lectus sed dui gravida accumsan. Donec sollicitudin quam vitae facilisis elementum. Morbi ac augue quis nisi tincidunt sollicitudin.</p>
        <TierSelection  />
        <CreateSubscription />
        <GiftAidOptIn />
      </div>
    </Elements>
  );  
}

export default App;
