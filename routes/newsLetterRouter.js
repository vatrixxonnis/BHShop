const express = require("express");
const mongoose = require("mongoose");
const newsLetterRouter = express.Router();

const newsLetter = require('../model/newsLetter')

newsLetterRouter.get("", async (req, res) => {
  newsLetter
    .find({})
    .then((newsLetters) => {
      return res.json(newsLetters);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

newsLetterRouter.post("", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Please enter all fields" });
  }
  const newNewsLetter = new newsLetter({
    email: email,
  });
  newNewsLetter.collection
    .countDocuments({ email: email }, { limit: 1 })
    .then((count) => {
      if (count > 0) {
        return res.status(400).json({ error: "Email already exists" });
      } else {
        newNewsLetter
          .save()
          .then((newsLetter) => {
            return res.json(newsLetter);
          })
          .catch((err) => res.status(500).json({ error: err.message }));
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = newsLetterRouter;
