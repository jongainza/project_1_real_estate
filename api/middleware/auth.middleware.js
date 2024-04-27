const { SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");
const ExpressError = require("../expressError");

// Auth jwt, add auth'd user (if any) to req.
function authenticateJWT(req, res, next) {
  try {
    const tokenFromBody = req.body._token;
    const payload = jwt.verify(tokenFromBody, SECRET_KEY);
    req.user = payload;
    console.log("---YOU HAVE A VALID TOKEN!!!---");
    return next();
  } catch (e) {
    // error in this middleware ins't error -- continue on
    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    const e = new ExpressError("unauthorized", 401);
    return next(e);
  } else {
    next();
  }
}
module.exports = { authenticateJWT, ensureLoggedIn };
