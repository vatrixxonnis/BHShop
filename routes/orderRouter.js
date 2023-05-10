const express = require("express");
const mongoose = require("mongoose");
const { uuid } = require("uuidv4");
const orderRouter = express.Router();

// Order
const order = require("../model/order");
orderRouter.get("", async (req, res) => {
  try {
    const orders = await order.aggregate([
      {
        $lookup: {
          from: "Customer",
          localField: "customer_id",
          foreignField: "_id",
          as: "cus",
        },
      },
      {
        $lookup: {
          from: "User",
          localField: "cus.user_id",
          foreignField: "user_id",
          as: "user",
        },
      },
      {
        $project: {
          "user._id": 1,
          "user.first_name": 1,
          "user.last_name": 1,
          "user.phone_number": 1,
          order_date: 1,
          products: 1,
          status: 1,
          shipping_address: 1,
          payment_method: 1,

          voucher_code: 1,

          created_at: 1,
          updated_at: 1,
        },
      },
    ]);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
orderRouter.get("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const orderData = await order.aggregate([
      {
        $lookup: {
          from: "Customer",
          localField: "customer_id",
          foreignField: "_id",
          as: "cus",
        },
      },
      {
        $lookup: {
          from: "User",
          localField: "cus.user_id",
          foreignField: "user_id",
          as: "user",
        },
      },
      {
        $project: {
          "user._id": 1,
          "user.first_name": 1,
          "user.last_name": 1,
          "user.phone_number": 1,
          order_date: 1,
          products: 1,
          status: 1,
          shipping_address: 1,
          payment_method: 1,
          voucher_code: 1,
          created_at: 1,
          updated_at: 1,
        },
      },
      { $unwind: "$user" },
    ]);

    if (orderData.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(orderData[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
  console.log(req.body);
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
  const newOrder = new order({
    _id: "BH" + uuid().slice(0, 10),
    customer_id: new mongoose.Types.ObjectId(req.body.customer_id),
    products: productsHolder,
    status: req.body.status,
    shipping_address: req.body.shipping_address,
    payment_method: req.body.payment_method,
    voucher_code: req.body.voucher_code,
  });
  newOrder.save().then((data) => {
    return res.send(data);
  });
});
orderRouter.put("/:id/status", async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    // Kiểm tra xem order có tồn tại không
    const existingOrder = await order.findById(orderId);
    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Cập nhật trạng thái của order
    existingOrder.status = status;
    const updatedOrder = await existingOrder.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = orderRouter;
