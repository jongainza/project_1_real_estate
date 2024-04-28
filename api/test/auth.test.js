process.env.NODE_env = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const BCRYPT_WORK_FACTOR = 1;

let testUserToken;
