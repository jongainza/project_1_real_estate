const express = require("express");
const ExpressError = require("../expressError");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const User = require("../models/user.model");

const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(new ExpressError("Unahoutorized to modify user", 401));
  }
  try {
    const { id } = req.params;
    // Assuming req.body contains the form data
    const { username, email, password } = req.body;

    // Check each field and prepare the data for updating
    const newData = {};
    if (username !== "") {
      newData.username = username;
    }
    if (email !== "") {
      newData.email = email;
    }
    if (password !== "") {
      // Hash the new password and update
      newData.password = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    }

    // Update the user record in the database
    const updatedUser = await User.updateUser(id, newData);
  } catch (e) {
    return next(e);
  }
};

module.exports = { updateUser };
