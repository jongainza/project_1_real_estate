const express = require("express");
const router = express.Router();

const { create } = require("../controlers/listing.controler.js");
router.post("/create", create);

module.exports = router;
