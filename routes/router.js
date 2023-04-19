const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(__dirname.replace("routes", "") + "public/index.html");
});

const TinhThanh = require("../model/TinhThanh");
const QuanHuyen = require("../model/QuanHuyen");
const XaPhuong = require("../model/XaPhuong");

router.post("/residences", async (req, res) => {
  try {
    let provinces = await TinhThanh.find({});
    for (let province of provinces) {
      province.value = province.label;
      province.children = await QuanHuyen.find({ parent_code: province.code });
      for (let district of province.children) {
        district.value = district.label;
        district.children = await XaPhuong.find({ parent_code: district.code });
        for (let ward of district.children) {
          ward.value = ward.label;
        }
      }
    }
    res.send(provinces);
    // let provinces = await TinhThanh.find({}).then(async (provinces) => {
    //   for (let province of provinces) {
    //     await QuanHuyen.find({ parent_code: province.code }).then(
    //       async (districts) => {
    //         province.children = districts;
    //         for (let district of province.children) {
    //           await XaPhuong.find({ parent_code: district.code }).then(
    //             (wards) => {
    //               district.children = wards;
    //             }
    //           );
    //         }
    //       }
    //     );
    //   }
    //   res.json(provinces);
    // });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const residences = require("../data/residences.json");
router.get("/residences", (req, res) => {
  res.send(residences);
});

module.exports = router;
