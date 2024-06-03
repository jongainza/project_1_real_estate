const { SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");
const ExpressError = require("../expressError");

// Auth jwt, add auth'd user (if any) to req.
function authenticateJWT(req, res, next) {
  try {
    // console.log({ request: req.body });
    const tokenFromBody =
      req.body._token || req.headers.authorization.split(" ")[1];
    if (!tokenFromBody) {
      return res.status(401).json({ error: "Token is missing" });
    }
    const payload = jwt.verify(tokenFromBody, SECRET_KEY);
    req.user = payload;
    return next();
  } catch (e) {
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
