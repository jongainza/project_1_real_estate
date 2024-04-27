const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("App is working");
});
const { register, loggin } = require("../controlers/auth.controler.js");
const { SECRET_KEY } = require("../config.js");
const { ensureLoggedIn } = require("../middleware/auth.middleware.js");
router.post("/register", register);
router.post("/loggin", loggin);
router.get("/private", ensureLoggedIn, (req, res, next) => {
  try {
    res.json({ msg: "you loged in" });
  } catch (e) {
    next(e);
  }
});
module.exports = router;
