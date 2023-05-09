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

module.exports = categoryRouter;
