const express = require("express");
const router = express.Router();

const {
  createBid,
  getBid,
  deleteBid,
} = require("../controlers/bid.controler.js");
router.post("/create/:id", createBid);
// router.get("/get/:property_id", getBid);
// router.delete("/delete/:property_id", deleteBid);

module.exports = router;
