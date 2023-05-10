const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(__dirname.replace("routes", "") + "public/index.html");
});

const residences = require("../data/residences.json");

router.get("/residences", (req, res) => {
  res.send(residences);
});
router.get("/provinces", (req, res) => {
  const provinces = require("../data/provinces.json");
  res.send(provinces);
});
router.get("/districts", (req, res) => {
  const districts = require("../data/districts.json");
  res.send(districts);
});
router.get("/wards", (req, res) => {
  const wards = require("../data/wards.json");
  res.send(wards);
  // residences.forEach((residence) => {
  //   residence.children.forEach((district) => {
  //     district.children.forEach((ward) => {
  //       wards.push({
  //         name_with_type: ward.name_with_type,
  //         code: ward.code,
  //         parent_code: ward.parent_code,
  //       });
  //     });
  //   });
  // })
});

router.post("/provinceName", async (req, res) => {
  const provinces = require("../data/provinces.json");
  let index = provinces.findIndex((province) => province.code === (req.body.code).toString())
  if(index !== -1){
    return res.send(provinces[index].name_with_type)
  }
  else{
    return res.send("Không tìm thấy")
  }
});

router.post("/districtName", async (req, res) => {
  const districts = require("../data/districts.json");
  let index = districts.findIndex((district) => district.code === (req.body.code).toString())
  if(index !== -1){
    return res.send(districts[index].name_with_type)
  }
  else{
    return res.send("Không tìm thấy")
  }
});

router.post("/wardName", async (req, res) => {
  const wards = require("../data/wards.json");
  let index = wards.findIndex((ward) => ward.code === (req.body.code).toString())
  if(index !== -1){
    return res.send(wards[index].name_with_type)
  }
  else{
    return res.send("Không tìm thấy")
  }
});

module.exports = router;
