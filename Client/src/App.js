import './App.css';
import CreateSubscription from './Components/CreateSubscription';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CONSTANTS } from './CONSTANTS';
import TierSelection from './Components/TierSelection';
import GiftAidOptIn from './Components/GiftAidOptIn';
import React, {useState} from 'react'


// .env
require('dotenv').config();

//stripe
const stripePromise = loadStripe('pk_test_51JRZiRH9H3bUbp4v4rMxaEvcZTBtYY6VJECNDlJHErMviJO4Ooacgs4mr4SviOyWfcGTEn8ltTQVkUQSnaO0Iv0800x4iZH86h')

function App() {


  const [subscriber, setSubscriber] = useState({
                                                  user: {
                                                      facebook_id: "",
                                                      billing_details:{
                                                          name: "",
                                                          email: "",
                                                          address:{
                                                              city:"",
                                                              line1:"",
                                                              state:"",
                                                              postal_code:"",
                                                          }}
                                                  },
                                                  subscription: {
                                                      stripe_product: '',
                                                      gift_aid: false
                                                  }});
    
    

  const handleChange = event => {
    let tempSub = subscriber;

    if(event.target.value === 'on'){
        tempSub['subscription']['gift_aid']=!tempSub['subscription']['gift_aid'];
    }
    else{
        if(tempSub['subscription'].hasOwnProperty(event.target.name)){
            tempSub['subscription'][event.target.name] = event.target.value;
        }
        else{
            if(tempSub['user']['billing_details'].hasOwnProperty(event.target.name)){
                tempSub['user']['billing_details'][event.target.name] = event.target.value;
            }
            else{
                if(tempSub['user']['billing_details']['address'].hasOwnProperty(event.target.name)){
                    tempSub['user']['billing_details']['address'][event.target.name] = event.target.value;
                }
                else{
                    tempSub['user'][event.target.name] = event.target.value;
                }
            }
        }
    }
    setSubscriber(tempSub);
    console.log(subscriber);  
  }



  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <img src={CONSTANTS.LOGO} alt="company logo here" width='100px' height='80ppx'/>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend diam eu eleifend dapibus. Donec sodales lacus non enim aliquet convallis. Aliquam tristique eleifend sagittis. Morbi sed mattis erat, sed mollis lectus. Nulla vel ullamcorper metus. Praesent ac lectus sed dui gravida accumsan. Donec sollicitudin quam vitae facilisis elementum. Morbi ac augue quis nisi tincidunt sollicitudin.</p>
        <TierSelection handleChange={handleChange} />
        <CreateSubscription handleChange={handleChange} subscriber={subscriber} setSubscriber={setSubscriber}/>
        <GiftAidOptIn amount={0} handleOptIn={handleChange}/>
      </div>
    </Elements>
  );  
}

export default App;
