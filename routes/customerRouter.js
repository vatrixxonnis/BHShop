const express = require('express');
const mongoose = require('mongoose');
const customerRouter = express.Router();

// Customer
const customer = require('../model/customer');
customerRouter.get('', async (req, res) => {
  customer.find({}).then(customers => {
    return res.json(customers)
  })
    .catch(err => res.status(500).json({ error: err.message }))
});

module.exports = customerRouter;