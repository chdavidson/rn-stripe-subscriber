const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    user:{
        firstName: String,
        lastName: String,
        facebook_id: { type: String, required: true }
    },
    subscription:{
        amount: { type: Number, required: true },
        frequency: { type: String, required: true },
        gift_aid: Boolean
    }
});

module.exports = Subscription = mongoose.model('subscription', SubscriptionSchema);
