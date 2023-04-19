const express = require('express');
const mongoose = require('mongoose');
const addressRouter = express.Router();

// Addresses
const addresses = require('../model/addresses');
addressRouter.get('', async (req, res) => {
  addresses.find({}).then(addresses => {
    return res.json(addresses)
  })
    .catch(err => res.status(500).json({ error: err.message }))
});

module.exports = addressRouter;