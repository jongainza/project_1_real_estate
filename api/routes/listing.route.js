const express = require("express");
const router = express.Router();

const {
  create,
  get,
  deleteListing,
  updateListing,
  findListing,
} = require("../controlers/listing.controler.js");
router.post("/create", create);
router.get("/get", get);
router.delete("/delete/:id", deleteListing);
router.put("/update/:id", updateListing);
router.get("/findListing/:id", findListing);

module.exports = router;
