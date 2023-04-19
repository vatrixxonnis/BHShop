const express = require("express");
const mongoose = require("mongoose");
const wardRouter = express.Router();

// XaPhuong
const XaPhuong = require("../model/XaPhuong");

wardRouter.post("", async (req, res) => {
  XaPhuong.post({})
    .then((wards) => {
      return res.json(wards);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

wardRouter.post("/getWardsByDistrictCode", async (req, res) => {
  let parent_code = req.body.parent_code;
  XaPhuong.find({ parent_code: parent_code }).select({label:1, _id:0})
    .then((wards) => {
      return res.json(wards);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = wardRouter;
