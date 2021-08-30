import React,{useState} from 'react'
import axios from 'axios'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const CreateSubscription = () => {

    const stripe = useStripe();
    const elements = useElements();

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
                                                amount: 0,
                                                frequency: null,
                                                gift_aid: false
                                            }});

    const [subscription, setSubscription] = useState({amount: 100})

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

            const res = await axios.post('http://localhost:8082/api/sub', { 'payment_method': result.paymentMethod.id, 'email': subscriber['user']['billing_details']['email']});

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
                            // Display success message in UI
                            console.log('User Subscription Successful')
                        }
                    });
            }
            else{
                // No additional information required
                // Display success message
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
                                amount: 0,
                                frequency: null,
                                gift_aid: false
                            }
                        });
        })
        .catch(err => { console.log('[Error in posting subscriber]', err);     })
    }

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
    }


    return (
        <div>
            <form onSubmit={handleSubscription}>
                    <input type='text' placeholder='fb id' name='facebook_id' onChange={handleChange}/>
                    <input type='text' placeholder='Full Name' name='name' onChange={handleChange}/>
                    <input type='text' placeholder='Email' name='email' onChange={handleChange}/>
                    <input type='text' placeholder='City' name='city' onChange={handleChange}/>
                    <input type='text' placeholder='Address' name='line1' onChange={handleChange}/>
                    <input type='text' placeholder='State/County' name='state' onChange={handleChange}/>
                    <input type='text' placeholder='Postal Code' name='postal_code' onChange={handleChange}/>
                    <input type='number' placeholder='0.0' name='amount' onChange={handleChange}/>
                    <input type='text' placeholder='freq' name='frequency' onChange={handleChange}/>
                    <label htmlFor='gift_aid'>Gift Aid? </label>
                    <input type='checkbox' name='gift_aid' onChange={handleChange}/>
                <CardElement
                    options={{
                        style:{
                            base:{
                                fontSize: '16px',
                                color: 'dodgerblue',
                                '::placeholder':{
                                    color: 'dodgerblue',
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
