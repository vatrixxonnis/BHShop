const express = require("express");
const mongoose = require("mongoose");
const couponRouter = express.Router();

// Categories
const coupon = require("../model/coupon");
couponRouter.get("", async (req, res) => {
    coupon
    .find({})
    .then((coupons) => {
      return res.json(coupons);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = couponRouter;
