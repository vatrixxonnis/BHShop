const express = require('express');
const mongoose = require('mongoose');
const paymentRouter = express.Router();

// Payment
const payment = require('../model/payment');
paymentRouter.get('', async (req, res) => {
  payment.find({}).then(payments => {
    return res.json(payments)
  })
    .catch(err => res.status(500).json({ error: err.message }))
});

module.exports = paymentRouter;