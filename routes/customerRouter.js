const express = require("express");
const mongoose = require("mongoose");
const customerRouter = express.Router();

// Customer
const customer = require("../model/customer");
customerRouter.get("", async (req, res) => {
  customer
    .find({})
    .then((customers) => {
      return res.json(customers);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

customerRouter.post("/user_id", async (req, res) => {
  customer
    .findOne({ user_id: req.body.user_id })
    .then((customer) => {
      return res.json(customer);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

customerRouter.post("/wishlist", async (req, res) => {
  await customer
    .findOne({ user_id: req.body.user_id })
    .select({ wishlist: 1, _id: 0 })
    .then((wistlist) => {
      return res.json(wistlist);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

customerRouter.post("/wishlist/add", async (req, res) => {
  await customer
    .findOne({ user_id: req.body.user_id })
    .then(async (respone) => {
      let index = await respone.wishlist.findIndex((item) => {
        let o_id = new mongoose.Types.ObjectId(req.body.product._id);
        return item._id == o_id;
      });
      if (index == -1) {
        req.body.product._id = new mongoose.Types.ObjectId(req.body.product._id);
        respone.wishlist.push(req.body.product);
        await customer.findOneAndUpdate(
          { user_id: req.body.user_id },
          { wishlist: respone.wishlist }
        );
        return res.sendStatus(200);
      } else {
        return res.sendStatus(400);
      }
    })
    .catch((err) => res.json({ error: err.message }));
});

customerRouter.post("/wishlist/remove", async (req, res) => {
  await customer
    .findOne({ user_id: req.body.user_id })
    .then(async (respone) => {
      let index = respone.wishlist.findIndex((item) => {
        let o_id = new mongoose.Types.ObjectId(req.body.product._id);
        return item._id.toString() === o_id.toString();
      });
      console.log(index);
      if (index != -1) {
        respone.wishlist.splice(index, 1);
        await customer.findOneAndUpdate(
          { user_id: req.body.user_id },
          { wishlist: respone.wishlist }
        );
        return res.sendStatus(200);
      }
      else {
        return res.sendStatus(400);
      }
    });
});

module.exports = customerRouter;
