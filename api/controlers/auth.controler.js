const express = require("express");
const ExpressError = require("../expressError");
const bcrypt = require("bcrypt");
const {
  BCRYPT_WORK_FACTOR,
  default_photo_url,
  SECRET_KEY,
} = require("../config");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const jsonschema = require("jsonschema");
const userSchema = require("../schemas/user/user.schema.json");
const logginSchema = require("../schemas/user/loggin.schema.json");

const register = async (req, res, next) => {
  try {
    let { username, email, password, photo } = req.body;
    console.log(username, email, password);
    const result = jsonschema.validate(req.body, userSchema);

    if (!result.valid) {
      // pass validation erros to error handler
      let listOfErrors = result.errors.map((error) => error.stack);
      let error = new ExpressError(listOfErrors, 400);
      return next(error);
    }
    if (!photo) {
      photo = default_photo_url;
    }

    if (!username || !email || !password) {
      throw new ExpressError("username,email, password are required", 404);
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const data = await User.register(username, email, hashedPassword, photo);

    // const _token = jwt.sign({ id: data.id }, SECRET_KEY);

    return res.status(201).json({
      data,
    });
  } catch (e) {
    return next(e);
  }
};
const loggin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = jsonschema.validate(req.body, logginSchema);

    if (!result.valid) {
      // pass validation erros to error handler
      let listOfErrors = result.errors.map((error) => error.stack);
      let error = new ExpressError(listOfErrors, 400);
      return next(error);
    }
    if (!username || !password) {
      throw new ExpressError("Username and password required", 400);
    }
    const user = await User.getUser(username);
    console.log(user);
    console.log(password);
    console.log(user.password);
    console.log({ id: user.id });

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const _token = jwt.sign({ id: user.id }, SECRET_KEY);

        return res.json({ message: "Logged in!", _token });
      }
    }
    throw new ExpressError("Invalid username/password", 400);
  } catch (e) {
    return next(e);
  }
};

module.exports = { register, loggin };
