import React from 'react'
import axios from 'axios'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const CreateSubscription = ({handleChange, subscriber, setSubscriber}) => {

    const stripe = useStripe();
    const elements = useElements();


    const handlePayment = async (event) => {
        event.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const cardElement = elements.getElement(CardElement);
        
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:'card', card: cardElement, billing_details: subscriber['user']['billing_details']
        });


        if(error){
            console.log("[Payment Method Error]", error);
        }else{
            postSubscriber();
            console.log("[PaymentMethod]", paymentMethod);

            console.log("Retrieving Client Secret...")
            const { data: clientSecret } = await axios.post('http://localhost:8082/api/create-payment-intent', {
                amount: 100
            });
            console.log('[Client Secret]', clientSecret);

            const confirmCardPayment = await stripe.confirmCardPayment(clientSecret, {payment_method: paymentMethod.id })
            console.log('[Payment Confirmation]', confirmCardPayment);
        }
    };

    const handleSubscription = async (event) => {
        event.preventDefault();


        if(!stripe || !elements){
            return;
        }

        const result = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: subscriber['user']['billing_details'],
        });

        if(result.error){
            console.log('[Payment Method Error]', result.error.message)
        }else{

            postSubscriber();

            const res = await axios.post('http://localhost:8082/api/sub', {   
                                                    'payment_method': result.paymentMethod.id, 
                                                    'email': subscriber['user']['billing_details']['email'], 
                                                    'item': 'price_1JT1tPH9H3bUbp4vTswRMwvx'});
                                                    // set item from tier selector?


            console.log('[RES:]', res);
            const { client_secret, status} = res.data;

            console.log('[STATUS]', status)
            if(status === 'requires_action'){
                stripe.confirmCardPayment(client_secret)
                    .then((result) => {
                        if(result.error){
                            // Display error message in UI
                            console.log('[Payment Completion Error]', result.error.decline_code);
                        } else{
                            console.log('User Subscription Successful')
                        }
                    });
            }
            else{
                console.log('User Subscription Successful')
            }
        }
        
        event.target.reset();

    }


    const postSubscriber = () => {
        axios
        .post('http://localhost:8082/api/subscriptions/', subscriber)
        .then(res => {
            setSubscriber({
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
                            }
                        });
        })
        .catch(err => { console.log('[Error in posting subscriber]', err);     })
    }



    return (
        <div className="subscription-container">
            <form className='subscription-form' onSubmit={handleSubscription}>
                <ul className="subscriber-details">
                    <li><input type='text' placeholder='fb id' name='facebook_id' onChange={handleChange}/></li>
                    <li><input type='text' placeholder='Full Name' name='name' onChange={handleChange}/></li>
                    <li><input type='text' placeholder='Email' name='email' onChange={handleChange}/></li>
                    <li><input type='text' placeholder='City' name='city' onChange={handleChange}/></li>
                    <li><input type='text' placeholder='Address' name='line1' onChange={handleChange}/></li>
                    <li><input type='text' placeholder='State/County' name='state' onChange={handleChange}/></li>
                    <li><input type='text' placeholder='Postal Code' name='postal_code' onChange={handleChange}/></li>
                    <li><input type='number' placeholder='0.0' name='amount' onChange={handleChange}/></li>
                    <li><input type='text' placeholder='freq' name='frequency' onChange={handleChange}/></li>
                </ul>
                <CardElement
                    options={{
                        style:{
                            base:{
                                fontSize: '16px',
                                color: 'dodgerblue',
                                '::placeholder':{
                                    color: 'white',
                                },
                            },
                            invalid:{
                                color: '#9e2146',
                            }
                        },
                        hidePostalCode: true
                    }}/>
                    <button type='submit' disabled={!stripe}>Pay</button>
                </form>
        </div>
    )
}

export default CreateSubscription
