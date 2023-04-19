const express = require("express");
const mongoose = require("mongoose");
const userRouter = express.Router();

// User
const user = require("../model/user");
userRouter.get("", async (req, res) => {
  user
    .find({})
    .then((users) => {
      return res.json(users);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

userRouter.post("", async (req, res) => {
  let phone = req.body.phonenumber;
  let pass = req.body.password;
  user
    .findOne({ phone_number: phone, password: pass })
    .then((user) => {
      if (user) {
        return res.send(user).status(200);
      } else {
        return res.sendStatus(404);
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

userRouter.post("/regis", async (req, res) => {
  console.log(req.body);
  let newUser = new user({
    email: req.body.email,
    gender: req.body.gender,
    password: req.body.password,
    phone_number: req.body.phone,
    first_name: req.body.firs_tname,
    last_name: req.body.last_name,
  });
  user
    .insertMany(newUser)
    .then((user) => {
      if (user) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(404);
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

userRouter.put("", async (req, res) => {
  let full_name = req.body.name.trim().split(" ");
  let first_name = full_name.pop();
  let last_name = full_name.join(" ");
  user
    .findOneAndUpdate(
      { phone_number: req.body.phone },
      {
        $set: {
          email: req.body.email,
          gender: req.body.gender,
          phone_number: req.body.phone,
          first_name: first_name,
          last_name: last_name,
        },
      }
    )
    .then((user) => {
      if (user) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(404);
      }
    });
});

userRouter.put("/pass", async (req, res) => {
  user
    .findOneAndUpdate(
      { password: req.body.password, user_id: req.body.user_id },
      { $set: { password: req.body.newpass } }
    )
    .then((user) => {
      if (user) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(404);
      }
    });
});

userRouter.delete("", async (req, res) => {
  console.log(req.body);
});

module.exports = userRouter;
