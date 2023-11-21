const express = require("express");
const mongoose = require("mongoose");
const productRouter = express.Router();

// Products
const product = require("../model/product");
productRouter.get("", async (req, res) => {
  try {
    const products = await product.find({}).sort({ created_date: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
  try {
    const { id } = req.params;
    const productData = req.body;
    const updatedProduct = await product.findOneAndUpdate(
      { _id: id },
      productData,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
    .select({ name: 1, _id: 1 })
    .then((product) => res.send(product))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = productRouter;
