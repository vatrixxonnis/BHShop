const express = require("express");
const mongoose = require("mongoose");
const categoryRouter = express.Router();

// Categories
const categories = require("../model/categories");
categoryRouter.get("", async (req, res) => {
  categories
    .find({})
    .then((categories) => {
      return res.json(categories);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

categoryRouter.post("/name", async (req, res) => {
  console.log(req.body.category_id);
  let o_id = req.body.category_id;
  categories
    .findOne({ category_id: o_id })
    .select({ name: 1, _id: 0 })
    .then((category) => {
      // return res.json(category);
      return res.send(category.name);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = categoryRouter;
