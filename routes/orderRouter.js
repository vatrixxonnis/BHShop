const express = require("express");
const mongoose = require("mongoose");
const { uuid } = require("uuidv4");
const orderRouter = express.Router();

// Order
const order = require("../model/order");

orderRouter.post("", async (req, res) => {
  let o_id = new mongoose.Types.ObjectId(req.body.customer_id);
  order
    .find({ customer_id: o_id })
    .then((orders) => {
      if (orders.length == 0) return res.send([]);
      else {
        return res.send(orders);
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

orderRouter.post("/detail", async (req, res) => {
  order
    .findOne({ _id: req.body.order_id })
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

orderRouter.post("/add", async (req, res) => {
  let productsHolder = req.body.products;
  for (let p of productsHolder) {
    p.product_id = new mongoose.Types.ObjectId(p.product_id);
  }
  console.log(productsHolder);
  const newOrder = new order({
    _id: "BH" + uuid().slice(0, 10),
    customer_id: new mongoose.Types.ObjectId(req.body.customer_id),
    products: productsHolder,
    order_status: req.body.order_status,
    status: req.body.status,
    shipping_address: req.body.shipping_address,
    payment_method: req.body.payment_method,
    voucher_code: req.body.voucher_code,
  });
  newOrder.save().then((data) => {
    return res.send(data);
  });
});

module.exports = orderRouter;
