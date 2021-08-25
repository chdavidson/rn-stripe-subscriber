const express = require('express');
const router = express.Router();

// Load Subscription model
const Subscription = require('../../models/Subscription');

// @route GET api/subsctiption/test
// @description tests subscription route
// @access Public
router.get('/test', (req, res) => res.send('subscription route testing!'));

// @route GET api/subscriptions
// @description Get all subscriptions
// @access Public
router.get('/', (req, res) => {
  Subscription.find()
    .then(subscriptions => res.json(subscriptions))
    .catch(err => res.status(404).json({ nosubscriptionsfound: 'No subscriptions found' }));
});

// @route GET api/subscriptions/:id
// @description Get single subscription by id
// @access Public
router.get('/:id', (req, res) => {
  Subscription.findById(req.params.id)
    .then(subscription => res.json(subscription))
    .catch(err => res.status(404).json({ nosubscriptionfound: 'No subscription found' }));
});

// @route GET api/subscriptions
// @description add/save subscription
// @access Public
router.post('/', (req, res) => {
  Subscription.create(req.body)
    .then(subscription => res.json({ msg: 'subscription added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this subscription' }));
});

// @route GET api/subscriptions/:id
// @description Update subscription
// @access Public
router.put('/:id', (req, res) => {
  Subscription.findByIdAndUpdate(req.params.id, req.body)
    .then(subscription => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/subscriptions/:id
// @description Delete subscription by id
// @access Public
router.delete('/:id', (req, res) => {
  Subscription.findByIdAndRemove(req.params.id, req.body)
    .then(subscription => res.json({ mgs: 'Subscription entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a subscription' }));
});

module.exports = router;