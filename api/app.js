const express = require("express");
const app = express();
const cors = require("cors");
const ExpressError = require("./expressError");

app.use(express.json());

app.use(cors());

const authRouter = require("./routes/auth.route.js");
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.json({
    message,
    statusCode,
    success: false,
  });
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

app.listen(3000, () => {
  console.log("Server running in port 3000");
});
