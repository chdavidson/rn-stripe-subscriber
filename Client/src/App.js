import './App.css';
import CreateSubscription from './Components/CreateSubscription';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CONSTANTS } from './CONSTANTS';


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
        <CreateSubscription/>
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend diam eu eleifend dapibus. Donec sodales lacus non enim aliquet convallis. Aliquam tristique eleifend sagittis. Morbi sed mattis erat, sed mollis lectus. Nulla vel ullamcorper metus. Praesent ac lectus sed dui gravida accumsan. Donec sollicitudin quam vitae facilisis elementum. Morbi ac augue quis nisi tincidunt sollicitudin.
            Vestibulum mi ligula, consequat ut magna et, dictum pretium nunc. Curabitur eget ultricies urna, ac iaculis nisl. Nulla congue orci vitae volutpat facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut id blandit neque, molestie mollis massa. Curabitur quam orci, iaculis a ex eget, condimentum pharetra ex. Donec risus eros, auctor sit amet libero id, mattis imperdiet odio. Aenean tincidunt elementum purus, in volutpat erat volutpat eget. Fusce fermentum diam iaculis felis porttitor, a facilisis ligula blandit. Donec nec efficitur urna, vel volutpat orci. Aenean tincidunt gravida sapien et vehicula. In iaculis iaculis libero, id semper tortor tincidunt eu.</p>
      </div>
    </Elements>
  );  
}

export default App;
