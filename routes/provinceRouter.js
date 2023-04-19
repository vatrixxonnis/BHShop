const express = require("express");
const mongoose = require("mongoose");
const provinceRouter = express.Router();

// TinhThanh
const TinhThanh = require("../model/TinhThanh");
provinceRouter.post("", async (req, res) => {
  await TinhThanh.find({})
    .then((provinces) => {
      for(let province of provinces) {
        province.value = province.label;
      }
      return res.json(provinces);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = provinceRouter;
