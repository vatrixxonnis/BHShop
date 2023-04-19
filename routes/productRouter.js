const express = require("express");
const mongoose = require("mongoose");
const productRouter = express.Router();

// Products
const product = require("../model/product");

productRouter.get("", async (req, res) => {
  product
    .find({})
    .then((products) => {
      return res.json(products);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

productRouter.get("/:id", (req, res) => {
  let o_id = new mongoose.Types.ObjectId(req.params.id);
  product
    .findById(o_id)
    .then((product) => res.json(product))
    .catch((err) => res.status(500).json({ error: err.message }));
});

productRouter.post("", async (req, res) => {
  product
    .insertMany(req.body)
    .then((product) => res.json(product))
    .catch((err) => res.status(500).json({ error: err.message }));
});

productRouter.put("/:id", async (req, res) => {
  let o_id = new mongoose.Types.ObjectId(req.params.id);
  const response = await product
    .findOneAndUpdate(
      { _id: o_id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
        },
      }
    )
    .then((product) => res.json(product))
    .catch((err) => res.status(500).json({ error: err.message }));
});

productRouter.delete("/:id", async (req, res) => {
  let o_id = new mongoose.Types.ObjectId(req.params.id);
  const response = await product
    .findByIdAndRemove(o_id)
    .then((product) => res.json(product))
    .catch((err) => res.status(500).json({ error: err.message }));
});

productRouter.post("/name", async (req, res) => {
  await product
    .findOne({ product_id: req.body.item_id })
    .select({ name: 1, _id: 0 })
    .then((product) => res.send(product.name))
    .catch((err) => res.status(500).json({ error: err.message }));
});

productRouter.post("/allWithOnlyName", async (req, res) => {
  await product
    .find({})
    .select({ name: 1, _id: 0 })
    .then((product) => res.send(product))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = productRouter;
