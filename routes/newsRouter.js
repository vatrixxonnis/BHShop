const express = require("express");
const mongoose = require("mongoose");
const newsRouter = express.Router();

const news = require("../model/news");

newsRouter.get("", async (req, res) => {
  news
    .find({})
    .then((response) => {
      return res.json(response);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

newsRouter.post("", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Please enter all fields" });
  }
  const newNewsLetter = new news({
    email: email,
  });
  newNewsLetter.collection
    .countDocuments({ email: email }, { limit: 1 })
    .then((count) => {
      if (count > 0) {
        return res.sendStatus(400);
      } else {
        news
          .insertMany(newNewsLetter)
          .then((newsLetter) => {
            return res.json(newsLetter);
          })
          .catch((err) => res.sendStatus(500));
      }
    })
    .catch((err) => res.sendStatus(500));
});

module.exports = newsRouter;
