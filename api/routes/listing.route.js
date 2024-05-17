const express = require("express");
const router = express.Router();

const {
  create,
  get,
  deleteListing,
  updateListing,
} = require("../controlers/listing.controler.js");
router.post("/create", create);
router.get("/get", get);
router.delete("/delete/:id", deleteListing);
router.put("/update/:id", updateListing);

module.exports = router;
