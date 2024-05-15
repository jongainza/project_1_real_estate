const express = require("express");
const router = express.Router();

const {
  create,
  get,
  deleteListing,
} = require("../controlers/listing.controler.js");
router.post("/create", create);
router.get("/get", get);
router.delete("/delete/:id", deleteListing);

module.exports = router;
