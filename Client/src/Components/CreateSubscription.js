import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class CreateSubscription extends Component{
    constructor(){
        super();
        this.state =   {user: {
                            firstName: "",
                            lastName: "",
                            facebook_id: ""
                        },
                        subscription: {
                            amount: 0,
                            frequency: null,
                            gift_aid: false
                        }}
    }

    handleChange = event => {
        let tempState = this.state;
        if(tempState['user'].hasOwnProperty(event.target.name)){
            tempState['user'][event.target.name] = event.target.value;
        }
        else{
            if(event.target.value === 'on'){
                tempState['subscription']['gift_aid'] = !tempState['subscription']['gift_aid'];
            }
            else{
                tempState['subscription'][event.target.name] = event.target.value;
            }
        }
        this.setState(tempState);
        console.log('[STATE]', this.state);
    }

    handleSubmit = event => {
        event.preventDefault();

        const payload = {
            user:{
                firstName: this.state.user.firstName,
                lastName: this.state.user.lastName,
                facebook_id: this.state.user.facebook_id
            },
            subscription:{
                amount: this.state.subscription.amount,
                frequency: this.state.subscription.frequency,
                gift_aid: this.state.subscription.gift_aid

            },
        }


        console.log('[PAYLOAD]', JSON.stringify(payload));

        axios
            .post('http://localhost:8082/api/subscriptions/', payload)
            .then(res => {
                this.setState({
                    user: {
                        firstName: "",
                        lastName: "",
                        facebook_id: ""
                    },
                    subscription: {
                        amount: 0,
                        frequency: null,
                        gift_aid: false
                    }})
                    // this.props.history.push('/');
            })
            .catch(err => { console.log('[ERROR IN SUBSCRIBER POST]', err);     })
    };

    render(){
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='first name' name='firstName' onChange={this.handleChange}/>
                    <input type='text' placeholder='surname' name='lastName' onChange={this.handleChange}/>
                    <input type='text' placeholder='fb id' name='facebook_id' onChange={this.handleChange}/>
                    <input type='number' placeholder='0.0' name='amount' onChange={this.handleChange}/>
                    <input type='text' placeholder='freq' name='frequency' onChange={this.handleChange}/>
                    <label for='gift_aid'>Gift Aid? </label>
                    <input type='checkbox' name='gift_aid' onChange={this.handleChange}/>
                    <input type='submit' value="submit"/>
            </form>
        </div>
    )
    }
}

export default CreateSubscription;