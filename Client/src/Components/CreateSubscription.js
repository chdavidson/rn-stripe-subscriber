import React,{useState} from 'react'
import axios from 'axios'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const CreateSubscription2 = () => {

    const stripe = useStripe();
    const elements = useElements();

    const [subscriber, setSubscriber] = useState({user: {
                                                firstName: "",
                                                lastName: "",
                                                facebook_id: ""
                                            },
                                            subscription: {
                                                amount: 0,
                                                frequency: null,
                                                gift_aid: false
                                            }});

    const handlePayment = async (event) => {
        event.preventDefault();

        if(!stripe || !elements){
            return;
        }

        const cardElement = elements.getElement(CardElement);
        
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:'card', card: cardElement,
        });


        if(error){
            console.log("[PAYMENT ERROR]", error);
        }else{
            postSubscriber();
            console.log("[PaymentMethod]", paymentMethod);
        }
    };

    const postSubscriber = () => {
        axios
        .post('http://localhost:8082/api/subscriptions/', subscriber)
        .then(res => {
            setSubscriber({ user: {
                                firstName: "",
                                lastName: "",
                                facebook_id: ""
                            },
                            subscription: {
                                amount: 0,
                                frequency: null,
                                gift_aid: false
                            }});
        })
        .catch(err => { console.log('[ERROR IN SUBSCRIBER POST]', err);     })
    }

    const handleChange = event => {
        let tempSub = subscriber;
        if(tempSub['user'].hasOwnProperty(event.target.name)){
            tempSub['user'][event.target.name]=event.target.value;
        }
        else{
            if(event.target.value === 'on'){
                tempSub['subscription']['gift_aid']=!tempSub['subscription']['gift_aid']
            }
            else{
                tempSub['subscription'][event.target.name] = event.target.value;
            }
        }
        setSubscriber(tempSub);
        // console.log(subscriber);
    }


    return (
        <div>
            <form onSubmit={handlePayment}>
                    <input type='text' placeholder='first name' name='firstName' onChange={handleChange}/>
                    <input type='text' placeholder='surname' name='lastName' onChange={handleChange}/>
                    <input type='text' placeholder='fb id' name='facebook_id' onChange={handleChange}/>
                    <input type='number' placeholder='0.0' name='amount' onChange={handleChange}/>
                    <input type='text' placeholder='freq' name='frequency' onChange={handleChange}/>
                    <label for='gift_aid'>Gift Aid? </label>
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

export default CreateSubscription2
