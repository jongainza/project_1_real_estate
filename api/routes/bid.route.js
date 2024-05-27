const express = require("express");
const router = express.Router();

const {
  createBid,
  getBids,
  getBid,
  deleteBid,
} = require("../controlers/bid.controler.js");
router.post("/create/:id", createBid);
router.get("/get/:property_id", getBids);
router.get("/bid/:bid_id", getBid);
router.post("/deleteBid/:bid_id", deleteBid);

module.exports = router;
