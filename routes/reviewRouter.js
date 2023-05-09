const express = require("express");
const reviewRouter = express.Router();
const review = require("../model/review");
const product = require("../model/product");
const user = require("../model/user"); //
// Lấy tất cả các review
reviewRouter.get("/", async (req, res) => {
  try {
    const reviews = await review.aggregate([
      {
        $lookup: {
          from: "User",
          localField: "user_id",
          foreignField: "user_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "Product",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          "user.first_name": 1,
          "user.last_name": 1,
          "product.name": 1,
          "product._id": 1,

          rating: 1,
          comment: 1,
          created_at: 1,
          label: 1,
        },
      },
    ]);

    return res.json(reviews);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Lấy một review dựa trên ID
reviewRouter.get("/:id", async (req, res) => {
  try {
    const review = await review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review không tồn tại" });
    }
    return res.json(review);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Xóa một review dựa trên ID
reviewRouter.delete("/:id", async (req, res) => {
  try {
    const review = await review.findByIdAndRemove(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review không tồn tại" });
    }
    return res.json(review);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
// Cập nhật review dựa trên ID
reviewRouter.put("/:id", async (req, res) => {
  try {
    const review = await review.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          label: req.body.label,
        },
      },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ error: "Review không tồn tại" });
    }

    return res.json(review);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = reviewRouter;
