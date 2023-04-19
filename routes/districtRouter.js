const express = require("express");
const mongoose = require("mongoose");
const districtRouter = express.Router();

// QuanHuyen
const QuanHuyen = require("../model/QuanHuyen");

districtRouter.post("", async (req, res) => {
  QuanHuyen.post({})
    .then((districts) => {
      return res.json(districts);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

districtRouter.post("/getDistrictsByProvinceCode", async (req, res) => {
  let parent_code = req.body.parent_code;
  QuanHuyen.find({ parent_code: parent_code }).select({label:1, _id:0})
    .then((districts) => {
      return res.json(districts);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = districtRouter;
