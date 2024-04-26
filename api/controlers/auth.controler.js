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

const register = async (req, res, next) => {
  try {
    let { username, email, password, photo } = req.body;
    if (!photo) {
      photo = default_photo_url;
    }

    if (!username || !email || !password) {
      throw new ExpressError("username,email, password are required", 404);
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const data = await User.register(username, email, hashedPassword, photo);

    const _token = jwt.sign({ id: data.id }, SECRET_KEY);

    return res.status(201).json({
      data,
      _token,
    });
  } catch (e) {
    return next(e);
  }
};

module.exports = { register };
