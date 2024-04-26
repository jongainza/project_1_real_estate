const express = require("express");
const app = express();
const cors = require("cors");
const ExpressError = require("./expressError");

app.use(express.json());

app.use(cors());

const authRouter = require("./routes/auth.route.js");
app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("Server running in port 3000");
});
