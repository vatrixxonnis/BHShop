const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(__dirname.replace("routes", "") + "public/index.html");
});

const residences = require("../data/residences.json");
router.get("/residences", (req, res) => {
  res.send(residences);
});

module.exports = router;
