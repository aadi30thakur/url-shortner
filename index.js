const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const SaveRoute = require("./Routes/SaveRoute");
/* -------------------------- connecting to databse ------------------------- */

mongoose
  .connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("YAY! connected to the database.");
  });

/* ------------------------------- middlewares ------------------------------ */
app.use(bodyParser.urlencoded({ extended: true }));

/* -------------------------------- my routes ------------------------------- */

app.use("/", SaveRoute);
// app.get("/", function (req, res) {
//   res.send("hello world");
// });

/* ------------------------------ setting port ------------------------------ */

port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(
    `App is Successfully running on port : https://localhost:${port}`
  );
});
