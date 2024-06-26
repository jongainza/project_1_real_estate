const express = require("express");
const app = express();
const cors = require("cors");
const ExpressError = require("./expressError");
const bodyParser = require("body-parser");
const path = require("path");

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors());

const {
  authenticateJWT,
  ensureLoggedIn,
} = require("./middleware/auth.middleware.js");

app.use(express.json());
app.use(authenticateJWT);

const authRouter = require("./routes/auth.route.js");
app.use("/api/auth", authRouter);
const userRouter = require("./routes/user.route.js");
app.use("/api/user", ensureLoggedIn, userRouter);
const listingRouter = require("./routes/listing.route.js");
app.use("/api/listing", listingRouter);
const bidRouter = require("./routes/bid.route.js");
app.use("/api/bid", ensureLoggedIn, bidRouter);

app.use(express.static(path.join(__dirname, "/client/build")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// 404 handler
app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  // pass err to the next middleware
  return next(err);
});

// general error handler
app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status,
    },
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.json({
    error: {
      message,
      statusCode,
      success: false,
    },
  });
});

app.listen(3000, () => {
  console.log("Server running in port 3000");
});
