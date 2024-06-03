const express = require("express");
const ExpressError = require("../expressError");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const User = require("../models/user.model");
const jsonschema = require("jsonschema");
const updateUserSchema = require("../schemas/user/updateUser.schema.json");

const updateUser = async (req, res, next) => {
  try {
    const { username, email, password, photo } = req.body;
    const { id } = req.user;
    const newData = { username, email, id, photo };

    if (password !== undefined) {
      // Hash the new password and update
      newData.password = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    }

    const result = jsonschema.validate(newData, updateUserSchema);

    if (!result.valid) {
      // pass validation erros to error handler
      let listOfErrors = result.errors.map((error) => error.stack);
      let error = new ExpressError(listOfErrors, 400);
      return next(error);
    }

    // // Update the user record in the database
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
    const { id } = req.user;
    const results = await User.deleteUser(id);
    return res.status(204).json({ message: "User deleted sucesfully" });
  } catch (e) {
    return next(e);
  }
};

module.exports = { updateUser, deleteUser };
