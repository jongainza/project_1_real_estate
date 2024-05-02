const express = require("express");
const ExpressError = require("../expressError");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const User = require("../models/user.model");
const jsonschema = require("jsonschema");
const updateUserSchema = require("../schemas/user/updateUser.schema.json");

const updateUser = async (req, res, next) => {
  // if (req.params.id !== req.user.id) {
  //   return next(new ExpressError("Unahoutorized to modify user", 401));
  // }
  try {
    const { id } = req.params;

    // Assuming req.body contains the form data
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const result = jsonschema.validate(req.body, updateUserSchema);

    if (!result.valid) {
      // pass validation erros to error handler
      let listOfErrors = result.errors.map((error) => error.stack);
      let error = new ExpressError(listOfErrors, 400);
      return next(error);
    }
    console.log({ id });
    // Check each field and prepare the data for updating
    const newData = {};

    if (username !== "") {
      newData.username = username;
    }

    if (email !== "") {
      newData.email = email;
    }
    console.log({ newData });

    if (password !== "") {
      // Hash the new password and update
      newData.password = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    }
    // Update the user record in the database
    const updatedUser = await User.updateUser(id, newData);
    return res.status(201).json({
      updatedUser,
    });
  } catch (e) {
    return next(e);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await User.deleteUser(id);
    return res.status(204).json({ message: "User deleted sucesfully" });
  } catch (e) {
    return next(e);
  }
};

module.exports = { updateUser, deleteUser };
