const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("App is working");
});
const { register } = require("../controlers/auth.controler.js");
router.post("/register", register);

module.exports = router;
