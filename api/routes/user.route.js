const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("App is working");
});
const { updateUser, deleteUser } = require("../controlers/user.controler.js");
router.put("/update/:id", updateUser);
router.post("/delete", deleteUser);

module.exports = router;
