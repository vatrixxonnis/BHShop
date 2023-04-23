const express = require("express");
const mongoose = require("mongoose");
const orderRouter = express.Router();

// Order
const order = require("../model/order");
const orderDetail = require("../model/orderDetail");

orderRouter.post("", async (req, res) => {
  order
    .find({ user_id: req.body.user_id })
    .then((orders) => {
      return res.send(orders);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

orderRouter.post("/detail", async (req, res) => {
  orderDetail
    .find({ order_id : req.body.order_id })
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = orderRouter;
