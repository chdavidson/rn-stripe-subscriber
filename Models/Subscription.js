const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    user:{
        facebook_id: { type: String, required: true },
        billing_details: {
            name: {type: String, required: true},
            email: {type: String, required: true},
            address:{
                city:{type: String, required: true},
                line1:{type: String, required: true},
                state: String,
                postal_code:{type: String, required: true},
            },
        }
    },
    subscription:{
        stripe_product: {type: String, required: true},
        gift_aid: Boolean
    }
});

module.exports = Subscription = mongoose.model('subscription', SubscriptionSchema);
