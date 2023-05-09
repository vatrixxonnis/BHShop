const express = require("express");
const mongoose = require("mongoose");
const userRouter = express.Router();
const crypto = require("node:crypto");
const user = require("../model/user");

// Lấy thông tin tất cả người dùng
userRouter.get("", async (req, res) => {
  user
    .find({})
    .then((users) => {
      return res.json(users);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Đăng nhập
userRouter.post("", async (req, res) => {
  let phone = req.body.phonenumber;
  let pass = req.body.password;
  await user
    .findOne({ phone_number: phone })
    .then((user) => {
      if (user) {
        let salt = user.salt; // get salt from user object
        let hash = crypto
          .pbkdf2Sync(pass, salt, 1000, 64, `sha512`)
          .toString(`hex`);
        if (user.password === hash) {
          return res
            .send({
              user_id: user.user_id,
              user_type: user.user_type,
              first_name: user.first_name,
              last_name: user.last_name,
              username: user.username,
              email: user.email,
              gender: user.gender,
              phone_number: user.phone_number,
              birth_date: user.birth_date,
              status: user.status,
            })
            .status(200);
        } else {
          return res.sendStatus(404);
        }
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Đăng ký tài khoản
userRouter.post("/regis", async (req, res) => {
  salt = crypto.randomBytes(16).toString("hex"); // create salt
  hash = crypto
    .pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  let newUser = new user({
    email: req.body.email,
    gender: req.body.gender,
    password: hash,
    salt: salt,
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

// Cập nhật thông tin người dùng
userRouter.put("", async (req, res) => {
  if (req.body.name == null) return res.sendStatus(404);
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

// Thay đổi mật khẩu
userRouter.put("/changePassword", async (req, res) => {
  user.findOne({ phone_number: req.body.phone_number }).then((oneUser) => {
    if (oneUser) {
      let salt = oneUser.salt; // create salt
      let hash = crypto
        .pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`)
        .toString(`hex`);
      let newhash = crypto
        .pbkdf2Sync(req.body.newpass, salt, 1000, 64, `sha512`)
        .toString(`hex`);
      user
        .findOneAndUpdate(
          { phone_number: oneUser.phone_number, password: hash },
          { $set: { password: newhash } }
        )
        .then((user) => {
          if (user) {
            return res.sendStatus(200);
          } else {
            return res.sendStatus(404);
          }
        });
    } else {
      return res.sendStatus(404);
    }
  });
});

// Xóa người dùng
userRouter.delete("", async (req, res) => {
  user.findOneAndDelete({ phone_number: req.body.phone }).then((user) => {
    if (user) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(404);
    }
  });
});

module.exports = userRouter;
