const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const glowyRouter = express.Router();
const glowy = require("../model/glowy");

glowyRouter.all("*", cors({
  origin:["https://localhost:4300","https://glowy.web.app"],
  credentials:true
}));

glowyRouter.get("", async (req, res) => {
  const { title } = req.query;
  await glowy
    .findOne({
      title: title,
    })
    .then((response) => {
      return res.json(response);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

glowyRouter.post("", async (req, res) => {
  const { title, content, link } = req.body;
  const newGlowy = new glowy({
    title,
    content,
    link,
  });
  await newGlowy
    .save()
    .then(() => {
      return res.json({ message: "Thêm thành công" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

glowyRouter.put("", async (req, res) => {
  const { title, content, link } = req.body;
  await glowy
    .findOneAndUpdate(
      {
        title: title
      },
      {
        title,
        content,
        link,
      }
    )
    .then(() => {
      return res.json({ message: "Sửa thành công" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = glowyRouter;
