const express = require("express");
const router = express.Router();

const {
  create,
  get,
  deleteListing,
  updateListing,
  findListing,
  getListings,
} = require("../controlers/listing.controler.js");
router.post("/create", create);
router.get("/get", get);
router.delete("/delete/:id", deleteListing);
router.put("/update/:id", updateListing);
router.get("/findListing/:id", findListing);
router.get("/getListings", getListings);

module.exports = router;
